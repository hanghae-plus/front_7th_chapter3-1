import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import type { DialogMode, EntityType } from "../types";
import { entityCopy } from "../constants";

interface EntityDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  entityType: EntityType;
  mode: DialogMode;
  children: React.ReactNode;
  onClose: () => void;
}

export const EntityDialog = ({
  open,
  entityType,
  mode,
  title,
  description,
  children,
  onClose,
}: EntityDialogProps) => {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const heading =
    title ??
    `${mode === "create" ? "새" : ""} ${entityCopy[entityType].label}${
      mode === "create" ? " 만들기" : " 수정"
    }`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-8"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl border bg-background shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="border-b px-6 py-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {entityCopy[entityType].label}
              </p>
              <h2 className="text-xl font-semibold text-foreground">{heading}</h2>
              {description && (
                <p className="text-muted-foreground mt-1 text-sm">{description}</p>
              )}
            </div>
            <Button type="button" variant="ghost" size="icon" onClick={onClose}>
              <span className="sr-only">닫기</span>
              <span aria-hidden="true">&times;</span>
            </Button>
          </div>
        </header>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
};

