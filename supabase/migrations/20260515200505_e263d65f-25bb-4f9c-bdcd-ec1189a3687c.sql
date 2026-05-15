ALTER TABLE public.assessments
  ADD COLUMN IF NOT EXISTS program_mode text NOT NULL DEFAULT 'college',
  ADD COLUMN IF NOT EXISTS pro_academy_addon_price text DEFAULT '9,995';

-- Backfill: existing rows with include_pro_academy=true become 'both'
UPDATE public.assessments
SET program_mode = 'both'
WHERE include_pro_academy = true AND program_mode = 'college';