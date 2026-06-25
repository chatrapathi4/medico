import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import chatRoutes from "./routes/chat.js";

import historyRoutes from "./routes/history.js";



const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoutes);
app.use("/api/history", historyRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port " + (process.env.PORT || 5000));
});