"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { FloatingOrbs } from "@/components/floating-orbs"
import { Particles } from "@/components/particles"
import { SettingsModal } from "@/components/settings-modal"
import { useSidebar } from "@/components/sidebar-provider";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const {
  collapsed: sidebarCollapsed,
  setCollapsed: setSidebarCollapsed,
} = useSidebar();

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
          onClose={() => setSidebarOpen(false)} 
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
          onSettingsClick={() => setSettingsOpen(true)}
        />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          
          {/* Content Area */}
          <main className="flex-1 overflow-auto">
            {children}
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
