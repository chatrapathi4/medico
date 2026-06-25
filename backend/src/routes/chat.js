import express from "express";
import { chat, getChat } from "../controllers/chatController.js";

const router = express.Router();

router.post("/", chat);
router.get("/:id", getChat);

export default router;