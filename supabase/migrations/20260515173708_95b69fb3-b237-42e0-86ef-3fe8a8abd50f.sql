ALTER TABLE public.assessments
ADD COLUMN IF NOT EXISTS include_pro_academy boolean NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS pro_academy_price text DEFAULT '19,995';