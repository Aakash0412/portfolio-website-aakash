"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Profile, Education, Experience, Leadership, Project, Certification } from "@prisma/client";
import {
  buildJourneyMilestones,
  resolveCurrentStatus,
  FUTURE_STAMPS,
} from "@/lib/passport-config";
import { PassportBook } from "./passport-book";

interface PassportSectionProps {
  profile: Profile | null;
  education: Education[];
  experience: Experience[];
  leadership: Leadership[];
  projects: Project[];
  certifications: Certification[];
}

export function PassportSection({
  profile,
  education,
  experience,
  leadership,
  projects,
  certifications,
}: PassportSectionProps) {
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const flightPathRef = useRef<SVGPathElement>(null);
  const stampsRefs = useRef<(HTMLDivElement | null)[]>([]);

  const milestones = buildJourneyMilestones({
    education,
    experience,
    leadership,
    projects,
    certifications,
  });

  const statusInfo = resolveCurrentStatus(profile, education, leadership, experience);
  const totalStampsCount = milestones.length + FUTURE_STAMPS.length;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // Desktop Spread Experience (min-width: 1024px) without reduced motion
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        if (!pinContainerRef.current || !bookRef.current) return;

        const pathEl = flightPathRef.current;
        let pathLength = 0;
        if (pathEl) {
          pathLength = pathEl.getTotalLength ? pathEl.getTotalLength() : 1200;
          gsap.set(pathEl, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
          });
        }

        // Initialize stamps to hidden for sequential press reveal
        const validStampEls = stampsRefs.current.filter(Boolean) as HTMLDivElement[];
        gsap.set(validStampEls, {
          opacity: 0,
          scale: 1.08,
          y: 12,
        });

        // Entrance timeline for the whole passport container
        const entranceTl = gsap.timeline({
          scrollTrigger: {
            trigger: pinContainerRef.current,
            start: "top 85%",
            end: "top 25%",
            scrub: 0.5,
          },
        });

        entranceTl.fromTo(
          bookRef.current,
          { opacity: 0.85, y: 30 },
          { opacity: 1, y: 0, ease: "power2.out" }
        );

        // Pinned scrub timeline
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: pinContainerRef.current,
            start: "top 70px",
            end: "+=1200", // controlled, comfortable pinning distance
            pin: true,
            scrub: 0.7,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // 1. Draw flight path progressively
        if (pathEl) {
          scrollTl.to(pathEl, {
            strokeDashoffset: 0,
            ease: "none",
            duration: 1,
          }, 0);
        }

        // 2. Reveal stamps sequentially as the flight path passes them
        validStampEls.forEach((stampEl, idx) => {
          const stepPosition = (idx / Math.max(1, validStampEls.length - 1)) * 0.85;
          scrollTl.to(
            stampEl,
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.16,
              ease: "power2.out",
            },
            stepPosition
          );
        });

        // Ensure comfortable hold before release
        scrollTl.to({}, { duration: 0.15 });
      }
    );

    // Mobile / Tablet (< 1024px) or Reduced Motion Fallback
    mm.add(
      "(max-width: 1023px), (prefers-reduced-motion: reduce)",
      () => {
        const pathEl = flightPathRef.current;
        if (pathEl) {
          gsap.set(pathEl, {
            strokeDasharray: "none",
            strokeDashoffset: 0,
            opacity: 1,
          });
        }

        const validStampEls = stampsRefs.current.filter(Boolean) as HTMLDivElement[];
        gsap.set(validStampEls, {
          opacity: 1,
          scale: 1,
          y: 0,
        });

        if (bookRef.current) {
          gsap.set(bookRef.current, {
            opacity: 1,
            y: 0,
          });
        }
      }
    );

    return () => {
      mm.revert();
    };
  }, [totalStampsCount]);

  return (
    <section id="passport" className="passport-section-wrapper" ref={pinContainerRef}>
      <div className="passport-section-intro">
        <div className="container">
          <div className="section-eyebrow-dossier">
            <span className="dossier-tag">OFFICIAL RECORD</span>
            <span className="dossier-divider">/</span>
            <span className="dossier-code">DOSSIER REF: AA-2023 // CAREER PASSPORT</span>
          </div>
          <h2 className="passport-section-title">Professional Journey &amp; Career Visas</h2>
          <p className="passport-section-desc">
            Documented milestones across systems engineering, AI research, leadership, and technical architecture.
          </p>
        </div>
      </div>

      <div className="container passport-container">
        <PassportBook
          profile={profile}
          statusInfo={statusInfo}
          milestones={milestones}
          stampsRefs={stampsRefs}
          flightPathRef={flightPathRef}
          bookRef={bookRef}
        />
      </div>
    </section>
  );
}
