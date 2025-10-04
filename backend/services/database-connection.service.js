import { createClient } from "@supabase/supabase-js";

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
