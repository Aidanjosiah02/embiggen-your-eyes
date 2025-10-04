import express from "express";
import { connectToDatabase } from "./config/database.js";
import { disconnectFromDatabase } from "./config/database.js";

main.catch((error) => {
  console.error("App can not run. Error:", error);
});

function main() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  //frontend static html, css, js files. Should be accessible! Used to hide the folder path from users.
  app.use(express.static("public"));
  app.use("/collection", collections.router);
  app.use("/markers");

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  console.log();
  connectToDatabase();
}
