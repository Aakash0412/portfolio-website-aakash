"use client";

import React from "react";

interface FlightPathProps {
  pathRef: React.RefObject<SVGPathElement | null>;
  className?: string;
}

export function FlightPath({ pathRef, className = "" }: FlightPathProps) {
  return (
    <svg
      className={`flight-path-svg ${className}`}
      viewBox="0 0 600 860"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="flightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--stamp-navy, #1C355E)" stopOpacity="0.8" />
          <stop offset="50%" stopColor="var(--stamp-burgundy, #8B2635)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--stamp-gold, #9E7D3B)" stopOpacity="0.7" />
        </linearGradient>
        <filter id="inkGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Under-glow / Ghost Flight Path */}
      <path
        d="M 120 75 C 260 75, 460 110, 470 210 C 480 310, 160 270, 150 400 C 140 520, 480 470, 460 600 C 440 710, 220 680, 210 780"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="4 6"
        strokeOpacity="0.18"
      />

      {/* Main Animated Flight Path */}
      <path
        ref={pathRef}
        d="M 120 75 C 260 75, 460 110, 470 210 C 480 310, 160 270, 150 400 C 140 520, 480 470, 460 600 C 440 710, 220 680, 210 780"
        stroke="url(#flightGradient)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#inkGlow)"
        className="flight-active-line"
      />

      {/* Flight Path Waypoint Nodes */}
      <circle cx="120" cy="75" r="4.5" fill="var(--stamp-navy, #1C355E)" />
      <circle cx="470" cy="210" r="4.5" fill="var(--stamp-burgundy, #8B2635)" />
      <circle cx="150" cy="400" r="4.5" fill="var(--stamp-burgundy, #8B2635)" />
      <circle cx="460" cy="600" r="4.5" fill="var(--stamp-gold, #9E7D3B)" />
      <circle cx="210" cy="780" r="4.5" fill="var(--stamp-navy, #1C355E)" />
    </svg>
  );
}
