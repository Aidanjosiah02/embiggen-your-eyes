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
markersRouter.get("/getMarkers", getMarkers); // get all markers
markersRouter.post("/saveMarkers", saveMarkers); // save markers


markersRouter.get("/getMarkers/:id", getMarkersById);
markersRouter.get("/getMarkers/colllection/:collection", getMarkersByCollection);
markersRouter.get("/getMarkers/name/:name", getMarkersByName);
markersRouter.get("/getMarkers/:collection/:name", getMarkersByCollectionOrName);

export default markersRouter;
