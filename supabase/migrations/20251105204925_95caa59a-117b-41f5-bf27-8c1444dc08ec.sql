-- Create assessments table to store player assessment data
CREATE TABLE public.assessments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name text NOT NULL,
  player_name_slug text NOT NULL UNIQUE, -- URL-friendly version of player name
  player_photo text,
  grad_year text,
  nationality text,
  current_level text,
  height text,
  gpa text,
  position text,
  target_divisions text[],
  recommendation text,
  department_notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read assessments (since these are shared links)
CREATE POLICY "Anyone can view assessments"
  ON public.assessments
  FOR SELECT
  USING (true);

-- Only allow inserts and updates (no auth required for now since this is a tool for creating assessments)
CREATE POLICY "Anyone can insert assessments"
  ON public.assessments
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update assessments"
  ON public.assessments
  FOR UPDATE
  USING (true);

-- Create index on slug for faster lookups
CREATE INDEX idx_assessments_slug ON public.assessments(player_name_slug);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_assessments_updated_at
  BEFORE UPDATE ON public.assessments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();