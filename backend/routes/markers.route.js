import { Router } from "express";
import { getMarkers, saveMarkers } from "../controllers/markers.controller.js";

const router = Router();

router.get("/getMarkers", getMarkers); //Get all markers from database using collection name
router.post("/saveMarkers", saveMarkers); //Save all markers from frontend in database

export default router;
