import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_APP_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_APP_SUPABASE_KEY

// Create a single supabase client for interacting with your database
const supabaseClient = createClient(
    supabaseUrl,
    supabaseKey
);

console.log(supabaseClient)

export default function useClient () {
  return supabaseClient ;
}