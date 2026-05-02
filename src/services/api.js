import { supabase } from '../lib/supabaseClient';

export const api = {
  from: (table) => supabase.from(table),
};
