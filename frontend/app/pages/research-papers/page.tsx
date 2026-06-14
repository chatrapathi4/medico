"use client"

import { useState } from "react"
import { FileText, Search, ExternalLink, Download, User, Calendar, BookOpen, Quote, Filter } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ResearchPaper {
  id: string
  title: string
  authors: string[]
  date: string
  journal: string
  abstract: string
  citations: number
  doi: string
}

export default function ResearchPapersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [status, setStatus] = useState("all")

  const papers: ResearchPaper[] = [
    {
      id: "1",
      title: "Artificial Intelligence in Early Detection of Cardiovascular Diseases",
      authors: ["Dr. Sarah Chen", "Michael Rodriguez", "Dr. David Smith"],
      date: "May 2026",
      journal: "Journal of Medical Informatics",
      abstract: "This study explores deep learning architectures for analyzing echocardiograms and predicting occult cardiomyopathy with 94% precision...",
      citations: 42,
      doi: "10.1016/j.jmi.2026.04.012"
    },
    {
      id: "2",
      title: "Neurological Impacts of Synthetic Environmental Pollutants",
      authors: ["Dr. Elena Rossi", "Dr. James Wilson"],
      date: "March 2026",
      journal: "Nature Health",
      abstract: "Analysis of longitudinal data from 10,000 subjects over five years suggests a direct correlation between microplastic exposure and cognitive decline...",
      citations: 128,
      doi: "10.1038/nh.2026.03.001"
    },
    {
      id: "3",
      title: "Novel Immunotherapy Approaches for Metastatic Melanoma",
      authors: ["Dr. Amara Okoro", "Thomas Weber"],
      date: "January 2026",
      journal: "Clinical Oncology Review",
      abstract: "A synthesis of phase III trials using combined checkpoint inhibitors shows significantly improved progression-free survival in treatment-resistant cases...",
      citations: 89,
      doi: "10.1111/cor.2026.11"
    }
  ]

  const filteredPapers = papers.filter(paper => 
    paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    paper.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
    paper.authors.some(a => a.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-500 font-medium text-xs">
            <BookOpen className="w-3.5 h-3.5" />
            Academic Database
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Research Papers</h1>
          <p className="text-muted-foreground max-w-lg">Access peer-reviewed clinical studies and medical research papers referenced by our AI assistant.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="glass h-11 px-4 gap-2">
            <Filter className="w-4 h-4" />
            Sort by Impact
          </Button>
        </div>
      </div>

      {/* Search Section */}
      <div className="relative group">
         <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-accent/30 rounded-2xl blur-lg opacity-20 group-focus-within:opacity-40 transition-opacity" />
         <div className="relative glass rounded-2xl p-1.5 flex items-center">
            <div className="pl-4">
              <Search className="w-5 h-5 text-muted-foreground" />
            </div>
            <Input 
              placeholder="Search by title, author, or DOI..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-0 bg-transparent shadow-none focus-visible:ring-0 text-lg h-12"
            />
            <Button className="hidden sm:flex rounded-xl bg-gradient-to-r from-primary to-accent text-primary-foreground h-12 px-8">
              Analyze Research
            </Button>
         </div>
      </div>

      {/* Grid */}
      <div className="space-y-6">
        {filteredPapers.map((paper) => (
          <Card key={paper.id} className="glass dark:bg-card/30 group hover:border-primary/50 transition-all duration-300 overflow-hidden">
             <div className="p-6 md:p-8 flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3 space-y-4">
                   <div className="flex flex-wrap items-center gap-3">
                      <Badge variant="secondary" className="bg-secondary/80 font-semibold">{paper.journal}</Badge>
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        {paper.date}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground border-l border-border pl-3">
                        <Quote className="w-3.5 h-3.5" />
                        {paper.citations} citations
                      </span>
                   </div>
                   
                   <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                     {paper.title}
                   </h2>
                   
                   <div className="flex items-center gap-2 overflow-x-auto pb-1">
                      {paper.authors.map((author, index) => (
                        <span key={index} className="flex items-center gap-1 text-sm bg-secondary/50 px-2.5 py-1 rounded-full text-foreground whitespace-nowrap">
                          <User className="w-3 h-3 text-muted-foreground" />
                          {author}
                        </span>
                      ))}
                   </div>
                   
                   <p className="text-muted-foreground text-sm leading-relaxed">
                     <span className="font-semibold text-foreground mr-2">Abstract:</span>
                     {paper.abstract}
                   </p>
                </div>
                
                <div className="lg:w-1/3 flex lg:flex-col justify-end gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-border/50 lg:pl-8">
                   <Button className="flex-1 lg:w-full rounded-xl bg-primary hover:bg-primary/90 gap-2 h-12">
                      <ExternalLink className="w-4 h-4" />
                      Open Paper
                   </Button>
                   <Button variant="outline" className="flex-1 lg:w-full rounded-xl glass hover:bg-secondary gap-2 h-12">
                      <Download className="w-4 h-4" />
                      PDF
                   </Button>
                   <div className="hidden lg:block pt-4">
                      <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest mb-1">DOI Identifier</p>
                      <p className="text-xs font-mono text-primary truncate">{paper.doi}</p>
                   </div>
                </div>
             </div>
          </Card>
        ))}
        
        {filteredPapers.length === 0 && (
          <div className="py-20 text-center glass rounded-3xl">
            <h3 className="text-xl font-medium text-muted-foreground">No papers found matching your criteria</h3>
            <Button variant="ghost" onClick={() => setSearchQuery("")} className="mt-4 text-primary">Clear all filters</Button>
          </div>
        )}
      </div>
    </div>
  )
}
