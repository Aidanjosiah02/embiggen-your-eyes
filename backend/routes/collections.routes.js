// backend/routes/collections.routes.js
import { Router } from "express";
import { getCollection, saveCollection } from "../controllers/collections.cotroller.js";

const router = Router();

router.get("/", getCollection);
router.post("/", saveCollection);

export default router;
