"use client"

import { useState } from "react"
import { SearchSection } from "@/components/search-section"
import { FloatingOrbs } from "@/components/floating-orbs"
import { Particles } from "@/components/particles"
import { Sidebar } from "@/components/sidebar"
import { SettingsModal } from "@/components/settings-modal"
import { useSidebar } from "@/components/sidebar-provider"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from "uuid"

export default function MediSearchAI() {
  const router = useRouter()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [query, setQuery] = useState("")

  const {
    collapsed: sidebarCollapsed,
    setCollapsed: setSidebarCollapsed,
  } = useSidebar()

  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return

    const chatId = uuidv4()

    router.push(
      `/chat/${chatId}?q=${encodeURIComponent(searchQuery)}`
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <FloatingOrbs />
      <Particles />

      <div className="flex h-screen relative z-10">
        <Sidebar
          isOpen={sidebarOpen}
          isCollapsed={sidebarCollapsed}
          onClose={() => setSidebarOpen(false)}
          onToggleCollapse={() =>
            setSidebarCollapsed((prev) => !prev)
          }
        />

        <div className="flex-1 flex flex-col min-w-0">
          <main className="flex-1 overflow-auto">
            <SearchSection
              query={query}
              onQueryChange={setQuery}
              onSearch={handleSearch}
            />
          </main>

          <footer className="text-center py-4 px-6 text-muted-foreground text-sm border-t border-border/50">
            <p>
              This AI provides educational medical
              information only. Always consult a
              healthcare professional.
            </p>
          </footer>
        </div>
      </div>

      <SettingsModal
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
      />
    </div>
  )
}