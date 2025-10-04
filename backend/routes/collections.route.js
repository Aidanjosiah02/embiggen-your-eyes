import { Router } from "express";
import {
  getCollection,
  saveCollection,
} from "../controllers/collections.cotroller.js";

const router = Router();

router.get("/getCollection", getCollection); //Get all collections from database using collection name
router.post("/saveCollection", saveCollection); //Save all collections from frontend in database

export default router;
