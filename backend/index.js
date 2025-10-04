import express from "express";
// import supabase from "./services/database-connection.service.js";

main().catch((error) => {
  console.error("Error starting the application:", error);
  process.exit(1);
});

async function main() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

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
