"use client";

import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface CredentialModalProps {
  children: React.ReactNode;
  tag: string;
  title: string;
  org: string;
  description?: string | null;
}

export function CredentialModal({ children, tag, title, org, description }: CredentialModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="border border-white/10 shadow-2xl p-6 rounded-2xl" style={{ background: "rgba(10,10,10,0.85)", backdropFilter: "blur(16px)" }}>
        <DialogHeader>
          <div className="mb-2">
            <span className="text-xs tracking-wider uppercase opacity-60 font-mono">{tag}</span>
          </div>
          <DialogTitle className="text-xl font-medium tracking-tight mb-1">{title}</DialogTitle>
          <p className="text-sm opacity-80 mb-4">{org}</p>
        </DialogHeader>
        {description ? (
          <DialogDescription className="text-sm opacity-70 leading-relaxed whitespace-pre-wrap">
            {description}
          </DialogDescription>
        ) : (
          <DialogDescription className="text-sm opacity-70 leading-relaxed italic">
            No additional description provided.
          </DialogDescription>
        )}
      </DialogContent>
    </Dialog>
  );
}
