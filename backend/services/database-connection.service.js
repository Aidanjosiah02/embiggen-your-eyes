// import { createClient } from "@supabase/supabase-js";

// export async function connectToDatabase() {
//   const supabaseUrl = "https://feuzlqfqtuiggwwixowp.supabase.co";
//   const supabaseKey = process.env.SUPABASE_KEY;

//   try {
//     const supabase = createClient(supabaseUrl, supabaseKey);

//     await supabase.connect();
//   } catch (error) {
//     console.error("Error connecting to the database:", error);
//   }
// }

// export async function disconnectFromDatabase(supabase) {
//   try {
//     await supabase.end();
//   } catch (error) {
//     console.error("Error disconnecting from the database:", error);
//   }
// }
// import { createClient } from "@supabase/supabase-js";
// import pkg from "pg";
// const { Pool } = pkg;

// export const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// const supabaseUrl = "https://feuzlqfqtuiggwwixowp.supabase.co";
// const supabaseKey = process.env.SUPABASE_KEY;
// console.log("SUPABASE_KEY", process.env.SUPABASE_KEY);

// if (!supabaseKey) {
//   throw new Error(
//     "Missing SUPABASE_KEY in environment. Make sure to set it in .env or the environment."
//   );
// }

// const supabase = createClient(supabaseUrl, supabaseKey);

// export default supabase;
