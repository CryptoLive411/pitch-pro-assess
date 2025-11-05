import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, Eye } from "lucide-react";

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

export const AssessmentEditor = ({ data, onChange, onPreview }: AssessmentEditorProps) => {
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
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary">Assessment Editor</h2>
        <Button onClick={onPreview} className="gap-2">
          <Eye className="h-4 w-4" />
          Preview
        </Button>
      </div>

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
          <Label htmlFor="departmentNotes">Department Notes</Label>
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
              "NAIA D1",
              "NAIA D2",
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
