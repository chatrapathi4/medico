"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { 
  Search, 
  History, 
  Stethoscope, 
  Bookmark, 
  Settings,
  FileText,
  Plus,
  X,
  Bell,
  Rocket,
  Languages,
  HelpCircle,
  LogOut,
  BookOpen,
  MessageCircle,
  Keyboard,
  ExternalLink,
  Flag,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  Check,
   Monitor, Moon, Sun
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu"
import { KeyboardShortcutsDialog } from "./KeyboardShortcutsDialog";
interface SidebarProps {
  isOpen: boolean
  isCollapsed: boolean
  onToggleCollapse: () => void
  onClose: () => void
  onSettingsClick: () => void
}

const menuItems = [
  { icon: Plus, label: "New Search", href: "/" },
  { icon: History, label: "History", href: "/pages/history" },
  { icon: Stethoscope, label: "Medical Topics", href: "/pages/medical-topics" },
  { icon: Bookmark, label: "Saved Answers", href: "/pages/saved-answers" },
  { icon: FileText, label: "Research Papers", href: "/pages/research-papers" },
]

export function Sidebar({ isOpen, isCollapsed, onToggleCollapse, onClose, onSettingsClick }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [language, setLanguage] = useState("English");
  const [openShortcuts, setOpenShortcuts] = useState(false);
  const { theme, setTheme } = useTheme();
  const [logoHovered, setLogoHovered] = useState(false);
  const [history, setHistory] = useState([]);
  useEffect(() => {
  fetchHistory();
    }, []);

    const fetchHistory = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/history"
        );

        const data = await response.json();

        setHistory(data.chats);
      } catch (error) {
        console.error(error);
      }
    };

  return (
    
    <>
      {/* Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-card/50 z-40 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 glass border-r border-border/50 flex flex-col transition-all duration-300 lg:translate-x-0",
          isCollapsed ? "w-20" : "w-72",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="p-6 flex items-center justify-between">

          <div
            className="flex items-center gap-3"
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
          >
            <button
              onClick={isCollapsed ? onToggleCollapse : undefined}
              className="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30"
            >
              {isCollapsed && logoHovered ? (
                <PanelLeftOpen className="w-5 h-5 text-primary-foreground" />
              ) : (
                <Stethoscope className="w-5 h-5 text-primary-foreground" />
              )}
            </button>

            {!isCollapsed && (
              <div>
                <h1 className="font-semibold text-foreground">
                  MediSearch
                </h1>
                <p className="text-xs text-muted-foreground">
                  AI Health Assistant
                </p>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg hover:bg-secondary"
            >
              <PanelLeftClose className="h-7 w-7" />
            </button>
          )}

          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

        </div>
        
        {/* Quick Search */}
        {!isCollapsed && (
        <div className="px-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text"
              placeholder="Quick search..."
              className="w-full pl-10 pr-4 py-2.5 bg-secondary/50 border border-border/50 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
            />
          </div>
        </div>
        )}
        
        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "w-full flex items-center rounded-xl text-sm font-medium transition-all duration-200 group",
                  isCollapsed
                    ? "justify-center px-2 py-3"
                    : "gap-3 px-4 py-3",
                  isActive
                    ? "bg-linear-to-r from-primary/20 to-accent/10 text-foreground border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 transition-colors",
                  isActive ? "text-primary" : "group-hover:text-primary"
                )} />
                {!isCollapsed && (
                  <span>{item.label}</span>
                )}
                {isActive && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-primary animate-pulse" />
                )}
              </Link>
            )
          })}
        </nav>

        
        {/* Footer */}
        <div className="p-4 border-t border-border/50">
          <div className="space-y-4">
            <button className="mx-auto flex w-full max-w-45 items-center justify-center gap-2 rounded-full border border-border/60 bg-secondary/35 px-4 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:bg-secondary/55 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10" onClick={() => router.push("/pages/upgradeplan")}>
              
              <Rocket className="h-4 w-4 text-primary" />
              {!isCollapsed && (
                <span>Upgrade Plan</span>
              )}
            </button>

            <div className="h-px w-full bg-border/70" />

            {isCollapsed ? (
              <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-border/50 hover:bg-secondary/40 transition-colors">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-linear-to-br from-primary to-accent text-xs font-semibold text-primary-foreground">
                      CR
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                side="right"
                align="end"
                sideOffset={12}
                className="w-70 rounded-2xl border border-border/60 bg-card p-2 text-foreground shadow-xl backdrop-blur-xl"
              >
              <DropdownMenuLabel className="px-3 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-border/50">
                      <AvatarFallback className="bg-linear-to-br from-primary to-accent text-sm font-semibold text-primary-foreground">
                        CR
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-foreground">
                        Chatrapathi re...
                      </div>
                      <div className="truncate text-xs text-muted-foreground">
                        chatrapathi.research@medisearch.ai
                      </div>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="my-1 bg-border/70" />
                <DropdownMenuItem
                  className="rounded-xl px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:bg-secondary/60 focus:text-foreground"
                  onSelect={onSettingsClick}
                >
                  <Settings className="mr-3 h-4 w-4 text-primary" />
                  <span>Settings</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="rounded-xl px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:bg-secondary/60 focus:text-foreground"
                  onSelect={() => router.push("/pages/upgradeplan")}
                >
                  <Rocket className="mr-3 h-4 w-4 text-primary" />
                  <span>Upgrade Plan</span>
                </DropdownMenuItem>
                <DropdownMenuSub>
                <DropdownMenuSubTrigger
                  className="
                    rounded-xl
                    px-3
                    py-2.5
                    text-sm
                    text-foreground
                    outline-none
                    transition-colors

                    hover:bg-secondary/60
                    hover:text-foreground

                    focus:bg-secondary/60
                    focus:text-foreground

                    data-[state=open]:bg-secondary/60
                    data-[state=open]:text-foreground

                    [&>svg]:text-primary
                  "
                >
                  {theme === "light" ? (
                    <Sun className="mr-3 h-4 w-4" />
                  ) : theme === "dark" ? (
                    <Moon className="mr-3 h-4 w-4" />
                  ) : (
                    <Monitor className="mr-3 h-4 w-4" />
                  )}

                  <span>Appearance</span>

                  <span className="ml-auto mr-2 text-xs text-muted-foreground capitalize">
                    {theme || "system"}
                  </span>
                </DropdownMenuSubTrigger>

                <DropdownMenuPortal>
                  <DropdownMenuSubContent
                    side="right"
                    align="start"
                    sideOffset={8}
                    className="
                      w-56
                      rounded-2xl
                      border
                      border-border/60
                      bg-background/95
                      backdrop-blur-xl
                      p-2
                    "
                  >
                    <DropdownMenuItem
                      className="rounded-lg py-2.5"
                      onSelect={() => setTheme("light")}
                    >
                      <Sun className="mr-3 h-4 w-4" />
                      Light

                      {theme === "light" && (
                        <Check className="ml-auto h-4 w-4 text-primary" />
                      )}
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="rounded-lg py-2.5"
                      onSelect={() => setTheme("dark")}
                    >
                      <Moon className="mr-3 h-4 w-4" />
                      Dark

                      {theme === "dark" && (
                        <Check className="ml-auto h-4 w-4 text-primary" />
                      )}
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="rounded-lg py-2.5"
                      onSelect={() => setTheme("system")}
                    >
                      <Monitor className="mr-3 h-4 w-4" />
                      System

                      {theme === "system" && (
                        <Check className="ml-auto h-4 w-4 text-primary" />
                      )}
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

                <DropdownMenuSub>
                <DropdownMenuSubTrigger   className="
                    rounded-xl
                    px-3
                    py-2.5
                    text-sm
                    text-foreground
                    outline-none
                    transition-colors

                    hover:bg-secondary/60
                    hover:text-foreground

                    focus:bg-secondary/60
                    focus:text-foreground

                    data-[state=open]:bg-secondary/60
                    data-[state=open]:text-foreground

                    [&>svg]:text-primary
                  ">
                  <Languages className="mr-3 h-4 w-4 text-primary" />

                  <span>Language</span>

                  <span className="ml-auto mr-2 text-xs text-muted-foreground">
                    {language}
                  </span>
                </DropdownMenuSubTrigger>

                <DropdownMenuPortal>
                  <DropdownMenuSubContent
                    side="right"
                    align="start"
                    sideOffset={8}
                    className="
                      w-72
                      rounded-2xl
                      border
                      border-border/60
                      bg-card/95
                      p-2
                      text-foreground
                      shadow-xl
                      backdrop-blur-xl
                      max-h-[350px]
                      overflow-y-auto
                    "
                  >
                    {[
                      "Default",
                      "العربية",
                      "বাংলা",
                      "Čeština",
                      "Deutsch",
                      "Ελληνικά",
                      "British English",
                      "American English",
                      "Español",
                      "Français",
                      "हिन्दी",
                      "Italiano",
                      "日本語",
                      "한국어",
                      "Português",
                      "Русский",
                      "Türkçe",
                      "中文",
                    ].map((lang) => (
                      <DropdownMenuItem
                        key={lang}
                        className="rounded-lg py-2.5"
                        onSelect={() => setLanguage(lang)}
                      >
                        <span>{lang}</span>

                        {language === lang && (
                          <Check className="ml-auto h-4 w-4 text-primary" />
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

                <DropdownMenuSub>
                <DropdownMenuSubTrigger   className="
                    rounded-xl
                    px-3
                    py-2.5
                    text-sm
                    text-foreground
                    outline-none
                    transition-colors

                    hover:bg-secondary/60
                    hover:text-foreground

                    focus:bg-secondary/60
                    focus:text-foreground

                    data-[state=open]:bg-secondary/60
                    data-[state=open]:text-foreground

                    [&>svg]:text-primary
                  ">
                  <HelpCircle className="mr-3 h-4 w-4 text-primary" />
                  <span>Help</span>
                </DropdownMenuSubTrigger>

                <DropdownMenuPortal>
                  <DropdownMenuSubContent
                    side="right"
                    align="start"
                    sideOffset={8}
                    className="
                      w-64
                      rounded-2xl
                      border
                      border-border/60
                      bg-card/95
                      p-2
                      text-foreground
                      shadow-2xl
                      shadow-xl
                      backdrop-blur-xl
                    "
                  >
                    <DropdownMenuItem
                      className="rounded-lg py-2.5"
                      onSelect={() =>
                        window.open("https://yourdomain.com/get-started", "_blank")
                      }
                    >
                      <BookOpen className="mr-3 h-4 w-4" />
                      Get Started
                      <ExternalLink className="ml-auto h-3.5 w-3.5 opacity-60" />
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="rounded-lg py-2.5"
                      onSelect={() =>
                        window.open("https://yourdomain.com/help-center", "_blank")
                      }
                    >
                      <HelpCircle className="mr-3 h-4 w-4" />
                      Help Center
                      <ExternalLink className="ml-auto h-3.5 w-3.5 opacity-60" />
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="rounded-lg py-2.5"
                      onSelect={() => router.push("/pages/changelog")}
                    >
                      <Flag className="mr-3 h-4 w-4" />
                      Changelog
                      <ExternalLink className="ml-auto h-3.5 w-3.5 opacity-60" />
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="rounded-lg py-2.5"
                      onSelect={() => router.push("/pages/blog")}
                    >
                      <FileText className="mr-3 h-4 w-4" />
                      Blog
                      <ExternalLink className="ml-auto h-3.5 w-3.5 opacity-60" />
                    </DropdownMenuItem>

                    <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      setOpenShortcuts(true);
                    }}
                  >
                    <Keyboard className="mr-3 h-4 w-4" />
                    Keyboard Shortcuts
                  </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      className="rounded-lg py-2.5"
                      onSelect={() => router.push("/pages/contact-support")}
                    >
                      <MessageCircle className="mr-3 h-4 w-4" />
                      Contact Support
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      className="rounded-lg py-2.5"
                      onSelect={() => router.push("/pages/terms")}
                    >
                      Terms of Service
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="rounded-lg py-2.5"
                      onSelect={() => router.push("/pages/privacy")}
                    >
                      Privacy Policy
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

                <DropdownMenuSeparator className="my-1 bg-border/70" />

                <DropdownMenuItem
                  variant="destructive"
                  className="rounded-xl px-3 py-2.5 text-sm outline-none transition-colors focus:bg-destructive/10"
                  onSelect={() => router.push("/logout")}
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-2xl border border-border/50 bg-secondary/20 px-3 py-2.5 text-left transition-all duration-200 hover:bg-secondary/35 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <Avatar className="h-9 w-9 border border-border/50 shadow-sm">
                    <AvatarFallback className="bg-linear-to-br from-primary to-accent text-xs font-semibold text-primary-foreground">
                      CR
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-foreground">
                      Chatrapathi re...
                    </div>
                    <div className="truncate text-xs text-muted-foreground">
                      chatrapathi.research@medisearch.ai
                    </div>
                  </div>

                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border/50 bg-background/20 text-muted-foreground transition-colors hover:text-foreground">
                    <Bell className="h-4 w-4" />
                  </div>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="
                  w-70
                  rounded-2xl
                  border
                  border-border/60
                  bg-card/95
                  p-2
                  text-foreground
                  shadow-xl
                  backdrop-blur-xl
                "
              >
                <DropdownMenuLabel className="px-3 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-border/50">
                      <AvatarFallback className="bg-linear-to-br from-primary to-accent text-sm font-semibold text-primary-foreground">
                        CR
                      </AvatarFallback>
                    </Avatar>

                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-foreground">
                        Chatrapathi re...
                      </div>
                      <div className="truncate text-xs text-muted-foreground">
                        chatrapathi.research@medisearch.ai
                      </div>
                    </div>
                  </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator className="my-1 bg-border/70" />
                <DropdownMenuSeparator className="my-1 bg-border/70" />
                <DropdownMenuItem
                  className="rounded-xl px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:bg-secondary/60 focus:text-foreground"
                  onSelect={onSettingsClick}
                >
                  <Settings className="mr-3 h-4 w-4 text-primary" />
                  <span>Settings</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  className="rounded-xl px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:bg-secondary/60 focus:text-foreground"
                  onSelect={() => router.push("/pages/upgradeplan")}
                >
                  <Rocket className="mr-3 h-4 w-4 text-primary" />
                  <span>Upgrade Plan</span>
                </DropdownMenuItem>
                <DropdownMenuSub>
                <DropdownMenuSubTrigger
                  className="
                    rounded-xl
                    px-3
                    py-2.5
                    text-sm
                    text-foreground
                    outline-none
                    transition-colors

                    hover:bg-secondary/60
                    hover:text-foreground

                    focus:bg-secondary/60
                    focus:text-foreground

                    data-[state=open]:bg-secondary/60
                    data-[state=open]:text-foreground

                    [&>svg]:text-primary
                  "
                >
                  {theme === "light" ? (
                    <Sun className="mr-3 h-4 w-4" />
                  ) : theme === "dark" ? (
                    <Moon className="mr-3 h-4 w-4" />
                  ) : (
                    <Monitor className="mr-3 h-4 w-4" />
                  )}

                  <span>Appearance</span>

                  <span className="ml-auto mr-2 text-xs text-muted-foreground capitalize">
                    {theme || "system"}
                  </span>
                </DropdownMenuSubTrigger>

                <DropdownMenuPortal>
                  <DropdownMenuSubContent
                    side="right"
                    align="start"
                    sideOffset={8}
                    className="
                      w-56
                      rounded-2xl
                      border
                      border-border/60
                      bg-background/95
                      backdrop-blur-xl
                      p-2
                    "
                  >
                    <DropdownMenuItem
                      className="rounded-lg py-2.5"
                      onSelect={() => setTheme("light")}
                    >
                      <Sun className="mr-3 h-4 w-4" />
                      Light

                      {theme === "light" && (
                        <Check className="ml-auto h-4 w-4 text-primary" />
                      )}
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="rounded-lg py-2.5"
                      onSelect={() => setTheme("dark")}
                    >
                      <Moon className="mr-3 h-4 w-4" />
                      Dark

                      {theme === "dark" && (
                        <Check className="ml-auto h-4 w-4 text-primary" />
                      )}
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="rounded-lg py-2.5"
                      onSelect={() => setTheme("system")}
                    >
                      <Monitor className="mr-3 h-4 w-4" />
                      System

                      {theme === "system" && (
                        <Check className="ml-auto h-4 w-4 text-primary" />
                      )}
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

                <DropdownMenuSub>
                <DropdownMenuSubTrigger   className="
                    rounded-xl
                    px-3
                    py-2.5
                    text-sm
                    text-foreground
                    outline-none
                    transition-colors

                    hover:bg-secondary/60
                    hover:text-foreground

                    focus:bg-secondary/60
                    focus:text-foreground

                    data-[state=open]:bg-secondary/60
                    data-[state=open]:text-foreground

                    [&>svg]:text-primary
                  ">
                  <Languages className="mr-3 h-4 w-4 text-primary" />

                  <span>Language</span>

                  <span className="ml-auto mr-2 text-xs text-muted-foreground">
                    {language}
                  </span>
                </DropdownMenuSubTrigger>

                <DropdownMenuPortal>
                  <DropdownMenuSubContent
                    side="right"
                    align="start"
                    sideOffset={8}
                    className="
                      w-72
                      rounded-2xl
                      border
                      border-border/60
                      bg-card/95
                      p-2
                      text-foreground
                      shadow-xl
                      backdrop-blur-xl
                      max-h-[350px]
                      overflow-y-auto
                    "
                  >
                    {[
                      "Default",
                      "العربية",
                      "বাংলা",
                      "Čeština",
                      "Deutsch",
                      "Ελληνικά",
                      "British English",
                      "American English",
                      "Español",
                      "Français",
                      "हिन्दी",
                      "Italiano",
                      "日本語",
                      "한국어",
                      "Português",
                      "Русский",
                      "Türkçe",
                      "中文",
                    ].map((lang) => (
                      <DropdownMenuItem
                        key={lang}
                        className="rounded-lg py-2.5"
                        onSelect={() => setLanguage(lang)}
                      >
                        <span>{lang}</span>

                        {language === lang && (
                          <Check className="ml-auto h-4 w-4 text-primary" />
                        )}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

                <DropdownMenuSub>
                <DropdownMenuSubTrigger   className="
                    rounded-xl
                    px-3
                    py-2.5
                    text-sm
                    text-foreground
                    outline-none
                    transition-colors

                    hover:bg-secondary/60
                    hover:text-foreground

                    focus:bg-secondary/60
                    focus:text-foreground

                    data-[state=open]:bg-secondary/60
                    data-[state=open]:text-foreground

                    [&>svg]:text-primary
                  ">
                  <HelpCircle className="mr-3 h-4 w-4 text-primary" />
                  <span>Help</span>
                </DropdownMenuSubTrigger>

                <DropdownMenuPortal>
                  <DropdownMenuSubContent
                    side="right"
                    align="start"
                    sideOffset={8}
                    className="
                      w-64
                      rounded-2xl
                      border
                      border-border/60
                      bg-card/95
                      p-2
                      text-foreground
                      shadow-2xl
                      shadow-xl
                      backdrop-blur-xl
                    "
                  >
                    <DropdownMenuItem
                      className="rounded-lg py-2.5"
                      onSelect={() =>
                        window.open("https://yourdomain.com/get-started", "_blank")
                      }
                    >
                      <BookOpen className="mr-3 h-4 w-4" />
                      Get Started
                      <ExternalLink className="ml-auto h-3.5 w-3.5 opacity-60" />
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="rounded-lg py-2.5"
                      onSelect={() =>
                        window.open("https://yourdomain.com/help-center", "_blank")
                      }
                    >
                      <HelpCircle className="mr-3 h-4 w-4" />
                      Help Center
                      <ExternalLink className="ml-auto h-3.5 w-3.5 opacity-60" />
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="rounded-lg py-2.5"
                      onSelect={() => router.push("/pages/changelog")}
                    >
                      <Flag className="mr-3 h-4 w-4" />
                      Changelog
                      <ExternalLink className="ml-auto h-3.5 w-3.5 opacity-60" />
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="rounded-lg py-2.5"
                      onSelect={() => router.push("/pages/blog")}
                    >
                      <FileText className="mr-3 h-4 w-4" />
                      Blog
                      <ExternalLink className="ml-auto h-3.5 w-3.5 opacity-60" />
                    </DropdownMenuItem>

                    <DropdownMenuItem
                    onSelect={(e) => {
                      e.preventDefault();
                      setOpenShortcuts(true);
                    }}
                  >
                    <Keyboard className="mr-3 h-4 w-4" />
                    Keyboard Shortcuts
                  </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      className="rounded-lg py-2.5"
                      onSelect={() => router.push("/pages/contact-support")}
                    >
                      <MessageCircle className="mr-3 h-4 w-4" />
                      Contact Support
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                      className="rounded-lg py-2.5"
                      onSelect={() => router.push("/pages/terms")}
                    >
                      Terms of Service
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="rounded-lg py-2.5"
                      onSelect={() => router.push("/pages/privacy")}
                    >
                      Privacy Policy
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

                <DropdownMenuSeparator className="my-1 bg-border/70" />

                <DropdownMenuItem
                  variant="destructive"
                  className="rounded-xl px-3 py-2.5 text-sm outline-none transition-colors focus:bg-destructive/10"
                  onSelect={() => router.push("/logout")}
                >
                  <LogOut className="mr-3 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            )}
          </div>
        </div>
      </aside>
      <KeyboardShortcutsDialog
        open={openShortcuts}
        onOpenChange={setOpenShortcuts}
      />
    </>
  )
}
