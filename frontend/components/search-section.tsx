"use client"

import { Search, Sparkles, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchSectionProps {
  query: string
  onQueryChange: (value: string) => void
  onSearch: (query: string) => void
}

const suggestions = [
  { label: "Dengue symptoms", icon: "🦟" },
  { label: "Diabetes causes", icon: "🩺" },
  { label: "Migraine treatment", icon: "💊" },
  { label: "COVID symptoms", icon: "🫁" },
]

export function SearchSection({ query, onQueryChange, onSearch }: SearchSectionProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
<div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] px-4 py-4">      {/* Title */}
      <div className="text-center mb-6 space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/30 mb-4">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">Powered by Advanced AI</span>
        </div>
        
        <h1 className="
          text-3xl
          md:text-4xl
          lg:text-5xl
          font-bold
          leading-[1.1]
          tracking-tight
        ">
              <span className="block text-foreground">
                Your Trusted
              </span>

              <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Medical AI Assistant
              </span>
            </h1>
        
        <p className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground">
          Get instant, reliable answers to your health questions from trusted medical sources
        </p>
      </div>
      
      {/* Search Box */}
      <form onSubmit={handleSubmit} className="w-full max-w-2xl mb-8">
        <div className="relative group">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-2xl opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500" />
          
          <div className="relative glass glow-border rounded-2xl overflow-hidden">
            <div className="flex items-center">
              <div className="pl-5">
                <Search className="w-5 h-5 text-primary" />
              </div>
              
              <input
                type="text"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Ask a trusted medical question..."
                className="flex-1 bg-transparent px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              
              <button 
                type="submit"
                className={cn(
                  "m-2 px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all duration-300",
                  query.trim() 
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50" 
                    : "bg-secondary text-muted-foreground cursor-not-allowed"
                )}
                disabled={!query.trim()}
              >
                <span className="hidden sm:inline">Search</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </form>
      
      {/* Suggestion Chips */}
      <div className="flex flex-wrap justify-center gap-3">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.label}
            onClick={() => onSearch(suggestion.label)}
            className="group px-5 py-2.5 rounded-xl glass border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
          >
            <span className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              <span>{suggestion.icon}</span>
              <span>{suggestion.label}</span>
            </span>
          </button>
        ))}
      </div>
      
      {/* Features */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full">
        {[
          { title: "Trusted Sources", desc: "WHO, CDC, Mayo Clinic" },
          { title: "AI-Powered", desc: "Advanced medical analysis" },
          { title: "Always Updated", desc: "Latest medical research" },
        ].map((feature) => (
          <div key={feature.title} className="glass rounded-xl p-4 text-center border border-border/50">
            <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
