-- Add package price columns to assessments table
ALTER TABLE public.assessments 
ADD COLUMN IF NOT EXISTS package_price_1 text,
ADD COLUMN IF NOT EXISTS package_price_2 text,
ADD COLUMN IF NOT EXISTS package_price_3 text;