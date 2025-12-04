-- Add language column to assessments table
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS language text DEFAULT 'English';

-- Add translated_labels column to store translated UI labels as JSON
ALTER TABLE public.assessments ADD COLUMN IF NOT EXISTS translated_labels jsonb DEFAULT NULL;