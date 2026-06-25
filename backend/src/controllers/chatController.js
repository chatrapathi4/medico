import { generateMedicalResponse } from "../services/groqService.js";
import {
  createChat,
  saveMessage,
  getMessages,
} from "../services/chatService.js";

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