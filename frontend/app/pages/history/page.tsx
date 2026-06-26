"use client"

import { useEffect, useState } from "react"
import {
  History,
  Search,
  Calendar,
  ChevronRight,
  MoreHorizontal,
  Pencil,
  Pin,
  Trash2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { API_URL } from "@/lib/api"
import { DeleteChatDialog } from "@/components/delete-chat-dialog";
import { RenameChatDialog } from "@/components/rename-chat-dialog";

interface HistoryItem {
  id: string
  title: string
  created_at: string
  pinned: boolean
}

export default function HistoryPage() {
  const router = useRouter()

  const [history, setHistory] = useState<HistoryItem[]>([])

  const [loading, setLoading] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [selectedChat, setSelectedChat] = useState<HistoryItem | null>(null);

  const [deleting, setDeleting] = useState(false);
  const [renameOpen, setRenameOpen] = useState(false);

  const [renaming, setRenaming] = useState(false);

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/history`
      )

      const data = await response.json()

      if (data.success) {
        setHistory(data.chats)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
 const deleteChat = async () => {
  if (!selectedChat) return;

  setDeleting(true);

  try {
    const response = await fetch(
      `${API_URL}/api/chat/${selectedChat.id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (data.success) {
      setHistory((prev) =>
        prev.filter(
          (chat) => chat.id !== selectedChat.id
        )
      );

      setDeleteDialogOpen(false);
      setSelectedChat(null);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setDeleting(false);
  }
};

const renameChat = async (
  title: string
) => {
  if (!selectedChat) return;

  setRenaming(true);

  try {
    const response = await fetch(
      `${API_URL}/api/chat/${selectedChat.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          title,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      setHistory((prev) =>
        prev.map((chat) =>
          chat.id === selectedChat.id
            ? {
                ...chat,
                title,
              }
            : chat
        )
      );

      setRenameOpen(false);
      setSelectedChat(null);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setRenaming(false);
  }
};

const togglePin = async (chat: HistoryItem) => {
  try {
    const response = await fetch(
      `${API_URL}/api/chat/${chat.id}/pin`,
      {
        method: "PATCH",
      }
    );

    const data = await response.json();

    if (data.success) {
      setHistory((prev) => {
        const updated = prev.map((item) =>
          item.id === chat.id
            ? {
                ...item,
                pinned: data.pinned,
              }
            : item
        );

        // Keep pinned chats on top
        return updated.sort((a, b) => {
          if (a.pinned === b.pinned) {
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          }

          return a.pinned ? -1 : 1;
        });
      });
    }
  } catch (error) {
    console.error(error);
  }
};

  const openChat = (id: string) => {
    router.push(`/chat/${id}`)
  }

  const formatDate = (
    dateString: string
  ) => {
    const date = new Date(dateString)

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    )
  }

  const formatTime = (
    dateString: string
  ) => {
    const date = new Date(dateString)

    return date.toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-muted-foreground">
          Loading history...
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Search History
        </h1>

        <p className="text-muted-foreground text-sm">
          Review your past medical AI consultations
        </p>
      </div>

      {history.length > 0 ? (
        <div className="grid gap-3">
          {history.map((item) => (
            <Card
              key={item.id}
              onClick={() => openChat(item.id)}
              className="
                glass
                cursor-pointer
                group
                hover:bg-secondary/30
                transition-all
                duration-300
              "
            >
              <div className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Search className="w-5 h-5 text-primary" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 min-w-0">
                      {item.pinned && (
                        <Pin className="h-4 w-4 text-primary fill-primary flex-shrink-0" />
                      )}

                      <h3 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(
                          item.created_at
                        )}
                      </span>

                      <span>
                        {formatTime(
                          item.created_at
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      className="w-48"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedChat(item);
                          setRenameOpen(true);
                        }}
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Rename
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePin(item);
                        }}
                      >
                        <Pin className="mr-2 h-4 w-4" />

                        {item.pinned ? "Unpin Chat" : "Pin Chat"}
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        className="text-red-500 focus:text-red-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedChat(item);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Chat
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center mb-6">
            <History className="w-10 h-10 text-muted-foreground/50" />
          </div>

          <h2 className="text-xl font-semibold mb-2">
            No research history found
          </h2>

          <p className="text-muted-foreground max-w-xs">
            Your medical AI searches will appear here once you start exploring.
          </p>

          <Button
            variant="outline"
            className="mt-8 rounded-xl"
            onClick={() => router.push("/")}
          >
            Start New Search
          </Button>
        </div>
      )}
      <DeleteChatDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={deleteChat}
        chatTitle={selectedChat?.title ?? ""}
        loading={deleting}
      />
      <RenameChatDialog
        open={renameOpen}
        onOpenChange={setRenameOpen}
        title={selectedChat?.title ?? ""}
        loading={renaming}
        onSave={renameChat}
      />
    </div>
  )
}