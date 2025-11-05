-- Allow anyone to delete assessments
CREATE POLICY "Anyone can delete assessments"
ON public.assessments
FOR DELETE
TO public
USING (true);