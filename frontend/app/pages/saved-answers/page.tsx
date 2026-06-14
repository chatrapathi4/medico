"use client"

import { useState } from "react"
import { Bookmark, Search, Trash2, ExternalLink, Share2, MessageSquare, Sparkles } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface SavedAnswer {
  id: string
  title: string
  preview: string
  category: string
  date: string
}

export default function SavedAnswersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [savedAnswers, setSavedAnswers] = useState<SavedAnswer[]>([
    { 
      id: "1", 
      title: "Impact of long COVID on heart variability", 
      preview: "Recent studies indicate that long COVID can affect the autonomic nervous system, leading to changes in heart rate variability...",
      category: "Cardiology",
      date: "2 days ago"
    },
    { 
      id: "2", 
      title: "Keto diet vs Mediterranean diet for epilepsy", 
      preview: "While both diets offer neuroprotective benefits, the ketogenic diet has been clinically studied since the 1920s for refractory epilepsy in children...",
      category: "Neurology",
      date: "1 week ago"
    },
    { 
      id: "3", 
      title: "Latest FDA approvals for Type 2 Diabetes", 
      preview: "The FDA has recently approved several new GLP-1 receptor agonists that show promise in weight management as well as glucose control...",
      category: "Endocrinology",
      date: "Jun 1, 2026"
    }
  ])

  const filteredAnswers = savedAnswers.filter(ans => 
    ans.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ans.preview.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const removeAnswer = (id: string) => {
    setSavedAnswers(savedAnswers.filter(a => a.id !== id))
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Bookmark className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Saved Answers</h1>
          <p className="text-muted-foreground">Quick access to your curated AI medical insights</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search your saved insights..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 glass border-border/50"
          />
        </div>
      </div>

      {/* Results */}
      {filteredAnswers.length > 0 ? (
        <div className="grid gap-6">
          {filteredAnswers.map((answer) => (
            <Card key={answer.id} className="glass dark:bg-neutral-900/40 p-6 hover:border-primary/40 transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                      {answer.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-medium">{answer.date}</span>
                  </div>
                  <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors cursor-pointer">
                    {answer.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                    {answer.preview}
                  </p>
                  <div className="flex items-center gap-4 pt-2">
                    <Button variant="ghost" size="sm" className="h-8 gap-2 hover:bg-primary/10 hover:text-primary">
                      <ExternalLink className="w-4 h-4" />
                      View Full
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 gap-2 hover:bg-primary/10 hover:text-primary">
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                  </div>
                </div>
                <div className="flex lg:flex-col items-center justify-center gap-2">
                   <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeAnswer(answer.id)}
                    className="h-10 w-10 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center space-y-6">
           <div className="relative inline-block">
             <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
             <div className="relative w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto">
               <Bookmark className="w-10 h-10 text-muted-foreground/30" />
             </div>
           </div>
           <div>
             <h3 className="text-xl font-semibold mb-2 text-foreground">No saved insights yet</h3>
             <p className="text-muted-foreground max-w-sm mx-auto">
               Your important AI-generated medical answers will appear here when you bookmark them.
             </p>
           </div>
           <Button variant="outline" className="rounded-xl px-8" onClick={() => window.location.href = '/'}>
             Start Researched Search
           </Button>
        </div>
      )}
    </div>
  )
}
