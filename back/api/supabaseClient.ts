import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://dfepemnijidhnxujswfj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmZXBlbW5pamlkaG54dWpzd2ZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1OTg1OTgsImV4cCI6MjA1OTE3NDU5OH0.fyXaLnezNBLpc74sldsFXcRhasuG06Ymqsk70NdSvRc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
