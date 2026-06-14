"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { SearchSection } from "@/components/search-section"
import { ChatInterface } from "@/components/chat-interface"
import { FloatingOrbs } from "@/components/floating-orbs"
import { Particles } from "@/components/particles"
import { SettingsModal } from "@/components/settings-modal"
import { useTheme } from "next-themes";
import { useSidebar } from "@/components/sidebar-provider";

export default function MediSearchAI() {
  
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const {
    collapsed: sidebarCollapsed,
    setCollapsed: setSidebarCollapsed
  } = useSidebar();
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const { theme, setTheme } = useTheme();
  const [messages, setMessages] = useState<Array<{
    role: "user" | "assistant"
    content: string
    sources?: Array<{
      name: string
      title: string
      snippet: string
      url: string
    }>
    keyPoints?: string[]
  }>>([])
  const [isTyping, setIsTyping] = useState(false)



  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return
    
    setMessages(prev => [...prev, { role: "user", content: searchQuery }])
    setQuery("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: getAIResponse(searchQuery),
        keyPoints: getKeyPoints(searchQuery),
        sources: getSources()
      }])
      setIsTyping(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Background Effects */}
      <FloatingOrbs />
      <Particles />
      
      {/* Main Layout */}
      <div className="flex h-screen relative z-10">
        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen} 
          isCollapsed={sidebarCollapsed}
          onClose={() => setSidebarOpen(false)} 
          onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
        />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Navbar */}
          
          {/* Content Area */}
          <main className="flex-1 overflow-auto">
            {messages.length === 0 ? (
              <SearchSection 
                query={query}
                onQueryChange={setQuery}
                onSearch={handleSearch}
              />
            ) : (
              <ChatInterface 
                messages={messages}
                query={query}
                onQueryChange={setQuery}
                onSearch={handleSearch}
                isTyping={isTyping}
              />
            )}
          </main>
          
          {/* Footer */}
          <footer className="text-center py-4 px-6 text-muted-foreground text-sm border-t border-border/50">
            <p>This AI provides educational medical information only. Always consult a healthcare professional.</p>
          </footer>
        </div>
      </div>

      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  )
}

function getAIResponse(query: string): string {
  const responses: Record<string, string> = {
    "dengue": "Dengue fever is a mosquito-borne tropical disease caused by the dengue virus. The disease is transmitted primarily by Aedes aegypti mosquitoes. Symptoms typically begin 3-14 days after infection and may include high fever, severe headache, pain behind the eyes, muscle and joint pain, nausea, vomiting, swollen glands, and rash. In severe cases, dengue can develop into dengue hemorrhagic fever or dengue shock syndrome, which can be life-threatening.",
    "diabetes": "Diabetes is a chronic metabolic disease characterized by elevated blood glucose levels. Type 1 diabetes occurs when the pancreas produces little or no insulin. Type 2 diabetes is caused by the body's ineffective use of insulin, often linked to excess body weight and physical inactivity. Key risk factors include family history, obesity, sedentary lifestyle, poor diet, age over 45, and certain ethnic backgrounds.",
    "migraine": "Migraines are recurring headaches that cause moderate to severe throbbing or pulsing pain, usually on one side of the head. Treatment options include pain-relieving medications (triptans, ergots, NSAIDs), preventive medications (beta-blockers, antidepressants, anti-seizure drugs), and lifestyle modifications. Non-drug treatments include relaxation techniques, biofeedback, cognitive behavioral therapy, and acupuncture.",
    "covid": "COVID-19 is caused by the SARS-CoV-2 virus. Common symptoms include fever or chills, cough, shortness of breath, fatigue, muscle or body aches, headache, new loss of taste or smell, sore throat, congestion, nausea or vomiting, and diarrhea. Symptoms typically appear 2-14 days after exposure. Most people experience mild to moderate illness, but some may develop severe complications."
  }
  
  const lowerQuery = query.toLowerCase()
  for (const [key, response] of Object.entries(responses)) {
    if (lowerQuery.includes(key)) return response
  }
  
  return "Based on your query, I've analyzed trusted medical sources to provide you with accurate information. Please note that this is for educational purposes only. For personalized medical advice, please consult with a healthcare professional who can evaluate your specific situation and medical history."
}

function getKeyPoints(query: string): string[] {
  const lowerQuery = query.toLowerCase()
  
  if (lowerQuery.includes("dengue")) {
    return [
      "Transmitted by Aedes aegypti mosquitoes",
      "Symptoms appear 3-14 days after infection",
      "Can develop into severe forms requiring immediate medical attention",
      "No specific antiviral treatment - supportive care is essential"
    ]
  }
  if (lowerQuery.includes("diabetes")) {
    return [
      "Two main types: Type 1 and Type 2",
      "Lifestyle factors play a major role in Type 2",
      "Regular monitoring of blood glucose is crucial",
      "Manageable with proper diet, exercise, and medication"
    ]
  }
  if (lowerQuery.includes("migraine")) {
    return [
      "Affects one in seven people worldwide",
      "Multiple treatment options available",
      "Triggers can include stress, certain foods, and hormonal changes",
      "Preventive strategies can reduce frequency"
    ]
  }
  if (lowerQuery.includes("covid")) {
    return [
      "Highly contagious respiratory illness",
      "Vaccination significantly reduces severe outcomes",
      "Symptoms vary from mild to severe",
      "Testing and isolation help prevent spread"
    ]
  }
  
  return [
    "Consult reliable medical sources",
    "Speak with a healthcare provider for personalized advice",
    "Early detection and treatment improve outcomes"
  ]
}

function getSources() {
  return [
    {
      name: "WHO",
      title: "World Health Organization - Health Topics",
      snippet: "Authoritative information on global health issues, disease outbreaks, and medical guidelines.",
      url: "https://www.who.int"
    },
    {
      name: "CDC",
      title: "Centers for Disease Control and Prevention",
      snippet: "Science-based health information for the public, healthcare providers, and public health professionals.",
      url: "https://www.cdc.gov"
    },
    {
      name: "Mayo Clinic",
      title: "Mayo Clinic - Patient Care and Health Information",
      snippet: "Expert-reviewed medical information on diseases, conditions, and treatments.",
      url: "https://www.mayoclinic.org"
    }
  ]
}
