-- Revoke any read/update/delete on contact_messages from public roles; keep insert for submissions
REVOKE SELECT, UPDATE, DELETE ON public.contact_messages FROM anon, authenticated;

-- Add explicit deny policies so intent is clear and any future GRANT cannot silently expose data
CREATE POLICY "Deny read to anon and authenticated"
  ON public.contact_messages
  FOR SELECT
  TO anon, authenticated
  USING (false);

CREATE POLICY "Deny update to anon and authenticated"
  ON public.contact_messages
  FOR UPDATE
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

CREATE POLICY "Deny delete to anon and authenticated"
  ON public.contact_messages
  FOR DELETE
  TO anon, authenticated
  USING (false);