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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isHovered) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
          setMousePos({ x: e.clientX, y: e.clientY });
        });
      }
    };

    if (isHovered) {
      window.addEventListener("mousemove", handleMouseMove);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isHovered]);

  const isPdf = imageUrl?.toLowerCase().endsWith(".pdf");

  return (
    <>
      <div 
        className={className}
        onMouseEnter={(e) => {
          setIsHovered(true);
          setMousePos({ x: e.clientX, y: e.clientY });
        }}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </div>

      {mounted && createPortal(
        <div
          style={{
            position: "fixed",
            top: mousePos.y,
            left: mousePos.x,
            pointerEvents: "none",
            transform: "translate(15px, 15px)", // offset from cursor
            zIndex: 9999,
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.2s ease-in-out, transform 0.1s ease-out",
            scale: isHovered ? 1 : 0.95,
          }}
        >
          {isHovered && (
            <div className="overflow-hidden rounded-xl shadow-2xl bg-[#0a0a0a]" style={{ backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}>
              {iframeUrl ? (
                <iframe 
                  src={iframeUrl} 
                  className="w-[480px] h-[320px] border-none bg-white pointer-events-none rounded-xl"
                  title={altText}
                />
              ) : isPdf && imageUrl ? (
                <iframe 
                  src={`${imageUrl}#toolbar=0&navpanes=0&scrollbar=0`} 
                  className="w-[360px] h-[480px] border-none pointer-events-none bg-white rounded-xl"
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
