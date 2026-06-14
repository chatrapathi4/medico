'use client'

import * as React from 'react'
import { 
  User, 
  Settings2, 
  Palette, 
  Brain, 
  Bell, 
  Monitor, 
  CheckSquare, 
  Link as LinkIcon, 
  Rocket, 
  Info, 
  Terminal,
  LogOut,
  Mail,
  Smartphone,
  ShieldCheck,
  HelpCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface SettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const sidebarItems = [
  { id: 'account', label: 'Account', icon: User, category: 'Account' },
  { id: 'preferences', label: 'Preferences', icon: Settings2, category: 'Account' },
  { id: 'personalization', label: 'Personalization', icon: Palette, category: 'Account' },
  { id: 'memory', label: 'Memory', icon: Brain, category: 'Account' },
  { id: 'notifications', label: 'Notifications', icon: Bell, category: 'Account' },
  { id: 'computer', label: 'Computer', icon: Monitor, category: 'Computer' },
  { id: 'skills', label: 'Skills', icon: CheckSquare, category: 'Computer' },
  { id: 'connectors', label: 'Connectors', icon: LinkIcon, category: 'Computer' },
  { id: 'upgrade', label: 'Upgrade to Enterprise', icon: Rocket, category: 'Other', highlight: true },
  { id: 'about', label: 'About Enterprise', icon: Info, category: 'Other' },
  { id: 'api', label: 'API Platform', icon: Terminal, category: 'Other' },
]

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const [activeTab, setActiveTab] = React.useState('account')

  const groupedItems =  sidebarItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = []
    acc[item.category].push(item)
    return acc
  }, {} as Record<string, typeof sidebarItems>)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
          className="
            sm:max-w-[1000px]
            w-[95vw]
            h-[90vh]
            p-0
            overflow-hidden
            bg-card
            border-border
            shadow-2xl
            flex
            flex-col
            md:flex-row
            rounded-3xl
          "
        >
        <DialogHeader className="sr-only">
          <DialogTitle>Settings</DialogTitle>
        </DialogHeader>
        {/* Sidebar */}
          <aside className="w-full md:w-64 bg-sidebar flex flex-col shrink-0 border-r border-sidebar-border">          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="p-4 pt-6 flex flex-col gap-6">
              <h2 className="px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">Settings</h2>
              {Object.entries(groupedItems).map(([category, items]) => (
                <div key={category} className="space-y-1">
                  <h2 className="px-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2">
                    {category}
                  </h2>
                  <nav className="space-y-0.5">
                    {items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group relative",
                          activeTab === item.id 
                            ? "bg-secondary text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                        )}
                      >
                        {activeTab === item.id && (
                          <div className="absolute left-0 w-1 h-4 bg-primary rounded-r-full" />
                        )}
                        <item.icon className={cn(
                          "w-4 h-4",
                          activeTab === item.id ? "text-primary" : "group-hover:text-primary"
                        )} />
                        {item.label}
                      </button>
                    ))}
                  </nav>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-white/5">
            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/50">
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-background min-h-0 custom-scrollbar">
          <div className="max-w-3xl mx-auto p-8 md:p-12 w-full">
              {activeTab === 'account' ? (
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-400">
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-foreground">Account</h3>
                    
                    <div className="space-y-8">
                      {/* Avatar */}
                      <div className="flex items-center justify-between gap-4 group">
                        <div className="flex items-center gap-4 min-w-0">
                          <Avatar className="h-12 w-12 ring-2 ring-white/5 shrink-0">
                            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold">
                              CT
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-0.5 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">Chatrapathi reddy Thigulla</p>
                            <p className="text-xs text-muted-foreground truncate">chatrapath84287</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="
                              bg-card
                              border-border
                              text-foreground
                              hover:bg-primary
                              hover:text-primary-foreground
                              hover:border-primary
                              transition-all
                              duration-200
                              text-xs
                              h-8
                              px-4
                              rounded-lg
                              ">
                          Change avatar
                        </Button>
                      </div>

                      {/* Details */}
                      <div className="flex items-center justify-between gap-4">
                        <div className="space-y-0.5 min-w-0">
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Full Name</p>
                          <p className="text-sm text-foreground truncate">Chatrapathi reddy Thigulla</p>
                        </div>
                        <Button variant="outline" size="sm" className="
                              bg-card
                              border-border
                              text-foreground
                              hover:bg-primary
                              hover:text-primary-foreground
                              hover:border-primary
                              transition-all
                              duration-200
                              text-xs
                              h-8
                              px-4
                              rounded-lg
                            ">
                          Change full name
                        </Button>
                      </div>

                      <div className="flex items-center justify-between gap-4">
                        <div className="space-y-0.5 min-w-0">
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Username</p>
                          <p className="text-sm text-foreground truncate">chatrapath84287</p>
                        </div>
                        <Button variant="outline" size="sm" className="
                            bg-card
                            border-border
                            text-foreground
                            hover:bg-primary
                            hover:text-primary-foreground
                            hover:border-primary
                            transition-all
                            duration-200
                            text-xs
                            h-8
                            px-4
                            rounded-lg
                          ">
                          Change username
                        </Button>
                      </div>

                      <div className="space-y-0.5 min-w-0">
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Email</p>
                        <p className="text-sm text-foreground truncate">chatrapathireddythigulla@gmail.com</p>
                      </div>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-sm font-semibold text-foreground">Your Subscription</h3>
                    <div className="p-6 rounded-2xl bg-card border border-border space-y-4 shadow-sm">
                      <div className="space-y-1.5">
                        <p className="text-sm font-medium text-foreground">Your subscription is paused</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Update your billing details to resume access to your Pro features.
                        </p>
                      </div>
                      <Button className="h-9 px-4 text-xs font-medium rounded-lg shrink-0 w-fit">
                        Update billing
                      </Button>
                      
                      <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4">
                        <div className="space-y-0.5 min-w-0">
                          <p className="text-xs font-medium text-foreground leading-tight">Unlock the most powerful search experience with Perplexity <span className="text-primary font-bold">Pro</span></p>
                          <p className="text-[10px] text-muted-foreground">Get the most out of Perplexity with Pro. <span className="text-primary cursor-pointer hover:underline">Learn more</span></p>
                        </div>
                        <Button variant="outline" size="sm" className="
                              bg-card
                              border-border
                              text-foreground
                              hover:bg-primary
                              hover:text-primary-foreground
                              hover:border-primary
                              transition-all
                              duration-200
                              text-xs
                              h-8
                              px-4
                              rounded-lg
                            ">
                          Upgrade plan
                        </Button>
                      </div>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-sm font-semibold text-foreground">Security</h3>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium text-foreground">Two-factor authentication</p>
                        <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                      <Button variant="outline" size="sm" className="
                          bg-card
                          border-border
                          text-foreground
                          hover:bg-primary
                          hover:text-primary-foreground
                          hover:border-primary
                          transition-all
                          duration-200
                          text-xs
                          h-8
                          px-4
                          rounded-lg
                        ">
                        Set up
                      </Button>
                    </div>
                  </section>

                  <section className="space-y-6 pt-4">
                    <h3 className="text-sm font-semibold text-foreground">System</h3>
                    
                    <div className="space-y-6">
                      <div className="flex items-center justify-between gap-4 p-1">
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-sm text-muted-foreground truncate">Support</span>
                        </div>
                        <Button variant="outline" size="sm" className="
                          bg-card
                          border-border
                          text-foreground
                          hover:bg-primary
                          hover:text-primary-foreground
                          hover:border-primary
                          transition-all
                          duration-200
                          text-xs
                          h-8
                          px-4
                          rounded-lg
                        ">
                          Contact
                        </Button>
                      </div>

                      <div className="flex items-center justify-between gap-4 p-1">
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="text-sm text-muted-foreground truncate">You are signed in as <span className="text-foreground">chatrapath84287</span></span>
                        </div>
                        <Button variant="outline" size="sm" className="
                          bg-card
                          border-border
                          text-foreground
                          hover:bg-primary
                          hover:text-primary-foreground
                          hover:border-primary
                          transition-all
                          duration-200
                          text-xs
                          h-8
                          px-4
                          rounded-lg
                        ">
                          Sign out
                        </Button>
                      </div>
                    </div>
                  </section>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4 animate-in fade-in zoom-in-95 duration-400">
                  <div className="p-5 rounded-3xl bg-white/[0.03] ring-1 ring-white/10">
                    <Settings2 className="w-8 h-8 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      {sidebarItems.find(i => i.id === activeTab)?.label}
                    </h3>
                    <p className="text-muted-foreground text-sm max-w-[280px] leading-relaxed">
                      Customizing your {activeTab} settings is coming soon. We're working on making this perfect.
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab('account')} 
                    className="
                      bg-card
                      border-border
                      text-foreground
                      hover:bg-primary
                      hover:text-primary-foreground
                      hover:border-primary
                      transition-all
                      duration-200
                      text-xs
                      h-8
                      px-4
                      rounded-lg
                    "
                  >
                    Return to Account
                  </Button>
                </div>
              )}
            </div>
          </div>
      </DialogContent>
    </Dialog>
  )
}
