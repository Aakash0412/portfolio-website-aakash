"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";

interface HoverPreviewProps {
  children: React.ReactNode;
  imageUrl: string;
  altText?: string;
  className?: string;
}

export function HoverPreview({ children, imageUrl, altText = "Preview", className = "" }: HoverPreviewProps) {
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
        // Use requestAnimationFrame for smooth tracking
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
            <div className="overflow-hidden rounded-xl shadow-2xl" style={{ background: "rgba(20,20,20,0.8)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <Image 
                src={imageUrl} 
                alt={altText} 
                width={320} 
                height={200} 
                className="object-cover w-[320px] h-auto"
                style={{ opacity: 0.95 }}
              />
            </div>
          )}
        </div>,
        document.body
      )}
    </>
  );
}
