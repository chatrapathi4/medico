"use client"

import { useState } from "react"
import { Search, Heart, Brain, Activity, Stethoscope, Baby, Pill, Filter, ChevronRight } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const categories = [
  { id: "1", name: "Cardiology", icon: Heart, count: 124, color: "text-red-500", bg: "bg-red-500/10" },
  { id: "2", name: "Neurology", icon: Brain, count: 86, color: "text-purple-500", bg: "bg-purple-500/10" },
  { id: "3", name: "Dermatology", icon: Pill, count: 62, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { id: "4", name: "Endocrinology", icon: Activity, count: 45, color: "text-green-500", bg: "bg-green-500/10" },
  { id: "5", name: "Mental Health", icon: Stethoscope, count: 112, color: "text-blue-500", bg: "bg-blue-500/10" },
  { id: "6", name: "Pediatrics", icon: Baby, count: 94, color: "text-pink-500", bg: "bg-pink-500/10" },
]

export default function MedicalTopicsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Medical Topics</h1>
        <p className="text-muted-foreground">Explore curated medical categories and deep-dive into specialized health knowledge.</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search medical categories..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 glass border-border/50 text-sm h-11"
          />
        </div>
        <Badge variant="outline" className="h-11 px-4 gap-2 flex items-center glass border-border/50 cursor-pointer hover:bg-secondary">
          <Filter className="w-4 h-4" />
          Filters
        </Badge>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="glass dark:bg-card/30 group hover:border-primary/50 transition-all duration-300 overflow-hidden cursor-pointer">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${category.bg}`}>
                  <category.icon className={`w-6 h-6 ${category.color}`} />
                </div>
                <div className="text-xs text-muted-foreground font-medium px-2 py-1 bg-secondary rounded-lg">
                  {category.count} Articles
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4 italic">
                Latest breakthroughs and comprehensive guides in specialized {category.name.toLowerCase()} care.
              </p>
              
              <div className="flex items-center text-xs font-medium text-primary group-hover:underline">
                Explore Topic
                <ChevronRight className="w-4 h-4 ml-1" />
              </div>
            </div>
            {/* Bottom Accent Line */}
            <div className="h-1 w-0 bg-primary group-hover:w-full transition-all duration-500" />
          </Card>
        ))}
      </div>
      
      {filteredCategories.length === 0 && (
        <div className="py-20 text-center text-muted-foreground">
          No categories match "{searchQuery}"
        </div>
      )}
    </div>
  )
}
