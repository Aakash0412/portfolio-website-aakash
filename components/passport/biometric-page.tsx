"use client";

import React from "react";
import Image from "next/image";
import { Profile } from "@prisma/client";
import { PASSPORT_METADATA } from "@/lib/passport-config";

interface BiometricPageProps {
  profile: Profile | null;
  statusInfo: {
    statusCode: string;
    statusTitle: string;
    organization: string;
    badgeLabel: string;
    isAvailable: boolean;
    subtext: string;
  };
}

export function BiometricPage({ profile, statusInfo }: BiometricPageProps) {
  const photoUrl = profile?.profileImageUrl || "/aakash-hero.jpg";
  const fullName = profile?.name || "Aakash A.";
  const nameParts = fullName.split(" ");
  const firstName = nameParts[0] || "Aakash";
  const lastName = nameParts.slice(1).join(" ") || "A.";

  return (
    <div className="passport-page passport-page-left">
      {/* Background Guilloche Security Pattern */}
      <div className="passport-security-pattern" aria-hidden="true" />
      
      {/* Document Header */}
      <div className="passport-doc-header">
        <div className="passport-state-badge">
          <span className="passport-emblem-icon">✦</span>
          <span className="passport-state-name">PORTFOLIO PASSPORT · DOSSIER</span>
        </div>
        <div className="passport-type-badge">
          <span>TYPE: {PASSPORT_METADATA.documentType}</span>
          <span className="passport-doc-no">REF: {PASSPORT_METADATA.documentCode}</span>
        </div>
      </div>

      <div className="passport-biometric-grid">
        {/* Photo Column */}
        <div className="passport-photo-wrapper">
          <div className="passport-photo-frame">
            <div className="passport-photo-corners" aria-hidden="true">
              <span className="corner tl" />
              <span className="corner tr" />
              <span className="corner bl" />
              <span className="corner br" />
            </div>
            <Image
              src={photoUrl}
              alt={`${fullName} — Official Portfolio Portrait`}
              width={260}
              height={320}
              className="passport-photo-img"
              priority
            />
            {/* Security Holographic / Document Seal Watermark */}
            <div className="passport-photo-watermark" aria-hidden="true">
              <span>AUTHENTIC RECORD</span>
            </div>
          </div>

          {/* Current Status Block */}
          <div className="passport-status-box">
            <div className="passport-status-header">
              <span className="passport-status-dot" aria-hidden="true" />
              <span className="passport-status-kicker">CURRENT STATUS</span>
            </div>
            <div className="passport-status-title">{statusInfo.statusTitle}</div>
            <div className="passport-status-org">{statusInfo.organization}</div>
            <div className="passport-status-sub">{statusInfo.subtext}</div>
          </div>
        </div>

        {/* Biometric Data Fields Column */}
        <div className="passport-fields-col">
          <div className="passport-field-row">
            <span className="field-label">SURNAME / NOM</span>
            <span className="field-value field-value-bold">{lastName.toUpperCase()}</span>
          </div>

          <div className="passport-field-row">
            <span className="field-label">GIVEN NAMES / PRÉNOMS</span>
            <span className="field-value field-value-bold">{firstName.toUpperCase()}</span>
          </div>

          <div className="passport-field-row">
            <span className="field-label">PROFESSIONAL IDENTITY</span>
            <span className="field-value">{profile?.headline || "AI SYSTEMS & SOFTWARE ENGINEER"}</span>
          </div>

          <div className="passport-field-row">
            <span className="field-label">ACADEMIC INSTITUTION</span>
            <span className="field-value">SASTRA DEEMED UNIVERSITY</span>
          </div>

          <div className="passport-field-row">
            <span className="field-label">FIELD OF PRACTICE</span>
            <span className="field-value">AI SYSTEMS · BACKEND ARCHITECTURE · DATA</span>
          </div>

          <div className="passport-field-grid-two">
            <div className="passport-field-row">
              <span className="field-label">NATIONALITY / REGION</span>
              <span className="field-value">INDIA</span>
            </div>
            <div className="passport-field-row">
              <span className="field-label">ISSUED / DÉLIVRÉ</span>
              <span className="field-value">AUG 2023</span>
            </div>
          </div>

          <div className="passport-field-grid-two">
            <div className="passport-field-row">
              <span className="field-label">LOCATION</span>
              <span className="field-value">{profile?.location || "TAMIL NADU, INDIA"}</span>
            </div>
            <div className="passport-field-row">
              <span className="field-label">VALIDITY</span>
              <span className="field-value">CONTINUOUS</span>
            </div>
          </div>

          {/* Signature Block */}
          <div className="passport-signature-block">
            <span className="field-label">HOLDER SIGNATURE / SIGNATURE DU TITULAIRE</span>
            <div className="passport-signature-text">Aakash A.</div>
          </div>
        </div>
      </div>

      {/* Machine Readable Zone (MRZ) */}
      <div className="passport-mrz-zone" aria-label="Machine Readable Document Zone">
        <div className="mrz-line">P&lt;INDAYYAPPAN&lt;&lt;AAKASH&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</div>
        <div className="mrz-line">CSBS2023&lt;&lt;AI99BACKEND01DATA02&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;2027</div>
      </div>
    </div>
  );
}
