import { Pool } from "../config/db.js";

const { rows } = await pool.query(
  "SELECT * FROM markers WHERE planet_name = $1",
  ["Mars"]
);
console.log(rows);
