"use client";

import React from "react";
import { JourneyMilestone, FUTURE_STAMPS } from "@/lib/passport-config";
import { PassportStamp } from "./passport-stamp";
import { FlightPath } from "./flight-path";

interface JourneyPageProps {
  milestones: JourneyMilestone[];
  stampsRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  flightPathRef: React.RefObject<SVGPathElement | null>;
}

export function JourneyPage({ milestones, stampsRefs, flightPathRef }: JourneyPageProps) {
  return (
    <div className="passport-page passport-page-right">
      {/* Background Guilloche Security Pattern */}
      <div className="passport-security-pattern" aria-hidden="true" />
      
      {/* Document Header */}
      <div className="passport-doc-header">
        <div className="passport-state-badge">
          <span className="passport-emblem-icon">✦</span>
          <span className="passport-state-name">CAREER VISAS &amp; ENTRY STAMPS</span>
        </div>
        <div className="passport-type-badge">
          <span>PAGE 03</span>
          <span className="passport-doc-no">CONTINUOUS RECORD</span>
        </div>
      </div>

      <div className="journey-stamps-container">
        {/* Animated Flight Path Line */}
        <FlightPath pathRef={flightPathRef} />

        {/* Stamps Grid / Flow */}
        <div className="journey-stamps-flow">
          {milestones.map((milestone, idx) => (
            <div
              key={milestone.id}
              ref={(el) => {
                stampsRefs.current[idx] = el;
              }}
              className={`journey-stamp-item journey-stamp-pos-${idx + 1}`}
            >
              <PassportStamp milestone={milestone} />
            </div>
          ))}

          {/* Future Placeholders */}
          {FUTURE_STAMPS.map((placeholder, idx) => {
            const overallIdx = milestones.length + idx;
            return (
              <div
                key={placeholder.id}
                ref={(el) => {
                  stampsRefs.current[overallIdx] = el;
                }}
                className={`journey-stamp-item journey-stamp-future journey-stamp-pos-${overallIdx + 1}`}
              >
                <PassportStamp
                  milestone={{
                    id: placeholder.id,
                    category: "future",
                    stampType: "placeholder",
                    inkColor: "faded",
                    title: placeholder.title,
                    organization: placeholder.organization,
                    dateLabel: placeholder.dateLabel,
                    stampLabel: placeholder.stampLabel,
                    isCurrent: false,
                    subtitle: placeholder.note,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Page Footer Watermark */}
      <div className="passport-page-footer">
        <span>PASSPORT JOURNEY — AAKASH A.</span>
        <span>SASTRA · CSBS · 2023–2027</span>
      </div>
    </div>
  );
}
