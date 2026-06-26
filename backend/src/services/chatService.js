import { supabase } from "../config/supabase.js";

export async function createChat(
  chatId,
  title
) {
  const { data, error } = await supabase
    .from("chats")
    .select("id")
    .eq("id", chatId)
    .maybeSingle();

  console.log("Existing chat:", data);
  console.log("Select error:", error);

  if (!data) {
    const { error: insertError } =
      await supabase.from("chats").insert({
        id: chatId,
        title,
      });

    console.log("Insert chat:", insertError);
  }
}

export async function saveMessage(
  chatId,
  role,
  content
) {
  const { error } =
    await supabase.from("messages").insert({
      chat_id: chatId,
      role,
      content,
    });

  console.log("Message insert:", error);
}

export async function getMessages(chatId) {
  const { data, error } = await supabase
    .from("messages")
    .select("role, content")
    .eq("chat_id", chatId)
    .order("created_at", {
      ascending: true,
    });

  if (error) throw error;

  return data;
}
export async function renameChat(chatId, title) {
  const { error } = await supabase
    .from("chats")
    .update({
      title,
    })
    .eq("id", chatId);

  if (error) throw error;
}

export async function togglePin(chatId) {
  // Get current pin state
  const { data, error } = await supabase
    .from("chats")
    .select("pinned")
    .eq("id", chatId)
    .single();

  if (error) throw error;

  // Toggle it
  const { error: updateError } = await supabase
    .from("chats")
    .update({
      pinned: !data.pinned,
    })
    .eq("id", chatId);

  if (updateError) throw updateError;

  return !data.pinned;
}