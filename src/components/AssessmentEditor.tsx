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
  budget: string;
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
const DEFAULT_NOTES_TEMPLATE = `The Venture Soccer Department believes (NAME OF PLAYER) has the ability to successfully compete at the (TARGET DIVISIONS) level, with an estimated budget of (BUDGET) per year.

Soccer Ability & Development:
(NAME OF PLAYER) is a versatile player with solid fundamentals and good game understanding. Continued development in technical skills, positioning, and consistency will help make an immediate impact at the college level.

Academic Standing:
(NAME OF PLAYER) maintains strong academic eligibility with a (GPA) and is well-prepared for the demands of college-level coursework. Projected enrollment: (ENROLLMENT YEAR).

Recruitment Strategy & Pathway:
Based on current level and budget, (NAME OF PLAYER) fits well into the (TARGET DIVISIONS) pathway. This provides an ideal entry point to adjust to the U.S. college soccer environment with strong opportunities for playing time and development.

Budget & Financial Planning:
Estimated annual budget: (BUDGET) (covering tuition, housing, meals, insurance, and equipment). The Venture team will secure placement and pursue scholarship options to reduce total cost.

Commitment to Placement:
The Venture Soccer Department is confident in (NAME OF PLAYER)'s ability to compete, develop, and grow within the U.S. college system. We will support throughout the entire process—from initial placement to potential transfer opportunities at higher divisions.`;

