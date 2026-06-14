'use client'

import React from 'react'
import { SettingsModal } from '@/components/settings-modal'
import { Button } from '@/components/ui/button'
import { Settings, User } from 'lucide-react'
import Link from 'next/link'

export default function SettingsPreviewPage() {
  const [open, setOpen] = React.useState(true)

  return (
    <div className="min-h-screen bg-[#08090a] flex flex-col items-center justify-center p-4">
      {/* Background Decorative Elements (to match the project's vibe) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="z-10 text-center space-y-8 max-w-2xl">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Settings Component Preview</h1>
          <p className="text-muted-foreground text-lg">
            This page demonstrates the new Settings Modal designed to match your application's aesthetic.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button 
            size="lg" 
            onClick={() => setOpen(true)}
            className="rounded-xl h-12 px-8 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
          >
            <Settings className="w-5 h-5 mr-4" />
            Open Settings Modal
          </Button>

          <Link href="/">
            <Button variant="outline" size="lg" className="rounded-xl h-12 px-8 glass hover:bg-white/5">
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
          <div className="p-6 rounded-2xl glass border-white/10 text-left space-y-2">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              Native Integration
            </h3>
            <p className="text-sm text-muted-foreground">
              Reuses your existing <code>Dialog</code>, <code>Button</code>, <code>Avatar</code>, and <code>ScrollArea</code> components.
            </p>
          </div>
          <div className="p-6 rounded-2xl glass border-white/10 text-left space-y-2">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Settings className="w-4 h-4 text-primary" />
              Theming
            </h3>
            <p className="text-sm text-muted-foreground">
              Automatically inherits your <code>glass</code> effect, gradients, and OKLCH color variables.
            </p>
          </div>
        </div>
      </div>

      <SettingsModal open={open} onOpenChange={setOpen} />
    </div>
  )
}
