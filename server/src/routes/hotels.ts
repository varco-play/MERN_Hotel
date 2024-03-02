import express from "express";
import { serachHotels } from "../controllers/hotel";

const router = express.Router();

router.get("/search", serachHotels);

export default router;
