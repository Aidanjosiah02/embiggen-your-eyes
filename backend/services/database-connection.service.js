import { createClient } from "@supabase/supabase-js";
import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
export async function connectToDatabase() {
  const supabaseUrl = "https://feuzlqfqtuiggwwixowp.supabase.co";
  const supabaseKey = process.env.SUPABASE_KEY;

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    await supabase.connect();
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

export async function disconnectFromDatabase(supabase) {
  try {
    await supabase.end();
  } catch (error) {
    console.error("Error disconnecting from the database:", error);
  }
}
