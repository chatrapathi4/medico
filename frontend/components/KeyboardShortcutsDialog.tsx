"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ShortcutProps {
  label: string;
  keys: string[];
}

function ShortcutRow({ label, keys }: ShortcutProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border/50">
      <span className="text-sm text-foreground">{label}</span>

      <div className="flex gap-1">
        {keys.map((key) => (
          <kbd
            key={key}
            className="
              min-w-7
              rounded-md
              border
              border-border
              bg-secondary/40
              px-2
              py-1
              text-xs
              text-muted-foreground
              font-medium
            "
          >
            {key}
          </kbd>
        ))}
      </div>
    </div>
  );
}

export function KeyboardShortcutsDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
            className="
                max-w-xl
                border-border
                bg-card
                text-foreground
                shadow-xl
            "
            >
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto pr-2 custom-scrollbar">
          {/* GENERAL */}
          <div className="mb-6">
            <h3 className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground">
              GENERAL
            </h3>

            <ShortcutRow
              label="New Session"
              keys={["Ctrl", "K"]}
            />

            <ShortcutRow
              label="Focus Ask Input"
              keys={["Ctrl", "J"]}
            />

            <ShortcutRow
              label="Stop Generating"
              keys={["Esc"]}
            />

            <ShortcutRow
              label="Upload File"
              keys={["Ctrl", "U"]}
            />
          </div>

          {/* NAVIGATION */}
          <div className="mb-6">
            <h3 className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground">
              NAVIGATION
            </h3>

            <ShortcutRow
              label="Open Settings"
              keys={["Ctrl", ","]}
            />

            <ShortcutRow
              label="Search History"
              keys={["Ctrl", "F"]}
            />
          </div>

          {/* INTERFACE */}
          <div className="mb-6">
            <h3 className="mb-3 text-xs font-semibold tracking-wider text-muted-foreground">
              INTERFACE
            </h3>

            <ShortcutRow
              label="Show Shortcuts"
              keys={["Ctrl", "/"]}
            />

            <ShortcutRow
              label="Toggle Sidebar"
              keys={["Ctrl", "B"]}
            />

            <ShortcutRow
              label="Toggle Theme"
              keys={["Ctrl", "Shift", "T"]}
            />
          </div>
        </div>

        <div className="flex gap-3 border-t border-border pt-4 text-xs text-muted-foreground">
          <kbd className="rounded border border-border px-2 py-1">
            Ctrl
          </kbd>
          Control

          <kbd className="rounded border border-border px-2 py-1 ml-4">
            Alt
          </kbd>
          Alt

          <kbd className="rounded border border-border px-2 py-1 ml-4">
            Shift
          </kbd>
          Shift
        </div>
      </DialogContent>
    </Dialog>
  );
}