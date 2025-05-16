import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://jyoehgpiipyvengbtuff.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5b2VoZ3BpaXB5dmVuZ2J0dWZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0MTg4MzYsImV4cCI6MjA2Mjk5NDgzNn0.llGP_uaL9xGk8xEdLWc-hnV-W64d0ZQDhhrojNt6VY8';
export const supabase = createClient(supabaseUrl, supabaseKey);