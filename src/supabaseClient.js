// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cvzhpgstiuclkavfidpu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2emhwZ3N0aXVjbGthdmZpZHB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxODg5MzYsImV4cCI6MjA2Nzc2NDkzNn0.T3ZXYORUV6n5jBPyCY5rLwrWwNGUFln0BcdMrUdyEWI';

export const supabase = createClient(supabaseUrl, supabaseKey);
