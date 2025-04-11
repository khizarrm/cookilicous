// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://suxvhewsmxxsfttwqfkw.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1eHZoZXdzbXh4c2Z0dHdxZmt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwMDQ0NTAsImV4cCI6MjA1OTU4MDQ1MH0.4bKLwCfwk4BxKXICU7vbIXC6C4kRIwlmbUfwgGuEs3I"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
