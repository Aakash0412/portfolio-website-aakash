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
      <DialogContent 
        className="border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.6)] rounded-3xl bg-[#0a0a0a]/95 backdrop-blur-3xl sm:max-w-[550px] gap-0"
        style={{ padding: "36px" }}
      >
        <DialogHeader className="w-full text-left">
          <div className="mb-6 flex items-center gap-3">
            <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-[#28c840] border border-[#28c840]/20 bg-[#28c840]/10 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(40,200,64,0.15)]">
              {tag}
            </span>
          </div>
          <DialogTitle className="text-3xl font-semibold tracking-tight text-white mb-3 leading-tight">
            {title}
          </DialogTitle>
          <div className="flex items-center gap-2 text-gray-400 mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            <p className="text-[15px] font-medium tracking-wide text-gray-300">{org}</p>
          </div>
        </DialogHeader>
        
        <div className="w-full h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-7"></div>
        
        <div className="w-full">
          {description ? (
            <DialogDescription className="text-base text-gray-400 leading-relaxed whitespace-pre-wrap font-light">
              {description}
            </DialogDescription>
          ) : (
            <DialogDescription className="text-base text-gray-600 leading-relaxed italic font-light">
              No additional description provided.
            </DialogDescription>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
