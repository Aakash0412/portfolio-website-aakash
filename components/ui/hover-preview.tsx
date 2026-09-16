"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

interface HoverPreviewProps {
  children: React.ReactNode;
  imageUrl?: string | null;
  iframeUrl?: string | null;
  altText?: string;
  className?: string;
}

export function HoverPreview({ children, imageUrl, iframeUrl, altText = "Preview", className = "" }: HoverPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const popupWidth = iframeUrl ? 480 : 360;
      
      // Default position: to the right of the card
      let left = rect.right + 20;
      let top = rect.top;

      // If it overflows the right edge, position to the left of the card instead
      if (left + popupWidth > window.innerWidth - 20) {
        left = rect.left - popupWidth - 20;
      }

      setPopupPos({ top, left });
    }
    setIsHovered(true);
  };

  const isPdf = imageUrl?.toLowerCase().endsWith(".pdf");

  return (
    <>
      <div 
        ref={triggerRef}
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </div>

      {mounted && createPortal(
        <div
          style={{
            position: "fixed",
            top: popupPos.top,
            left: popupPos.left,
            zIndex: 9999,
            opacity: isHovered ? 1 : 0,
            pointerEvents: isHovered ? "auto" : "none",
            transition: "opacity 0.2s ease-in-out, transform 0.15s ease-out",
            transform: isHovered ? "translateY(0)" : "translateY(10px)",
          }}
        >
          {isHovered && (
            <div className="overflow-hidden rounded-xl shadow-2xl bg-[#0a0a0a]" style={{ backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}>
              {iframeUrl ? (
                <iframe 
                  src={iframeUrl} 
                  className="w-[480px] h-[320px] border-none bg-white rounded-xl"
                  title={altText}
                />
              ) : isPdf && imageUrl ? (
                <iframe 
                  src={`${imageUrl}#toolbar=0&navpanes=0&scrollbar=0`} 
                  className="w-[360px] h-[480px] border-none bg-white rounded-xl"
                  title={altText}
                />
              ) : imageUrl ? (
                <Image 
                  src={imageUrl} 
                  alt={altText} 
                  width={320} 
                  height={200} 
                  className="object-cover w-[320px] h-auto"
                  style={{ opacity: 0.95 }}
                />
              ) : null}
            </div>
          )}
        </div>,
        document.body
      )}
    </>
  );
}
