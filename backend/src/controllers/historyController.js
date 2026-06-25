import { supabase } from "../config/supabase.js";

export const getChats = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("chats")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) throw error;

    res.json({
      success: true,
      chats: data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch chats",
    });
  }
};