-- Drop existing storage policies if they exist
DROP POLICY IF EXISTS "Anyone can view player photos" ON storage.objects;

-- Recreate storage policies for player-photos bucket
CREATE POLICY "Staff can upload player photos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'player-photos' 
  AND public.is_staff(auth.uid())
);

CREATE POLICY "Staff can update player photos"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'player-photos' 
  AND public.is_staff(auth.uid())
);

CREATE POLICY "Staff can delete player photos"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'player-photos' 
  AND public.is_staff(auth.uid())
);

CREATE POLICY "Public can view player photos"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'player-photos');