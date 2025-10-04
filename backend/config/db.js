import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // required for Supabase TLS
  max: 10, // optional, limits pool size
});

pool.on("error", (err) => {
  console.error("Unexpected PG pool error", err.message);
});
