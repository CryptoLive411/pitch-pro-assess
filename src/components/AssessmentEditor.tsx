import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, Eye, Save, Link as LinkIcon, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { PipedriveShareDialog } from "./PipedriveShareDialog";

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
  packagePrice1?: string;
  packagePrice2?: string;
  packagePrice3?: string;
}

interface AssessmentEditorProps {
  data: AssessmentData;
  onChange: (data: AssessmentData) => void;
  onPreview: () => void;
  pipedriveInfo?: {
    dealId: number;
    userId: string;
  } | null;
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

export const AssessmentEditor = ({ data, onChange, onPreview, pipedriveInfo }: AssessmentEditorProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [assessmentUrl, setAssessmentUrl] = useState<string | null>(null);
  const [showPipedriveDialog, setShowPipedriveDialog] = useState(false);
  const [currentPlayerName, setCurrentPlayerName] = useState("");

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
      
      // Upload photo to storage if it's a base64 string
      let photoUrl = data.playerPhoto;
      if (data.playerPhoto && data.playerPhoto.startsWith('data:')) {
        const uploadedUrl = await uploadPhotoToStorage(data.playerPhoto, slug);
        if (uploadedUrl) {
          photoUrl = uploadedUrl;
        }
      }
      
      // Check if assessment already exists
      const { data: existing } = await supabase
        .from('assessments')
        .select('id')
        .eq('player_name_slug', slug)
        .maybeSingle();

      const assessmentData = {
        player_name: data.playerName,
        player_name_slug: slug,
        player_photo: photoUrl,
        grad_year: data.enrollmentYear,
        nationality: '', // Add nationality field if needed
        current_level: data.schoolYear,
        height: '', // Add height field if needed
        gpa: data.gpa,
        position: '', // Add position field if needed
        target_divisions: data.targetDivisions,
        recommendation: data.manager,
        department_notes: data.departmentNotes,
        budget: data.budget,
        package_price_1: data.packagePrice1 || null,
        package_price_2: data.packagePrice2 || null,
        package_price_3: data.packagePrice3 || null
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
      setCurrentPlayerName(data.playerName);

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
        packagePrice1: "",
        packagePrice2: "",
        packagePrice3: "",
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
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Show preview immediately using base64
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ ...data, playerPhoto: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload photo to storage when saving (convert from base64 to storage URL)
  const uploadPhotoToStorage = async (base64Photo: string, playerSlug: string): Promise<string | null> => {
    try {
      // Convert base64 to blob
      const base64Data = base64Photo.split(',')[1];
      const mimeType = base64Photo.split(';')[0].split(':')[1];
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });

      // Determine file extension
      const extension = mimeType.split('/')[1] || 'jpg';
      const fileName = `${playerSlug}-${Date.now()}.${extension}`;

      // Upload to storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('player-photos')
        .upload(fileName, blob, {
          contentType: mimeType,
          upsert: true
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return null;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('player-photos')
        .getPublicUrl(fileName);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading photo:', error);
      return null;
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-primary">Assessment Editor</h2>
        <div className="flex items-center gap-2">
          <Button onClick={() => navigate("/assessments")} variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">View All Assessments</span>
            <span className="sm:hidden">Assessments</span>
          </Button>
          <Button onClick={handleSave} disabled={isSaving} className="gap-2">
            <Save className="h-4 w-4" />
            {isSaving ? "Saving..." : "Save"}
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
              <a 
                href={assessmentUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-green-700 dark:text-green-300 break-all hover:underline"
              >
                {assessmentUrl.replace(window.location.origin + '/', '')}
              </a>
            </div>
            <div className="flex gap-2">
              <Button onClick={copyUrlToClipboard} size="sm" variant="outline" className="gap-2">
                <LinkIcon className="h-4 w-4" />
                Copy Link
              </Button>
              {pipedriveInfo && (
                <Button onClick={() => setShowPipedriveDialog(true)} size="sm" className="gap-2">
                  Share to Pipedrive
                </Button>
              )}
            </div>
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

          <div className="space-y-2">
            <Label htmlFor="budget">Estimated Budget</Label>
            <Input
              id="budget"
              value={data.budget}
              onChange={(e) => onChange({ ...data, budget: e.target.value })}
              placeholder="Up to $20,000 USD per year"
            />
          </div>

          <div className="space-y-2">
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

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Package Prices</h3>
          <p className="text-sm text-muted-foreground">Set the prices that will display on the packages slide</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="packagePrice1">Package 1 (Full Service)</Label>
              <Input
                id="packagePrice1"
                value={data.packagePrice1 || ""}
                onChange={(e) => onChange({ ...data, packagePrice1: e.target.value })}
                placeholder="e.g. $4,495"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="packagePrice2">Package 2 (Standard)</Label>
              <Input
                id="packagePrice2"
                value={data.packagePrice2 || ""}
                onChange={(e) => onChange({ ...data, packagePrice2: e.target.value })}
                placeholder="e.g. $2,995"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="packagePrice3">Package 3 (Essential)</Label>
              <Input
                id="packagePrice3"
                value={data.packagePrice3 || ""}
                onChange={(e) => onChange({ ...data, packagePrice3: e.target.value })}
                placeholder="e.g. $1,495"
              />
            </div>
          </div>
        </div>
      </Card>

      <PipedriveShareDialog
        open={showPipedriveDialog}
        onOpenChange={setShowPipedriveDialog}
        assessmentLink={assessmentUrl || ""}
        playerName={currentPlayerName}
        pipedriveInfo={pipedriveInfo}
      />
    </div>
  );
};
