import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface PipedriveShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assessmentLink: string;
  playerName: string;
}

export function PipedriveShareDialog({
  open,
  onOpenChange,
  assessmentLink,
  playerName,
}: PipedriveShareDialogProps) {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [dealId, setDealId] = useState("");
  const [sending, setSending] = useState(false);

  const users = [
    { id: "andrew", name: "Andrew" },
    { id: "alex", name: "Alex" },
    { id: "sergio", name: "Sergio" },
  ];

  const handleUserToggle = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSend = async () => {
    if (selectedUsers.length === 0) {
      toast.error("Please select at least one user");
      return;
    }

    if (!dealId) {
      toast.error("Please enter a deal ID");
      return;
    }

    setSending(true);

    try {
      const noteContent = `Assessment Link: ${assessmentLink}`;

      // Send to each selected user
      for (const userId of selectedUsers) {
        const { data, error } = await supabase.functions.invoke("pipedrive-sync", {
          body: {
            action: "addNote",
            userId,
            dealId: parseInt(dealId),
            noteContent,
          },
        });

        if (error) throw error;
        
        console.log(`Note sent to ${userId}:`, data);
      }

      toast.success(`Assessment link sent to ${selectedUsers.length} Pipedrive account(s)`);
      onOpenChange(false);
      setSelectedUsers([]);
      setDealId("");
    } catch (error) {
      console.error("Error sending to Pipedrive:", error);
      toast.error("Failed to send to Pipedrive. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share to Pipedrive</DialogTitle>
          <DialogDescription>
            Send assessment link for {playerName} to Pipedrive
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-3">
            <Label>Select Recipients</Label>
            {users.map((user) => (
              <div key={user.id} className="flex items-center space-x-2">
                <Checkbox
                  id={user.id}
                  checked={selectedUsers.includes(user.id)}
                  onCheckedChange={() => handleUserToggle(user.id)}
                />
                <Label
                  htmlFor={user.id}
                  className="text-sm font-normal cursor-pointer"
                >
                  {user.name}
                </Label>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dealId">Deal ID</Label>
            <Input
              id="dealId"
              placeholder="Enter Pipedrive Deal ID"
              value={dealId}
              onChange={(e) => setDealId(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              You can find the Deal ID in the Pipedrive deal URL
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSend} disabled={sending}>
            {sending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send to Pipedrive
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
