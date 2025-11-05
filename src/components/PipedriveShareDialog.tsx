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
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface PipedriveShareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assessmentLink: string;
  playerName: string;
  pipedriveInfo?: {
    dealId: number;
    userId: string;
  } | null;
}

export function PipedriveShareDialog({
  open,
  onOpenChange,
  assessmentLink,
  playerName,
  pipedriveInfo,
}: PipedriveShareDialogProps) {
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!pipedriveInfo) {
      toast.error("No Pipedrive information available. Please create assessment from Pending Assessments page.");
      return;
    }

    setSending(true);

    try {
      const noteContent = `Assessment Link: ${assessmentLink}`;

      const { data, error } = await supabase.functions.invoke("pipedrive-sync", {
        body: {
          action: "addNote",
          userId: pipedriveInfo.userId,
          dealId: pipedriveInfo.dealId,
          noteContent,
        },
      });

      if (error) throw error;
      
      console.log(`Note sent to deal ${pipedriveInfo.dealId}:`, data);

      toast.success("Assessment link sent to Pipedrive!");
      onOpenChange(false);
    } catch (error) {
      console.error("Error sending to Pipedrive:", error);
      toast.error("Failed to send to Pipedrive. Please try again.");
    } finally {
      setSending(false);
    }
  };

  // If no pipedrive info, don't show the dialog
  if (!pipedriveInfo) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share to Pipedrive</DialogTitle>
          <DialogDescription>
            Send assessment link for {playerName} to Pipedrive deal #{pipedriveInfo.dealId}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            This will add the assessment link as a note to the Pipedrive deal.
          </p>
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
