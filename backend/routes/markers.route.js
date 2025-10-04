import { Router } from "express";
import { getMarkers, saveMarkers } from "../controllers/markers.controller.js";

const markersRouter = Router();

markersRouter.get("/getMarkers", getMarkers); //Get all markers from database using collection name
markersRouter.post("/saveMarkers", saveMarkers); //Save all markers from frontend in database

export default markersRouter;
