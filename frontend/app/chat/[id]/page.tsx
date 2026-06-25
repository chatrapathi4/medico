"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useSearchParams } from "next/navigation";

import { Sidebar } from "@/components/sidebar";
import { ChatInterface } from "@/components/chat-interface";
import { FloatingOrbs } from "@/components/floating-orbs";
import { Particles } from "@/components/particles";
import { SettingsModal } from "@/components/settings-modal";
import { useSidebar } from "@/components/sidebar-provider";
import { API_URL } from "@/lib/api";
type Message = {
  role: "user" | "assistant";
  content: string;
  animate?: boolean;
};

export default function ChatPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const chatId = params.id as string;
  const initialQuery = searchParams.get("q");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const {
    collapsed: sidebarCollapsed,
    setCollapsed: setSidebarCollapsed,
  } = useSidebar();

  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const initialQuerySent = useRef(false);

    const loadChat = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/chat/${chatId}`
        );

        const data = await response.json();

        if (data.success) {
          setMessages(
            data.messages.map((msg: Message) => ({
              ...msg,
              animate: false,
            }))
          );
        }
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      if (!chatId) return;

      // Only load from database if opened from history
      if (!initialQuery) {
        loadChat();
      }
    }, [chatId]);

  // First question from homepage
    useEffect(() => {
      if (!initialQuery) return;

      if (initialQuerySent.current) return;

      initialQuerySent.current = true;

      handleSearch(initialQuery);
    }, [initialQuery]);


  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: searchQuery,
      },
    ]);

    setQuery("");
    setIsTyping(true);

    try {
      const response = await fetch(
        `${API_URL}/api/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chatId,
            message: searchQuery,
          }),
        }
      );

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response,
          animate: true,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, something went wrong while generating the response.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <FloatingOrbs />
      <Particles />

      <div className="flex h-screen relative z-10">
        <Sidebar
          isOpen={sidebarOpen}
          isCollapsed={sidebarCollapsed}
          onClose={() => setSidebarOpen(false)}
          onToggleCollapse={() =>
            setSidebarCollapsed((prev) => !prev)
          }
        />

        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1 overflow-auto">
            <ChatInterface
              messages={messages}
              query={query}
              onQueryChange={setQuery}
              onSearch={handleSearch}
              isTyping={isTyping}
            />
          </main>

          <footer className="text-center py-4 px-6 text-muted-foreground text-sm border-t border-border/50">
            <p>
              This AI provides educational medical
              information only. Always consult a
              healthcare professional.
            </p>
          </footer>
        </div>
      </div>

      <SettingsModal
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
      />
    </div>
  );
}