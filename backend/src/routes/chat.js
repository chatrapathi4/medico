import express from "express";
import {
  chat,
  getChat,
  deleteChat,
  renameChat,
  pinChat,
} from "../controllers/chatController.js";

const router = express.Router();

router.post("/", chat);

router.get("/:id", getChat);

router.delete("/:id", deleteChat);

router.patch("/:id", renameChat);

router.patch("/:id/pin", pinChat);

export default router;