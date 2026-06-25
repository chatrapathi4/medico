import express from "express";
import { getChats } from "../controllers/historyController.js";

const router = express.Router();

router.get("/", getChats);

export default router;