ALTER TABLE public.assessments 
  ADD COLUMN cost_sat text DEFAULT '200-400',
  ADD COLUMN cost_applications text DEFAULT '300-500',
  ADD COLUMN cost_flight text DEFAULT '600-1,000',
  ADD COLUMN cost_visa text DEFAULT '350',
  ADD COLUMN cost_university text DEFAULT '10K-20K';