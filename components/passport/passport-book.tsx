"use client";

import React from "react";
import { Profile } from "@prisma/client";
import { JourneyMilestone } from "@/lib/passport-config";
import { BiometricPage } from "./biometric-page";
import { JourneyPage } from "./journey-page";

interface PassportBookProps {
  profile: Profile | null;
  statusInfo: {
    statusCode: string;
    statusTitle: string;
    organization: string;
    badgeLabel: string;
    isAvailable: boolean;
    subtext: string;
  };
  milestones: JourneyMilestone[];
  stampsRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  flightPathRef: React.RefObject<SVGPathElement | null>;
  bookRef: React.RefObject<HTMLDivElement | null>;
}

export function PassportBook({
  profile,
  statusInfo,
  milestones,
  stampsRefs,
  flightPathRef,
  bookRef,
}: PassportBookProps) {
  return (
    <div className="passport-spread-outer" ref={bookRef}>
      {/* Outer Passport Leatherette Cover Margin */}
      <div className="passport-cover-base">
        {/* Subtle Gold Foil Accent Line on Cover */}
        <div className="passport-cover-foil-border" aria-hidden="true" />

        {/* The Open Booklet Spread */}
        <div className="passport-spread-booklet">
          {/* Left Page: Biometric & Identity */}
          <BiometricPage profile={profile} statusInfo={statusInfo} />

          {/* Central Binding Crease & Thread Spine */}
          <div className="passport-center-spine" aria-hidden="true">
            <div className="passport-spine-shadow-left" />
            <div className="passport-spine-stitching">
              <span className="stitch" />
              <span className="stitch" />
              <span className="stitch" />
              <span className="stitch" />
              <span className="stitch" />
              <span className="stitch" />
            </div>
            <div className="passport-spine-shadow-right" />
          </div>

          {/* Right Page: Career Visas & Stamps */}
          <JourneyPage
            milestones={milestones}
            stampsRefs={stampsRefs}
            flightPathRef={flightPathRef}
          />
        </div>
      </div>
    </div>
  );
}
