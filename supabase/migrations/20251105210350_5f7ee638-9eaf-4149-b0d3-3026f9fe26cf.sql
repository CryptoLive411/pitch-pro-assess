-- Add budget column to assessments table
ALTER TABLE public.assessments 
ADD COLUMN IF NOT EXISTS budget text;