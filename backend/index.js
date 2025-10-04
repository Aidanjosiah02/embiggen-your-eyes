import "dotenv/config";
// import express from "express";
// //import { connectToDatabase } from "./services/database-connection.service.js";
// //import { disconnectFromDatabase } from "./services/database-connection.service.js";
// import dotenv from "dotenv";
// import CollectionRouter from "../backend/controllers/collections.cotroller,js"
// main().catch((error) => {
//   console.error("Error starting the application:", error);
//   process.exit(1);
// });

// async function main() {
//   const app = express();
//   const PORT = process.env.PORT || 3000;

//   app.use(express.json());

//   //frontend static html, css, js files. Should be accessible! Used to hide the folder path from users.
//   //   app.use(express.static("public"));
//    app.use("/api/collection", CollectionRouter);
//   //   app.use("/markers");

//   // console.log("DATABASE CONNECTION");
//   // connectToDatabase();

//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// }
// backend/index.js
import dotenv from "dotenv";
import express from "express";
import collectionsRouter from "./routes/collections.routes.js";
// import supabase from "./services/database-connection.service.js";

console.log(
  "ENV CHECK:",
  process.env.SUPABASE_SERVICE_ROLE_KEY ? "Loaded ✅" : "Missing ❌"
);

dotenv.config(); // ✅ load .env

async function main() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // Mount routes
  app.use("/api/collection", collectionsRouter); // ✅ plural + router

  app.get("/health", (_req, res) => res.json({ ok: true }));
  //frontend static html, css, js files. Should be accessible! Used to hide the folder path from users.
  //   app.use(express.static("public"));
  //   app.use("/collection", collections.router);
  //   app.use("/markers");

  //   console.log("DATABASE CONNECTION");
  //   const db = supabase;

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main().catch((error) => {
  console.error("Error starting the application:", error);
  process.exit(1);
});
