import { generateMedicalResponse } from "../services/groqService.js";
import {
  createChat,
  saveMessage,
  getMessages,
} from "../services/chatService.js";
import { supabase } from "../config/supabase.js";
import {
  renameChat as renameChatService,
} from "../services/chatService.js";
import { togglePin } from "../services/chatService.js";

export const chat = async (req, res) => {
  try {
    const { chatId, message } = req.body;

    console.log("Chat ID:", chatId);

    await createChat(chatId, message);

    console.log("Chat saved");

    await saveMessage(
      chatId,
      "user",
      message
    );

    console.log("User saved");

    const response =
      await generateMedicalResponse(message);

    console.log("Groq generated");

    await saveMessage(
      chatId,
      "assistant",
      response
    );

    console.log("Assistant saved");

    res.json({
      success: true,
      response,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getChat = async (req, res) => {
  try {
    const { id } = req.params;

    const messages = await getMessages(id);

    res.json({
      success: true,
      messages,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete all messages first
    const { error: messageError } = await supabase
      .from("messages")
      .delete()
      .eq("chat_id", id);

    if (messageError) {
      throw messageError;
    }

    // Delete chat
    const { error: chatError } = await supabase
      .from("chats")
      .delete()
      .eq("id", id);

    if (chatError) {
      throw chatError;
    }

    res.json({
      success: true,
      message: "Chat deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete chat",
    });
  }
};

export const renameChat = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    await renameChatService(id, title.trim());

    res.json({
      success: true,
      message: "Chat renamed successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to rename chat",
    });
  }
};

export const pinChat = async (req, res) => {
  try {
    const { id } = req.params;

    const pinned = await togglePin(id);

    res.json({
      success: true,
      pinned,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update pin status",
    });
  }
};