export const AssessmentEditor = ({ data, onChange, onPreview }: AssessmentEditorProps) => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [assessmentUrl, setAssessmentUrl] = useState<string | null>(null);

  // Auto-update department notes when any form field changes
  useEffect(() => {
    // Always start with the template and apply all replacements
    let updatedNotes = DEFAULT_NOTES_TEMPLATE;
    
    // Replace player name in all occurrences
    updatedNotes = updatedNotes.replace(/\(NAME OF PLAYER\)/g, data.playerName || "(NAME OF PLAYER)");
    
    // Replace enrollment year
    updatedNotes = updatedNotes.replace(/\(ENROLLMENT YEAR\)/g, data.enrollmentYear || "(ENROLLMENT YEAR)");
    
    // Replace budget
    updatedNotes = updatedNotes.replace(/\(BUDGET\)/g, data.budget || "(BUDGET)");
    
    // Replace GPA
    updatedNotes = updatedNotes.replace(/\(GPA\)/g, data.gpa || "(GPA)");
    
    // Update division focus - create natural language list
    if (data.targetDivisions.length > 0) {
      let divisionText = '';
      if (data.targetDivisions.length === 1) {
        divisionText = data.targetDivisions[0];
      } else if (data.targetDivisions.length === 2) {
        divisionText = data.targetDivisions[0] + ' and ' + data.targetDivisions[1];
      } else {
        const lastDivision = data.targetDivisions[data.targetDivisions.length - 1];
        const otherDivisions = data.targetDivisions.slice(0, -1).join(', ');
        divisionText = otherDivisions + ', and ' + lastDivision;
      }
      updatedNotes = updatedNotes.replace(/\(TARGET DIVISIONS\)/g, divisionText);
    } else {
      // If no divisions selected, keep the placeholder
      updatedNotes = updatedNotes.replace(/\(TARGET DIVISIONS\)/g, "(TARGET DIVISIONS)");
    }
    
    // Always update to keep it in sync
    onChange({ ...data, departmentNotes: updatedNotes });
  }, [data.playerName, data.enrollmentYear, data.budget, data.gpa, data.targetDivisions]);

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
        department_notes: data.departmentNotes,
        budget: data.budget
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

      const fullUrl = `${window.location.origin}/ventureassessment/${slug}`;
      const displayUrl = `ventureassessment/${slug}`;
      setAssessmentUrl(fullUrl);

      toast({
        title: "Success!",
        description: "Assessment saved successfully",
      });

      // Clear form after successful save
      onChange({
        playerName: "",
        enrollmentYear: "",
        schoolYear: "",
        gpa: "",
        manager: "",
        budget: "",
        departmentNotes: "",
        playerPhoto: null,
        targetDivisions: [],
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
    <div className="min-h-screen bg-background">
      {/* Header with Logo */}
      <header className="bg-[#002855] border-b border-border/20 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <img 
            src="/src/assets/venture-logo-white.png" 
            alt="Venture Soccer" 
            className="h-12"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-6 py-8">
        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mb-6">
          <Button onClick={onPreview} variant="outline" size="lg" className="gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button onClick={handleSave} disabled={isSaving} size="lg" className="gap-2">
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save Assessment"}
          </Button>
        </div>

        {/* Success Message */}
        {assessmentUrl && (
          <div className="bg-green-50 dark:bg-green-950/50 border-2 border-green-500 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="font-semibold text-green-900 dark:text-green-100 mb-1">✓ Assessment Saved Successfully!</p>
                <a 
                  href={assessmentUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-green-700 dark:text-green-300 hover:underline"
                >
                  {assessmentUrl.replace(window.location.origin + '/', '')}
                </a>
              </div>
              <Button onClick={copyUrlToClipboard} size="sm" className="gap-2">
                <LinkIcon className="h-4 w-4" />
                Copy Link
              </Button>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-card border rounded-lg p-8 space-y-8">
          {/* Player Photo Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Player Photo</h3>
            <div className="flex items-center gap-6">
              <div className="h-32 w-32 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center overflow-hidden bg-muted">
                {data.playerPhoto ? (
                  <img
                    src={data.playerPhoto}
                    alt="Player"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Upload className="h-8 w-8 text-muted-foreground" />
                )}
              </div>
              <Label htmlFor="photo" className="cursor-pointer">
                <div className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium">
                  {data.playerPhoto ? "Change Photo" : "Upload Photo"}
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

          {/* Player Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Player Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="playerName" className="mb-2 block">Player Name *</Label>
                <Input
                  id="playerName"
                  value={data.playerName}
                  onChange={(e) => onChange({ ...data, playerName: e.target.value })}
                  placeholder="Enter player name"
                  className="h-11"
                />
              </div>

              <div>
                <Label htmlFor="enrollmentYear" className="mb-2 block">Enrollment Year</Label>
                <Input
                  id="enrollmentYear"
                  value={data.enrollmentYear}
                  onChange={(e) => onChange({ ...data, enrollmentYear: e.target.value })}
                  placeholder="e.g., August 2027"
                  className="h-11"
                />
              </div>

              <div>
                <Label htmlFor="schoolYear" className="mb-2 block">School Year</Label>
                <Input
                  id="schoolYear"
                  value={data.schoolYear}
                  onChange={(e) => onChange({ ...data, schoolYear: e.target.value })}
                  placeholder="e.g., Freshman"
                  className="h-11"
                />
              </div>

              <div>
                <Label htmlFor="gpa" className="mb-2 block">High School GPA</Label>
                <Input
                  id="gpa"
                  value={data.gpa}
                  onChange={(e) => onChange({ ...data, gpa: e.target.value })}
                  placeholder="e.g., 3.5+ GPA"
                  className="h-11"
                />
              </div>

              <div>
                <Label htmlFor="budget" className="mb-2 block">Estimated Budget</Label>
                <Input
                  id="budget"
                  value={data.budget}
                  onChange={(e) => onChange({ ...data, budget: e.target.value })}
                  placeholder="e.g., $20,000 USD per year"
                  className="h-11"
                />
              </div>

              <div>
                <Label htmlFor="manager" className="mb-2 block">Manager/Agent</Label>
                <Input
                  id="manager"
                  value={data.manager}
                  onChange={(e) => onChange({ ...data, manager: e.target.value })}
                  placeholder="Enter agent name"
                  className="h-11"
                />
              </div>
            </div>
          </div>

          {/* Target Divisions */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Target Divisions</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                "NCAA D1",
                "NCAA D2",
                "NCAA D3",
                "NAIA",
                "JUCO",
                "Gap Year"
              ].map((division) => (
                <label 
                  key={division} 
                  className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-accent transition-colors"
                >
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
                  <span className="text-sm font-medium">{division}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Department Notes */}
          <div>
            <Label htmlFor="departmentNotes" className="mb-2 block">
              Department Notes
              <span className="text-xs text-muted-foreground ml-2 font-normal">
                (Auto-updates based on form fields)
              </span>
            </Label>
            <Textarea
              id="departmentNotes"
              value={data.departmentNotes}
              onChange={(e) => onChange({ ...data, departmentNotes: e.target.value })}
              placeholder="Department recommendations..."
              className="min-h-[250px] resize-none"
            />
          </div>
        </div>
      </main>
    </div>
  );
};
