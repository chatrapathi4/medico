"use client"

import { useEffect, useState } from "react"
import {
  History,
  Trash2,
  Search,
  Calendar,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { API_URL } from "@/lib/api"

interface HistoryItem {
  id: string
  title: string
  created_at: string
}

export default function HistoryPage() {
  const router = useRouter()

  const [history, setHistory] =
    useState<HistoryItem[]>([])

  const [loading, setLoading] =
    useState(true)

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
                    <h3 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>

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

                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
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
    </div>
  )
}