import React from 'react';
import { PrismaClient } from '@prisma/client';
import Image from 'next/image';
import { HoverPreview } from '@/components/ui/hover-preview';
import { CredentialModal } from '@/components/ui/credential-modal';
import { PassportSection } from '@/components/passport/passport-section';

const prisma = new PrismaClient();

export default async function PortfolioPage() {
  const profile = await prisma.profile.findFirst();
  const projects = await prisma.project.findMany({
    where: { isPublished: true },
    orderBy: { displayOrder: 'asc' }
  });
  const certifications = await prisma.certification.findMany({
    where: { isPublished: true },
    orderBy: { displayOrder: 'asc' }
  });
  const experience = await prisma.experience.findMany({
    where: { isPublished: true },
    orderBy: { displayOrder: 'asc' }
  });
  const education = await prisma.education.findMany({
    where: { isPublished: true },
    orderBy: { displayOrder: 'asc' }
  });
  const leadership = await prisma.leadership.findMany({
    where: { isPublished: true },
    orderBy: { displayOrder: 'asc' }
  });
  const skillCategories = await prisma.skillCategory.findMany({
    include: {
      skills: {
        where: { isVisible: true },
        orderBy: { displayOrder: 'asc' }
      }
    },
    orderBy: { displayOrder: 'asc' }
  });
  const achievements = await prisma.achievement.findMany({
    where: { isPublished: true },
    orderBy: { displayOrder: 'asc' }
  });

  return (
    <>
      <div id="scrollProgress" aria-hidden="true" />

      {/* Command Palette */}
      <div className="palette-overlay" id="paletteOverlay" role="dialog" aria-modal="true" aria-label="Quick navigation">
        <div className="palette-box">
          <div className="palette-search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input type="text" id="paletteInput" placeholder="Search portfolio sections &amp; actions…" autoComplete="off" spellCheck={false} />
            <kbd>ESC</kbd>
          </div>
          <div className="palette-results" id="paletteResults">
            <p className="palette-group">Dossier Navigation</p>
            <button className="palette-item" data-action="scroll" data-target="home">
              <span>Go to Overview</span>
              <span className="palette-item-action">Jump &rarr;</span>
            </button>
            <button className="palette-item" data-action="scroll" data-target="passport">
              <span>Open Career Passport &amp; Visas</span>
              <span className="palette-item-action">Jump &rarr;</span>
            </button>
            <button className="palette-item" data-action="scroll" data-target="projects">
              <span>Go to Selected Work</span>
              <span className="palette-item-action">Jump &rarr;</span>
            </button>
            <button className="palette-item" data-action="scroll" data-target="skills">
              <span>Go to Technical Toolkit</span>
              <span className="palette-item-action">Jump &rarr;</span>
            </button>
            <button className="palette-item" data-action="scroll" data-target="credentials">
              <span>Go to Education &amp; Credentials</span>
              <span className="palette-item-action">Jump &rarr;</span>
            </button>
            <button className="palette-item" data-action="scroll" data-target="contact">
              <span>Go to Contact</span>
              <span className="palette-item-action">Jump &rarr;</span>
            </button>
            <p className="palette-group">Direct Actions</p>
            <button className="palette-item" data-action="copy" data-target="email">
              <span>Copy verified email address</span>
              <span className="palette-item-action">Copy 📋</span>
            </button>
            <button className="palette-item" data-action="open" data-target="/aakash-resume.pdf">
              <span>Download official resume</span>
              <span className="palette-item-action">PDF &darr;</span>
            </button>
            <button className="palette-item" data-action="open" data-target="https://github.com/Aakash0412">
              <span>Open GitHub profile</span>
              <span className="palette-item-action">GitHub &nearr;</span>
            </button>
            <button className="palette-item" data-action="open" data-target="https://www.linkedin.com/in/aakash-a-4bb3a32b3/">
              <span>Open LinkedIn profile</span>
              <span className="palette-item-action">LinkedIn &nearr;</span>
            </button>
          </div>
        </div>
      </div>

      {/* Editorial Header */}
      <header className="site-header" id="siteHeader">
        <div className="header-inner">
          <a href="#home" className="header-brand" aria-label="Aakash A. Overview">
            Aakash<span className="brand-dot">.</span>
          </a>
          <nav className="header-nav" id="headerNav" aria-label="Main navigation">
            <a href="#home" className="nav-link" data-section="home">Overview</a>
            <a href="#passport" className="nav-link" data-section="passport">Career Passport</a>
            <a href="#projects" className="nav-link" data-section="projects">Selected Work</a>
            <a href="#skills" className="nav-link" data-section="skills">Toolkit</a>
            <a href="#credentials" className="nav-link" data-section="credentials">Credentials</a>
            <a href="#contact" className="nav-link" data-section="contact">Contact</a>
          </nav>
          <div className="header-actions">
            <button className="header-cmd" id="cmdBtn" aria-label="Open command palette">&#8984;K</button>
            <button className="header-theme" id="themeToggle" aria-label="Toggle theme">Light</button>
            <a href="/aakash-resume.pdf" className="header-resume" download>Resume &#8595;</a>
            <button className="hamburger" id="hamburger" aria-label="Toggle mobile menu" aria-expanded="false">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
        <div className="mobile-nav" id="mobileNav" aria-hidden="true">
          <a href="#home" className="mobile-link">Overview</a>
          <a href="#passport" className="mobile-link">Career Passport</a>
          <a href="#projects" className="mobile-link">Selected Work</a>
          <a href="#skills" className="mobile-link">Toolkit</a>
          <a href="#credentials" className="mobile-link">Credentials</a>
          <a href="#contact" className="mobile-link">Contact</a>
          <a href="/aakash-resume.pdf" className="mobile-link" download>Resume &#8595;</a>
        </div>
      </header>

      {/* HERO SECTION — Restrained Editorial Introduction */}
      <section id="home" className="hero">
        <div className="bg-grid-pattern" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-content">
            <div className="reveal-fade" style={{ "--delay": "0ms" } as React.CSSProperties}>
              <span className="mono-badge">
                ✦ DOSSIER REF: AA-2023 // {profile?.headline || 'AI SYSTEMS & SOFTWARE ENGINEER'}
              </span>
            </div>

            <h1 className="hero-name stagger-reveal">
              <span style={{ animationDelay: "40ms" } as React.CSSProperties}>{profile?.name?.split(' ')[0] || "Aakash"}</span>
              <span style={{ animationDelay: "120ms" } as React.CSSProperties}>{profile?.name?.split(' ').slice(1).join(' ') || "A."}</span>
            </h1>

            <div className="hero-role reveal-fade" style={{ "--delay": "180ms" } as React.CSSProperties}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', margin: '4px 0 12px' }}>
                <span className="text-xs uppercase tracking-widest font-mono text-[var(--stamp-gold,#9E7D3B)] font-semibold">AI SYSTEMS</span>
                <span className="text-xs opacity-40">·</span>
                <span className="text-xs uppercase tracking-widest font-mono text-[var(--stamp-burgundy,#8B2635)] font-semibold">BACKEND ENGINEERING</span>
                <span className="text-xs opacity-40">·</span>
                <span className="text-xs uppercase tracking-widest font-mono text-[var(--stamp-navy,#1C355E)] font-semibold">DATA ANALYTICS</span>
              </div>
              <p className="role-prefix font-medium" style={{ fontSize: '1.25rem', color: 'var(--fg)' }}>
                Building intelligent systems and the infrastructure behind them.
              </p>
            </div>

            <p className="hero-sub reveal-fade" style={{ "--delay": "260ms" } as React.CSSProperties}>
              {profile?.bio || "B.Tech student in Computer Science & Business Systems at SASTRA Deemed University. Designing scalable backend architectures, multi-agent AI systems, and machine learning pipelines."}
            </p>

            <div className="hero-ctas reveal-fade" style={{ "--delay": "340ms", display: 'flex', gap: '14px', flexWrap: 'wrap' } as React.CSSProperties}>
              <a href="#passport" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                Explore My Journey &darr;
              </a>
              <a href="#projects" className="btn btn-ghost">
                View Selected Work &rarr;
              </a>
            </div>
          </div>

          <div className="hero-visual reveal-fade" style={{ "--delay": "200ms" } as React.CSSProperties}>
            <div className="passport-photo-frame hero-photo-frame">
              <div className="passport-photo-corners" aria-hidden="true">
                <span className="corner tl" />
                <span className="corner tr" />
                <span className="corner bl" />
                <span className="corner br" />
              </div>
              <Image
                src={profile?.profileImageUrl || "/aakash-hero.jpg"}
                alt={profile?.name ? `${profile.name} — Profile Photograph` : "Aakash A."}
                className="passport-photo-img"
                width={340}
                height={510}
                priority
              />
              <div className="passport-photo-watermark" aria-hidden="true">
                <span>VERIFIED CAREER DOSSIER</span>
              </div>
            </div>
          </div>
        </div>
        <span className="hero-scroll-hint" aria-hidden="true">Explore Journey &darr;</span>
      </section>

      {/* THE PASSPORT SECTION — Main Experience */}
      <PassportSection
        profile={profile}
        education={education}
        experience={experience}
        leadership={leadership}
        projects={projects}
        certifications={certifications}
      />

      {/* SELECTED WORK — Editorial Projects Section */}
      <section id="projects" className="editorial-section hairline-t">
        <div className="container">
          <div className="section-heading-row reveal-fade" style={{ marginBottom: '40px' }}>
            <div>
              <p className="eyebrow">Portfolio Index</p>
              <h2>Selected Work</h2>
            </div>
            <p className="section-sub">
              End-to-end architectures — machine learning research, multi-agent LLM systems, and high-concurrency backends.
            </p>
          </div>

          <div className="projects-editorial-list" id="projectsList">
            {projects.map((project, idx) => {
              const projectNumber = String(idx + 1).padStart(2, '0');
              const content = (
                <article key={project.id} className="editorial-project-row reveal-fade" style={{ "--delay": `${idx * 40}ms` } as React.CSSProperties}>
                  <div className="project-idx">{projectNumber}</div>
                  
                  <div className="project-details">
                    <span className="project-tag-kicker">
                      {idx === 0 ? "AI / RESEARCH DISPATCH" : idx === 1 ? "DEEP LEARNING / TIME-SERIES" : idx === 2 ? "MULTI-AGENT INTELLIGENCE" : "SEMANTIC NLP / API"}
                    </span>
                    <h3 className="project-editorial-title">{project.title}</h3>
                    <p className="project-editorial-desc">{project.description}</p>
                    
                    <div className="project-actions">
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="editorial-link">
                          View Live Deployment &nearr;
                        </a>
                      )}
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="editorial-link" style={{ opacity: 0.85 }}>
                          Source Repository &nearr;
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="project-visual-preview">
                    {project.thumbnailUrl ? (
                      <Image
                        src={project.thumbnailUrl}
                        alt={`Preview for ${project.title}`}
                        width={340}
                        height={220}
                        className="rounded-lg border border-[var(--border)] object-cover shadow-md"
                      />
                    ) : (
                      <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 text-xs text-[var(--muted)] font-mono flex flex-col justify-between h-[180px]">
                        <div className="flex justify-between items-center opacity-60">
                          <span>SYSTEM ARTIFACT</span>
                          <span>#{projectNumber}</span>
                        </div>
                        <div className="text-sm font-semibold text-[var(--fg)]">{project.title}</div>
                        <div className="text-[11px] opacity-75">Production Deployed &middot; Verified Codebase</div>
                      </div>
                    )}
                  </div>
                </article>
              );

              return project.thumbnailUrl ? (
                <HoverPreview key={project.id} imageUrl={project.thumbnailUrl} altText={project.title}>
                  {content}
                </HoverPreview>
              ) : (
                <React.Fragment key={project.id}>{content}</React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* TECHNICAL TOOLKIT & ARCHITECTURAL APPROACH */}
      <section id="skills" className="section hairline-t">
        <div className="container">
          <div className="section-heading reveal-fade">
            <p className="eyebrow">Technical Competencies</p>
            <h2>Architectural Toolkit</h2>
          </div>

          <div className="bento-grid reveal-fade" style={{ "--delay": "60ms", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" } as React.CSSProperties}>
            {skillCategories.map((category) => (
              <div key={category.id} className="bento-card">
                <div className="bento-card-content">
                  <p className="skill-title" style={{ fontFamily: "var(--font-mono, monospace)", fontSize: "12px", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                    {category.name}
                  </p>
                  <div className="skill-pills">
                    {category.skills.map((skill) => (
                      <span key={skill.id}>{skill.name}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Architectural Methodology */}
          <div className="mt-16 pt-12 border-t border-[var(--border)]">
            <div className="section-heading reveal-fade" style={{ marginBottom: "28px" }}>
              <p className="eyebrow">Engineering Methodology</p>
              <h3>How I Engineer Systems</h3>
            </div>
            <div className="timeline reveal-fade" style={{ "--delay": "60ms" } as React.CSSProperties}>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <p className="service-num" style={{ marginBottom: "4px" }}>01. Concurrency &amp; Schema</p>
                <h4 className="service-title" style={{ fontSize: "1.35rem", marginBottom: "8px" }}>PostgreSQL &amp; Distributed Data</h4>
                <p className="service-body" style={{ maxWidth: "520px" }}>
                  Designing relational schemas, indexing strategies, and transactional locking patterns (e.g. FOR UPDATE SKIP LOCKED) for reliable distributed workflows.
                </p>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <p className="service-num" style={{ marginBottom: "4px" }}>02. Asynchronous Backends</p>
                <h4 className="service-title" style={{ fontSize: "1.35rem", marginBottom: "8px" }}>FastAPI &amp; RESTful Services</h4>
                <p className="service-body" style={{ maxWidth: "520px" }}>
                  Engineering high-throughput asynchronous APIs with strict request validation, token authentication, and modular domain architectures.
                </p>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <p className="service-num" style={{ marginBottom: "4px" }}>03. Intelligence Layer</p>
                <h4 className="service-title" style={{ fontSize: "1.35rem", marginBottom: "8px" }}>LLM Multi-Agent Orchestration</h4>
                <p className="service-body" style={{ maxWidth: "520px" }}>
                  Composing multi-agent workflows with LangChain and Google Gemini API, alongside predictive machine learning models trained on historical data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CREDENTIALS, EDUCATION & CERTIFICATIONS */}
      <section id="credentials" className="section hairline-t">
        <div className="container">
          <div className="section-heading reveal-fade">
            <p className="eyebrow">Accreditations &amp; Academic Record</p>
            <h2>Education &amp; Certifications</h2>
          </div>

          <div className="credential-grid reveal-fade" style={{ "--delay": "60ms" } as React.CSSProperties}>
            {education.map((edu) => (
              <CredentialModal
                key={edu.id}
                tag={`${edu.startDate} — ${edu.endDate} ${edu.grade ? `· CGPA ${edu.grade}` : ''}`}
                title={`${edu.degree} ${edu.field ? `— ${edu.field}` : ''}`}
                org={edu.institution}
                description={edu.description || "B.Tech Computer Science and Business Systems program focused on algorithmic theory, data systems, software architecture, and corporate strategy."}
              >
                <div className="credential-card cursor-pointer hover:bg-white/5 transition-colors">
                  <p className="credential-tag">{edu.startDate} — {edu.endDate} {edu.grade ? `· CGPA ${edu.grade}` : ''}</p>
                  <h3 className="credential-title">{edu.degree} {edu.field ? `— ${edu.field}` : ''}</h3>
                  <p className="credential-org">{edu.institution}</p>
                </div>
              </CredentialModal>
            ))}

            {leadership.map((item) => (
              <CredentialModal
                key={item.id}
                tag="Executive Leadership"
                title={item.role}
                org={item.organization}
                description={item.description}
              >
                <div className="credential-card cursor-pointer hover:bg-white/5 transition-colors">
                  <p className="credential-tag">Executive Leadership</p>
                  <h3 className="credential-title">{item.role}</h3>
                  <p className="credential-org">{item.organization}</p>
                </div>
              </CredentialModal>
            ))}

            {certifications.map((cert) => {
              const content = (
                <div className="credential-card cursor-pointer hover:bg-white/5 transition-colors">
                  <p className="credential-tag">Technical Accreditation</p>
                  <h3 className="credential-title">{cert.title}</h3>
                  <p className="credential-org">{cert.issuer}</p>
                  {cert.certificateImageUrl && (
                    <span className="text-sm mt-2 inline-block text-[var(--stamp-burgundy,#8B2635)] font-mono">
                      View Certificate &rarr;
                    </span>
                  )}
                </div>
              );

              if (cert.certificateImageUrl) {
                return (
                  <HoverPreview key={cert.id} imageUrl={cert.thumbnailUrl} altText={cert.title}>
                    <a
                      href={cert.certificateImageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'block', textDecoration: 'none' }}
                    >
                      {content}
                    </a>
                  </HoverPreview>
                );
              }

              return <React.Fragment key={cert.id}>{content}</React.Fragment>;
            })}

            {achievements && achievements.map((ach) => (
              <CredentialModal
                key={ach.id}
                tag={ach.date || 'Achievement'}
                title={ach.title}
                org=""
                description={ach.description}
              >
                <div className="credential-card cursor-pointer hover:bg-white/5 transition-colors">
                  <p className="credential-tag">{ach.date || 'Achievement'}</p>
                  <h3 className="credential-title">{ach.title}</h3>
                  <p className="credential-org text-ellipsis overflow-hidden whitespace-nowrap">{ach.description}</p>
                  {ach.url && (
                    <a href={ach.url} target="_blank" rel="noopener noreferrer" className="text-sm mt-2 inline-block text-blue-400 relative z-10 pointer-events-auto">
                      View Details &rarr;
                    </a>
                  )}
                </div>
              </CredentialModal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION — Formal & Refined */}
      <section id="contact" className="section hairline-t">
        <div className="container">
          <div className="section-heading reveal-fade">
            <p className="eyebrow">Inquiries &amp; Engagement</p>
            <h2>Get in Touch</h2>
          </div>
          <div className="contact-grid reveal-fade" style={{ "--delay": "60ms" } as React.CSSProperties}>
            <div className="contact-info">
              <p className="body-copy">
                Open to discussions regarding full-stack software development, AI systems engineering, technical internships, and collaborative research initiatives.
              </p>
              
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#28C840", border: "1px solid var(--border)", borderRadius: "999px", padding: "6px 14px", marginTop: "8px", width: "fit-content" }}>
                <span style={{ display: "block", width: "6px", height: "6px", borderRadius: "50%", background: "#28C840", boxShadow: "0 0 8px #28C840" }}></span> 
                Available for Engagements
              </div>

              <div className="contact-details" style={{ marginTop: '24px' }}>
                <div className="contact-detail-item">
                  <span className="contact-detail-label">Email</span>
                  <span className="contact-detail-value">
                    <span id="contactEmailDisplay">Click copy to reveal</span>
                    <button className="copy-email-btn" id="copyEmailBtn" aria-label="Copy email address">Copy</button>
                  </span>
                </div>
                <div className="contact-detail-item">
                  <span className="contact-detail-label">Location</span>
                  <span className="contact-detail-value">{profile?.location || "Tamil Nadu, India"}</span>
                </div>
                <div className="contact-detail-item">
                  <span className="contact-detail-label">Affiliation</span>
                  <span className="contact-detail-value">SASTRA Deemed University</span>
                </div>
              </div>

              <div className="contact-socials" style={{ marginTop: '24px' }}>
                <a href="https://github.com/Aakash0412" target="_blank" rel="noopener noreferrer" className="social-link">GitHub &nearr;</a>
                <a href="https://www.linkedin.com/in/aakash-a-4bb3a32b3/" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn &nearr;</a>
                <a href="/aakash-resume.pdf" className="social-link" download>Resume &darr;</a>
              </div>
            </div>

            <form className="contact-form" id="contactForm" action="https://formspree.io/f/xreyrakb" method="POST">
              <div className="form-group">
                <label htmlFor="contactName" className="form-label">Full Name</label>
                <input type="text" id="contactName" name="name" className="form-input" placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label htmlFor="contactEmail" className="form-label">Email Address</label>
                <input type="email" id="contactEmail" name="email" className="form-input" placeholder="your@email.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="contactSubject" className="form-label">Subject</label>
                <input type="text" id="contactSubject" name="subject" className="form-input" placeholder="Project / Role inquiry" />
              </div>
              <div className="form-group">
                <label htmlFor="contactMessage" className="form-label">Message</label>
                <textarea id="contactMessage" name="message" className="form-textarea" rows={5} placeholder="Your message…" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary form-submit" id="formSubmit">
                Send Message &rarr;
              </button>
              <p className="form-status" id="formStatus" aria-live="polite"></p>
            </form>
          </div>
        </div>
      </section>

      {/* EDITORIAL FOOTER */}
      <footer className="site-footer hairline-t">
        <div className="footer-marquee hairline-b">
          <div className="marquee-track">
            <span className="marquee-strip">
              {profile?.shortBio || "AI Systems & Software Engineer"} &middot; CAREER DOSSIER &middot;
            </span>
            <span className="marquee-strip" aria-hidden="true">
              {profile?.shortBio || "AI Systems & Software Engineer"} &middot; CAREER DOSSIER &middot;
            </span>
          </div>
        </div>
        <div className="footer-body container">
          <div>
            <p className="footer-name">{profile?.name || 'Aakash A.'}</p>
            <p className="footer-tagline">{profile?.headline || 'AI Systems · Backend Engineering · Data Analytics'}</p>
          </div>
          <div className="footer-links">
            <a href="https://www.linkedin.com/in/aakash-a-4bb3a32b3/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/Aakash0412" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={`mailto:${profile?.email || 'aakasha0412@gmail.com'}`} id="footerEmailLink">Email</a>
            <a href="/aakash-resume.pdf" download>Resume</a>
          </div>
          <p className="footer-copy">&copy; {new Date().getFullYear()} {profile?.name || 'Aakash A.'} &middot; All Rights Reserved</p>
        </div>
      </footer>
    </>
  );
}
