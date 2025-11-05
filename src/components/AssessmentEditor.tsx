import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, Eye, Save, Link as LinkIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface AssessmentData {
  playerName: string;
  enrollmentYear: string;
  schoolYear: string;
  gpa: string;
  manager: string;
  departmentNotes: string;
  playerPhoto: string | null;
  targetDivisions: string[]; // Array of selected divisions
}

interface AssessmentEditorProps {
  data: AssessmentData;
  onChange: (data: AssessmentData) => void;
  onPreview: () => void;
}

// Default template for department notes
const DEFAULT_NOTES_TEMPLATE = `The Venture Soccer Department believes (NAME OF PLAYER) has the ability to successfully compete at the college level starting (ENROLLMENT YEAR).

Academically, (NAME OF PLAYER) is a strong student who maintains good academic standing and is well-prepared for the demands of college-level coursework.

(NAME OF PLAYER) is a versatile player who has a good game understanding. He reads the game well and could fulfill multiple roles on the field.

We recommend (NAME OF PLAYER) as an athlete to focus on (TARGET DIVISIONS) with a strong roster.

It is important that (NAME OF PLAYER) picks the right environment and team to continue his development.`;

export const AssessmentEditor = ({ data, onChange, onPreview }: AssessmentEditorProps) => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [assessmentUrl, setAssessmentUrl] = useState<string | null>(null);

  // Auto-update department notes when player name, enrollment year, or divisions change
  useEffect(() => {
    // Start with the template if notes are empty
    let updatedNotes = data.departmentNotes || DEFAULT_NOTES_TEMPLATE;
    
    // Replace player name in all occurrences
    updatedNotes = updatedNotes.replace(/\(NAME OF PLAYER\)/g, data.playerName || "(NAME OF PLAYER)");
    
    // Replace enrollment year
    updatedNotes = updatedNotes.replace(/\(ENROLLMENT YEAR\)/g, data.enrollmentYear || "(ENROLLMENT YEAR)");
    
    // Update division focus - create natural language list
    if (data.targetDivisions.length > 0) {
      let divisionText = '';
      if (data.targetDivisions.length === 1) {
        divisionText = data.targetDivisions[0] + ' teams';
      } else if (data.targetDivisions.length === 2) {
        divisionText = data.targetDivisions[0] + ' and ' + data.targetDivisions[1] + ' teams';
      } else {
        const lastDivision = data.targetDivisions[data.targetDivisions.length - 1];
        const otherDivisions = data.targetDivisions.slice(0, -1).join(', ');
        divisionText = otherDivisions + ', and ' + lastDivision + ' teams';
      }
      updatedNotes = updatedNotes.replace(/\(TARGET DIVISIONS\)/g, divisionText);
    } else {
      // If no divisions selected, keep the placeholder
      updatedNotes = updatedNotes.replace(/\(TARGET DIVISIONS\)/g, "(TARGET DIVISIONS)");
    }
    
    // Only update if it changed to avoid infinite loops
    if (updatedNotes !== data.departmentNotes) {
      onChange({ ...data, departmentNotes: updatedNotes });
    }
  }, [data.playerName, data.enrollmentYear, data.targetDivisions]);

  // Create URL-friendly slug from player name
  const createSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const handleSave = async () => {
    if (!data.playerName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a player name before saving",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    try {
      const slug = createSlug(data.playerName);
      
      // Check if assessment already exists
      const { data: existing } = await supabase
        .from('assessments')
        .select('id')
        .eq('player_name_slug', slug)
        .maybeSingle();

      const assessmentData = {
        player_name: data.playerName,
        player_name_slug: slug,
        player_photo: data.playerPhoto,
        grad_year: data.enrollmentYear,
        nationality: '', // Add nationality field if needed
        current_level: data.schoolYear,
        height: '', // Add height field if needed
        gpa: data.gpa,
        position: '', // Add position field if needed
        target_divisions: data.targetDivisions,
        recommendation: data.manager,
        department_notes: data.departmentNotes
      };

      if (existing) {
        // Update existing assessment
        const { error } = await supabase
          .from('assessments')
          .update(assessmentData)
          .eq('id', existing.id);

        if (error) throw error;
      } else {
        // Insert new assessment
        const { error } = await supabase
          .from('assessments')
          .insert(assessmentData);

        if (error) throw error;
      }

      const url = `${window.location.origin}/ventureassessment/${slug}`;
      setAssessmentUrl(url);

      toast({
        title: "Success!",
        description: "Assessment saved successfully",
      });
    } catch (error) {
      console.error('Error saving assessment:', error);
      toast({
        title: "Error",
        description: "Failed to save assessment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const copyUrlToClipboard = () => {
    if (assessmentUrl) {
      navigator.clipboard.writeText(assessmentUrl);
      toast({
        title: "Copied!",
        description: "Assessment URL copied to clipboard",
      });
    }
  };
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...data, playerPhoto: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-primary">Assessment Editor</h2>
        <div className="flex items-center gap-2">
          <Button onClick={handleSave} disabled={isSaving} className="gap-2">
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Assessment"}
          </Button>
          <Button onClick={onPreview} variant="secondary" className="gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
        </div>
      </div>

      {assessmentUrl && (
        <Card className="p-4 bg-green-50 dark:bg-green-950 border-green-200">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm font-semibold text-green-900 dark:text-green-100 mb-1">Assessment Saved!</p>
              <p className="text-xs text-green-700 dark:text-green-300 break-all">{assessmentUrl}</p>
            </div>
            <Button onClick={copyUrlToClipboard} size="sm" variant="outline" className="gap-2">
              <LinkIcon className="h-4 w-4" />
              Copy Link
            </Button>
          </div>
        </Card>
      )}

      <Card className="p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Player Photo</h3>
          <div className="flex items-center gap-4">
            {data.playerPhoto && (
              <img
                src={data.playerPhoto}
                alt="Player"
                className="h-32 w-32 rounded-2xl object-cover border-4 border-primary"
              />
            )}
            <div className="flex-1">
              <Label htmlFor="photo" className="cursor-pointer">
                <div className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity w-fit">
                  <Upload className="h-4 w-4" />
                  Upload Photo
                </div>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </Label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="playerName">Player Name</Label>
            <Input
              id="playerName"
              value={data.playerName}
              onChange={(e) => onChange({ ...data, playerName: e.target.value })}
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="enrollmentYear">Enrollment Year/Options</Label>
            <Input
              id="enrollmentYear"
              value={data.enrollmentYear}
              onChange={(e) => onChange({ ...data, enrollmentYear: e.target.value })}
              placeholder="August 2027"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="schoolYear">School Year</Label>
            <Input
              id="schoolYear"
              value={data.schoolYear}
              onChange={(e) => onChange({ ...data, schoolYear: e.target.value })}
              placeholder="Freshman"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gpa">High School GPA</Label>
            <Input
              id="gpa"
              value={data.gpa}
              onChange={(e) => onChange({ ...data, gpa: e.target.value })}
              placeholder="3.5+ GPA"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="manager">Manager/Agent Name</Label>
            <Input
              id="manager"
              value={data.manager}
              onChange={(e) => onChange({ ...data, manager: e.target.value })}
              placeholder="Agent Name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="departmentNotes">
            Department Notes
            <span className="text-xs text-muted-foreground ml-2">(Auto-updates with player name and divisions)</span>
          </Label>
          <Textarea
            id="departmentNotes"
            value={data.departmentNotes}
            onChange={(e) => onChange({ ...data, departmentNotes: e.target.value })}
            placeholder="Enter department recommendations and notes..."
            className="min-h-[200px]"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Target Divisions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "NCAA D1",
              "NCAA D2",
              "NCAA D3",
              "NAIA",
              "JUCO",
              "Gap Year"
            ].map((division) => (
              <div key={division} className="flex items-center space-x-2">
                <Checkbox
                  id={division}
                  checked={data.targetDivisions.includes(division)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onChange({
                        ...data,
                        targetDivisions: [...data.targetDivisions, division],
                      });
                    } else {
                      onChange({
                        ...data,
                        targetDivisions: data.targetDivisions.filter((d) => d !== division),
                      });
                    }
                  }}
                />
                <label htmlFor={division} className="text-sm font-medium leading-none cursor-pointer">
                  {division}
                </label>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};
