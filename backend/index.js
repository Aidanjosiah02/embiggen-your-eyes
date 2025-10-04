  import "dotenv/config";
import dotenv from "dotenv";
import express from "express";
import collectionsRouter from "./routes/collections.routes.js";
import cors from "cors";
import markersRouter from "./routes/markers.route.js";
import { supabase } from "./services/database-connection.service.js";

dotenv.config();

async function main() {
  const app = express();
  const PORT = process.env.PORT || 3000;


   app.use(
    cors({
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
    })
  );
  app.use(express.json());


  // Mount routes
  app.use("/api/collection", collectionsRouter);
  app.use("/api/markers", markersRouter);

  app.get("/health", (_req, res) => res.json({ ok: true }));

 


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main().catch((error) => {
  console.error("Error starting the application:", error);
  process.exit(1);
});
