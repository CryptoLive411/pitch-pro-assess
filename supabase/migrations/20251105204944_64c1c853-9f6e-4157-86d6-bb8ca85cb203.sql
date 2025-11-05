-- Fix function search_path security issue by dropping trigger first
DROP TRIGGER IF EXISTS update_assessments_updated_at ON public.assessments;
DROP FUNCTION IF EXISTS public.update_updated_at_column();

-- Recreate function with proper search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate trigger
CREATE TRIGGER update_assessments_updated_at
  BEFORE UPDATE ON public.assessments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();