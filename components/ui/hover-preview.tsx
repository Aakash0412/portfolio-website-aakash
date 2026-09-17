"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

interface HoverPreviewProps {
  children: React.ReactNode;
  imageUrl?: string | null;
  altText?: string;
  className?: string;
}

export function HoverPreview({ children, imageUrl, altText = "Preview", className = "" }: HoverPreviewProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleMouseEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const popupWidth = 360;
      
      // Default position: to the right of the card
      let left = rect.right + 20;
      const top = rect.top;

      // If it overflows the right edge, position to the left of the card instead
      if (left + popupWidth > window.innerWidth - 20) {
        left = rect.left - popupWidth - 20;
      }

      setPopupPos({ top, left });
    }
    setIsHovered(true);
  };

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
            pointerEvents: "none",
            transition: "opacity 0.2s ease-in-out, transform 0.15s ease-out",
            transform: isHovered ? "translateY(0)" : "translateY(10px)",
          }}
        >
          {isHovered && (
            <div className="overflow-hidden rounded-xl shadow-2xl bg-[#0a0a0a] flex items-center justify-center w-[360px] min-h-[200px]" style={{ backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}>
              {imageUrl ? (
                <Image 
                  src={imageUrl} 
                  alt={altText} 
                  width={360} 
                  height={240} 
                  className="object-cover w-[360px] h-auto"
                  style={{ opacity: 0.95 }}
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center text-gray-500">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-3 opacity-50"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                  <p className="text-sm font-medium">Preview unavailable</p>
                </div>
              )}
            </div>
          )}
        </div>,
        document.body
      )}
    </>
  );
}
