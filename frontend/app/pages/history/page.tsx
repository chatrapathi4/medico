"use client"

import { useState } from "react"
import { History, Trash2, Search, Calendar, Clock, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface HistoryItem {
  id: string
  query: string
  date: string
  time: string
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([
    { id: "1", query: "Symptoms of severe dehydration in adults", date: "Today", time: "10:30 AM" },
    { id: "2", query: "Interactions between Ibuprofen and blood thinners", date: "Today", time: "09:15 AM" },
    { id: "3", query: "Benefits of Mediterranean diet for heart health", date: "Yesterday", time: "04:45 PM" },
    { id: "4", query: "How to improve sleep hygiene naturally", date: "Yesterday", time: "11:20 AM" },
    { id: "5", query: "Difference between Type 1 and Type 2 diabetes", date: "Jun 5, 2026", time: "02:10 PM" },
  ])

  const clearHistory = () => {
    setHistory([])
  }

  const deleteItem = (id: string) => {
    setHistory(history.filter(item => item.id !== id))
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Search History</h1>
          <p className="text-muted-foreground text-sm">Review your past medical AI consultations</p>
        </div>
        {history.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearHistory}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      {history.length > 0 ? (
        <div className="space-y-6">
          {/* Grouping by date could be added here, but for now just a list */}
          <div className="grid gap-3">
            {history.map((item) => (
              <Card key={item.id} className="glass group hover:bg-secondary/30 transition-all duration-300">
                <div className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Search className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                        {item.query}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {item.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => deleteItem(item.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-full bg-secondary/50 flex items-center justify-center mb-6">
            <History className="w-10 h-10 text-muted-foreground/50" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No research history found</h2>
          <p className="text-muted-foreground max-w-xs">
            Your medical AI searches will appear here once you start exploring.
          </p>
          <Button variant="outline" className="mt-8 rounded-xl" onClick={() => window.location.href = '/'}>
            Start New Search
          </Button>
        </div>
      )}
    </div>
  )
}
