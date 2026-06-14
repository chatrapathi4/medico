"use client"

import { Menu, Moon, Sun, Settings, Stethoscope } from "lucide-react"

interface NavbarProps {
  onMenuClick: () => void
  onSettingsClick?: () => void
  theme: "dark" | "light"
  onThemeToggle: () => void
}

export function Navbar({ onMenuClick, onSettingsClick, theme, onThemeToggle }: NavbarProps) {
  return (
    <header className="h-16 glass border-b border-border/50 flex items-center justify-between px-4 lg:px-6">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
            <Stethoscope className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg text-foreground hidden sm:block">
            MediSearch <span className="text-primary">AI</span>
          </span>
        </div>
      </div>
      
      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Settings */}
        <button 
          onClick={onSettingsClick}
          className="p-2.5 rounded-xl glass hover:bg-secondary/80 transition-all duration-200 group"
          aria-label="Settings"
        >
          <Settings className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </button>
        
        
      </div>
    </header>
  )
}
