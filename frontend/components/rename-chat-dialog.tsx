"use client";

import { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";

interface RenameChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  loading?: boolean;
  onSave: (title: string) => void;
}

export function RenameChatDialog({
  open,
  onOpenChange,
  title,
  loading = false,
  onSave,
}: RenameChatDialogProps) {
  const [value, setValue] = useState(title);

  useEffect(() => {
    setValue(title);
  }, [title, open]);

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Rename Chat
          </AlertDialogTitle>
        </AlertDialogHeader>

        <Input
          autoFocus
          value={value}
          maxLength={100}
          disabled={loading}
          onChange={(e) =>
            setValue(e.target.value)
          }
          placeholder="Enter chat title..."
        />

        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={
              loading || !value.trim()
            }
            onClick={(e) => {
              e.preventDefault();
              onSave(value);
            }}
          >
            {loading
              ? "Saving..."
              : "Save"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}