"use client"

import { useEffect, useRef, useState } from "react"
import { Search, ArrowRight, ExternalLink, CheckCircle2, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  role: "user" | "assistant"
  content: string
  sources?: Array<{
    name: string
    title: string
    snippet: string
    url: string
  }>
  keyPoints?: string[]
}

interface ChatInterfaceProps {
  messages: Message[]
  query: string
  onQueryChange: (value: string) => void
  onSearch: (query: string) => void
  isTyping: boolean
}

const sourceLogos: Record<string, { bg: string; color: string }> = {
  WHO: { bg: "from-blue-500 to-blue-600", color: "text-blue-500" },
  CDC: { bg: "from-emerald-500 to-teal-600", color: "text-emerald-500" },
  "Mayo Clinic": { bg: "from-cyan-500 to-blue-500", color: "text-cyan-500" },
}

export function ChatInterface({ messages, query, onQueryChange, onSearch, isTyping }: ChatInterfaceProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-auto px-4 lg:px-8 py-6 space-y-6">
        {messages.map((message, index) => (
          <div key={index} className={cn(
            "flex",
            message.role === "user" ? "justify-end" : "justify-start"
          )}>
            {message.role === "user" ? (
              <UserMessage content={message.content} />
            ) : (
              <AssistantMessage 
                content={message.content} 
                sources={message.sources}
                keyPoints={message.keyPoints}
              />
            )}
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="glass rounded-2xl rounded-tl-sm p-6 max-w-3xl">
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
                <span className="text-muted-foreground text-sm">Analyzing trusted sources...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <div className="border-t border-border/50 p-4 lg:px-8">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-xl opacity-20 blur group-focus-within:opacity-40 transition-opacity" />
            
            <div className="relative glass rounded-xl overflow-hidden flex items-center">
              <div className="pl-4">
                <Search className="w-5 h-5 text-muted-foreground" />
              </div>
              
              <input
                type="text"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Ask a follow-up question..."
                className="flex-1 bg-transparent px-4 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              
              <button 
                type="submit"
                className={cn(
                  "m-2 p-3 rounded-lg transition-all duration-300",
                  query.trim() 
                    ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/30" 
                    : "bg-secondary text-muted-foreground cursor-not-allowed"
                )}
                disabled={!query.trim()}
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

function UserMessage({ content }: { content: string }) {
  return (
    <div className="bg-gradient-to-r from-primary to-accent rounded-2xl rounded-tr-sm px-5 py-3 max-w-xl shadow-lg shadow-primary/20">
      <p className="text-primary-foreground">{content}</p>
    </div>
  )
}

function AssistantMessage({ 
  content, 
  sources,
  keyPoints 
}: { 
  content: string
  sources?: Message["sources"]
  keyPoints?: string[]
}) {
  const [displayedContent, setDisplayedContent] = useState("")
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    if (!content) return
    
    let index = 0
    const interval = setInterval(() => {
      if (index < content.length) {
        setDisplayedContent(content.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
        setIsAnimating(false)
      }
    }, 10)
    
    return () => clearInterval(interval)
  }, [content])

  return (
    <div className="space-y-4 max-w-3xl w-full">
      {/* Main Response */}
      <div className="glass rounded-2xl rounded-tl-sm p-6 glow-border">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground">MediSearch AI</p>
            <p className="text-xs text-muted-foreground">Trusted Medical Information</p>
          </div>
        </div>
        
        <p className="text-foreground leading-relaxed">
          {displayedContent}
          {isAnimating && <span className="animate-pulse">|</span>}
        </p>
      </div>
      
      {/* Key Points */}
      {keyPoints && keyPoints.length > 0 && !isAnimating && (
        <div className="glass rounded-xl p-5 border border-primary/20">
          <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            Key Points
          </h4>
          <ul className="space-y-2">
            {keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Sources */}
      {sources && sources.length > 0 && !isAnimating && (
        <div className="space-y-3">
          <h4 className="font-semibold text-foreground flex items-center gap-2 px-1">
            <ExternalLink className="w-5 h-5 text-primary" />
            Trusted Sources
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {sources.map((source) => (
              <SourceCard key={source.name} source={source} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function SourceCard({ source }: { source: NonNullable<Message["sources"]>[number] }) {
  const logoStyle = sourceLogos[source.name] || { bg: "from-gray-500 to-gray-600", color: "text-gray-500" }
  
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group glass rounded-xl p-4 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 block"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className={cn(
          "w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center font-bold text-foreground text-sm",
          logoStyle.bg
        )}>
          {source.name.slice(0, 2).toUpperCase()}
        </div>
        <span className={cn("font-semibold", logoStyle.color)}>{source.name}</span>
      </div>
      
      <h5 className="font-medium text-foreground text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
        {source.title}
      </h5>
      
      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
        {source.snippet}
      </p>
      
      <div className="flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Visit source</span>
        <ExternalLink className="w-3 h-3" />
      </div>
    </a>
  )
}
