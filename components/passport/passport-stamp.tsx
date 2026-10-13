"use client";

import React from "react";
import { JourneyMilestone } from "@/lib/passport-config";

interface PassportStampProps {
  milestone: JourneyMilestone;
  isPinnedTimeline?: boolean;
}

export function PassportStamp({ milestone }: PassportStampProps) {
  const { stampType, inkColor, title, organization, dateLabel, stampLabel, subtitle, isCurrent, location } = milestone;

  // Visual ink color classes
  const inkClass = {
    burgundy: "stamp-ink-burgundy",
    navy: "stamp-ink-navy",
    charcoal: "stamp-ink-charcoal",
    gold: "stamp-ink-gold",
    faded: "stamp-ink-faded",
  }[inkColor] || "stamp-ink-charcoal";

  if (stampType === "placeholder") {
    return (
      <div className="passport-stamp stamp-placeholder">
        <div className="stamp-placeholder-inner">
          <div className="stamp-kicker">{stampLabel}</div>
          <div className="stamp-placeholder-title">{title}</div>
          <div className="stamp-placeholder-sub">{organization}</div>
          <div className="stamp-placeholder-meta">
            <span>{dateLabel}</span>
          </div>
        </div>
      </div>
    );
  }

  if (stampType === "circular") {
    return (
      <div className={`passport-stamp stamp-circular ${inkClass} ${isCurrent ? "stamp-is-current" : ""}`}>
        <div className="stamp-circular-outer-ring">
          <svg className="stamp-curved-svg" viewBox="0 0 200 200" aria-hidden="true">
            <path id={`circle-path-${milestone.id}`} d="M 100, 100 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0" fill="none" />
            <text className="stamp-curved-text">
              <textPath href={`#circle-path-${milestone.id}`} startOffset="50%" textAnchor="middle">
                ★ {stampLabel} · {location || "VERIFIED"} ★
              </textPath>
            </text>
          </svg>
          <div className="stamp-circular-core">
            <span className="stamp-dept-code">SASTRA · CSBS</span>
            <span className="stamp-main-title">{title}</span>
            <span className="stamp-org-title">{organization}</span>
            <div className="stamp-date-badge">
              <span className="stamp-date-text">{dateLabel}</span>
            </div>
            {isCurrent && <span className="stamp-current-tag">ACTIVE / ONGOING</span>}
          </div>
        </div>
      </div>
    );
  }

  if (stampType === "crested") {
    return (
      <div className={`passport-stamp stamp-crested ${inkClass} ${isCurrent ? "stamp-is-current" : ""}`}>
        <div className="stamp-crested-border">
          <div className="stamp-header-bar">
            <span className="stamp-kicker-text">DISPATCH NO. 01</span>
            <span className="stamp-status-mark">VERIFIED</span>
          </div>
          <div className="stamp-crested-body">
            <div className="stamp-label-tiny">{stampLabel}</div>
            <h4 className="stamp-title-strong">{title}</h4>
            <div className="stamp-org-line">{organization}</div>
            {subtitle && <p className="stamp-sub-line">{subtitle}</p>}
          </div>
          <div className="stamp-footer-bar">
            <span className="stamp-date-tag">{dateLabel}</span>
            <span className="stamp-security-code">REF // ML-AI</span>
          </div>
        </div>
      </div>
    );
  }

  if (stampType === "oval") {
    return (
      <div className={`passport-stamp stamp-oval ${inkClass} ${isCurrent ? "stamp-is-current" : ""}`}>
        <div className="stamp-oval-inner">
          <div className="stamp-kicker">{stampLabel}</div>
          <h4 className="stamp-title-medium">{title}</h4>
          <p className="stamp-org-line">{organization}</p>
          <div className="stamp-oval-divider"></div>
          <div className="stamp-date-tag">{dateLabel}</div>
        </div>
      </div>
    );
  }

  // Rectangular stamp default
  return (
    <div className={`passport-stamp stamp-rectangular ${inkClass} ${isCurrent ? "stamp-is-current" : ""}`}>
      <div className="stamp-rect-header">
        <span className="stamp-rect-kicker">{stampLabel}</span>
        {isCurrent && <span className="stamp-current-pill">CURRENT ROLE</span>}
      </div>
      <div className="stamp-rect-body">
        <h4 className="stamp-title-strong">{title}</h4>
        <div className="stamp-org-line">{organization}</div>
        {subtitle && <p className="stamp-sub-line">{subtitle}</p>}
      </div>
      <div className="stamp-rect-footer">
        <span className="stamp-dates-inout">{dateLabel}</span>
        <span className="stamp-visa-badge">AUTH · OK</span>
      </div>
    </div>
  );
}
