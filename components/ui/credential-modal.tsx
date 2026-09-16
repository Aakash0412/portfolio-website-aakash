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
      <DialogTrigger render={<div className="text-left w-full h-full" />}>
        {children}
      </DialogTrigger>
      <DialogContent className="border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] p-8 rounded-3xl" style={{ background: "rgba(10,10,10,0.85)", backdropFilter: "blur(24px)" }}>
        <DialogHeader>
          <div className="mb-4">
            <span className="text-[10px] tracking-widest uppercase font-mono text-[#a3a3a3] border border-white/10 bg-white/5 px-3 py-1.5 rounded-full">{tag}</span>
          </div>
          <DialogTitle className="text-2xl font-medium tracking-tight text-white mb-2 leading-tight">{title}</DialogTitle>
          <p className="text-base text-gray-400 mb-6">{org}</p>
        </DialogHeader>
        
        <div className="w-full h-px bg-gradient-to-r from-white/10 to-transparent mb-6"></div>
        
        {description ? (
          <DialogDescription className="text-[15px] text-gray-300 leading-relaxed whitespace-pre-wrap font-light">
            {description}
          </DialogDescription>
        ) : (
          <DialogDescription className="text-[15px] text-gray-500 leading-relaxed italic font-light">
            No additional description provided.
          </DialogDescription>
        )}
      </DialogContent>
    </Dialog>
  );
}
