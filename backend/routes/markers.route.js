// routes/markers.route.js
import { Router } from "express";
import {
  getMarkers,
  saveMarkers,
  getMarkersByCollectionOrName,
  getMarkersById,
  getMarkersByCollection,
  getMarkersByName,
} from "../controllers/markers.controller.js";

const markersRouter = Router();

// existing routes
markersRouter.post("/saveMarkers", saveMarkers); // save markers
markersRouter.get("/getMarkers", getMarkersByCollectionOrName);
markersRouter.get("/getMarkers/:id", getMarkersById);
markersRouter.get("/getMarkers/colllection/:collectionId", getMarkersByCollection);
markersRouter.get("/getMarkers/name/:name", getMarkersByName);


export default markersRouter;
