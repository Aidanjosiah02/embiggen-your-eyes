// backend/config/supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://feuzlqfqtuiggwwixowp.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
