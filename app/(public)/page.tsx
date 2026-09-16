import { PrismaClient } from '@prisma/client';
import Image from 'next/image';

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

    <div id="scrollProgress" aria-hidden="true"></div>

    {/*  Command Palette  */}
    <div className="palette-overlay" id="paletteOverlay" role="dialog" aria-modal="true" aria-label="Quick navigation">
        <div className="palette-box">
            <div className="palette-search">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                <input type="text" id="paletteInput" placeholder="Search actions…" autoComplete="off" spellCheck={false} />
                <kbd>ESC</kbd>
            </div>
            <div className="palette-results" id="paletteResults">
                <p className="palette-group">Navigation</p>
                <button className="palette-item" data-action="scroll" data-target="home">Go to Home</button>
                <button className="palette-item" data-action="scroll" data-target="about">Go to About</button>
                <button className="palette-item" data-action="scroll" data-target="skills">Go to Skills</button>
                <button className="palette-item" data-action="scroll" data-target="services">Go to What I Build</button>
                <button className="palette-item" data-action="scroll" data-target="projects">Go to Projects</button>
                <button className="palette-item" data-action="scroll" data-target="experience">Go to Experience</button>
                <button className="palette-item" data-action="scroll" data-target="education">Go to Education</button>
                <button className="palette-item" data-action="scroll" data-target="contact">Go to Contact</button>
                <p className="palette-group">Actions</p>
                <button className="palette-item" data-action="copy" data-target="email">Copy email address</button>
                <button className="palette-item" data-action="open" data-target="aakash-resume.pdf">Download resume</button>
                <button className="palette-item" data-action="open" data-target="https://github.com/Aakash0412">Open GitHub</button>
                <button className="palette-item" data-action="open" data-target="https://www.linkedin.com/in/aakash-a-4bb3a32b3/">Open LinkedIn</button>
            </div>
        </div>
    </div>

    {/*  Header  */}
    <header className="site-header" id="siteHeader">
        <div className="header-inner">
            <a href="#home" className="header-brand" aria-label="Home">Aakash<span className="brand-dot">.</span></a>
            <nav className="header-nav" id="headerNav" aria-label="Main navigation">
                <a href="#about" className="nav-link" data-section="about">About</a>
                <a href="#skills" className="nav-link" data-section="skills">Skills</a>
                <a href="#projects" className="nav-link" data-section="projects">Projects</a>
                <a href="#experience" className="nav-link" data-section="experience">Experience</a>
                <a href="#contact" className="nav-link" data-section="contact">Contact</a>
            </nav>
            <div className="header-actions">
                <button className="header-cmd" id="cmdBtn" aria-label="Open command palette">&#8984;K</button>
                <button className="header-theme" id="themeToggle" aria-label="Toggle light mode">Light</button>
                <a href="aakash-resume.pdf" className="header-resume" download>Resume</a>
                <button className="hamburger" id="hamburger" aria-label="Toggle mobile menu" aria-expanded="false"><span></span><span></span><span></span></button>
            </div>
        </div>
        <div className="mobile-nav" id="mobileNav" aria-hidden="true">
            <a href="#about" className="mobile-link">About</a>
            <a href="#skills" className="mobile-link">Skills</a>
            <a href="#projects" className="mobile-link">Projects</a>
            <a href="#experience" className="mobile-link">Experience</a>
            <a href="#contact" className="mobile-link">Contact</a>
            <a href="aakash-resume.pdf" className="mobile-link" download>Resume &#8595;</a>
        </div>
    </header>

    {/*  HERO  */}
    <section id="home" className="hero">
        <div className="bg-grid-pattern"></div>
        <div className="hero-inner">
            <div className="hero-content">
                <div className="reveal-fade" style={{"--delay": "0ms"} as React.CSSProperties}>
                    <span className="mono-badge">&#10022; {profile?.headline || 'AI Systems & Software Engineer'}</span>
                </div>
                <h1 className="hero-name stagger-reveal">
                    <span style={{"animationDelay": "50ms"} as React.CSSProperties}>{profile?.name?.split(' ')[0]}</span>
                    <span style={{"animationDelay": "150ms"} as React.CSSProperties}>{profile?.name?.split(' ').slice(1).join(' ')}</span>
                </h1>
                <div className="hero-role reveal-fade" style={{"--delay": "250ms"} as React.CSSProperties}>
                    <span className="role-prefix">{profile?.shortBio}</span>
                </div>
                <p className="hero-sub reveal-fade" style={{"--delay": "350ms"} as React.CSSProperties}>{profile?.bio}</p>
                <div className="hero-ctas reveal-fade" style={{"--delay": "450ms"} as React.CSSProperties}>
                    <a href="#projects" className="btn btn-primary">View Projects</a>
                    <a href={profile?.resumeUrl ? `/${profile?.resumeUrl}` : "#contact"} className={profile?.resumeUrl ? "btn btn-ghost" : "btn btn-primary"}>{profile?.resumeUrl ? "Resume" : "Let's Connect"}</a>
                </div>
            </div>
            
            <div className="hero-visual reveal-fade" style={{"--delay": "300ms"} as React.CSSProperties}>
                <Image src={profile?.profileImageUrl || "/aakash-hero.jpg"} alt={profile?.name ? `${profile.name} - Profile Photo` : "Aakash A."} className="hero-photo" width={400} height={533} priority />
            </div>
        </div>
        <span className="hero-scroll-hint" aria-hidden="true">Scroll &#8595;</span>
    </section>

    {/*  ABOUT  */}
    <section id="about" className="section hairline-t">
        <div className="container">
            <div className="section-heading reveal-fade">
                <p className="eyebrow">About</p>
                <h2>Building complete systems,<br />model to deployment.</h2>
            </div>
            <div className="about-layout reveal-fade" style={{ "--delay": "60ms" } as React.CSSProperties}>
                <div className="about-left">
                    <p className="body-copy">I&apos;m a B.Tech student in Computer Science and Business Systems (CSBS) at SASTRA Deemed University. I work on systems end-to-end — AI pipelines, backend services, data-driven applications, and full-stack interfaces. I care about how data, models, and infrastructure connect to produce working, deployable software.</p>
                    <div className="terminal-card">
                        <div className="terminal-hdr">
                            <span className="tdot tdot-r"></span><span className="tdot tdot-y"></span><span className="tdot tdot-g"></span>
                            <span className="terminal-ttl">whoami.sh</span>
                        </div>
                        <div className="terminal-body">
                            <div className="tl"><span className="tp">$</span><span className="tc">whoami</span></div>
                            <div className="tl to">aakash — cs + business systems @ sastra</div>
                            <div className="tl"><span className="tp">$</span><span className="tc">cat focus.txt</span></div>
                            <div className="tl to">AI &amp; LLMs · Backend Engineering · Data Analytics</div>
                            <div className="tl"><span className="tp">$</span><span className="tc">echo $STATUS</span></div>
                            <div className="tl to tg">open to internships &amp; collaborations &#10003;</div>
                            <div className="tl"><span className="tp tblink">&#9650;</span></div>
                        </div>
                    </div>
                </div>
                <div className="facts-grid">
                    <div className="fact-cell"><p className="fact-label">B.Tech CSBS</p><p className="fact-detail">SASTRA Deemed University · Expected 2027</p></div>
                    <div className="fact-cell"><p className="fact-label">AI + Backend</p><p className="fact-detail">Primary technical focus</p></div>
                    <div className="fact-cell"><p className="fact-label">E-Cell</p><p className="fact-detail">Vice-Chairperson, SASTRA</p></div>
                    <div className="fact-cell"><p className="fact-label">Full-Stack</p><p className="fact-detail">React · Next.js · FastAPI</p></div>
                </div>
            </div>
        </div>
    </section>

    {/*  SKILLS  */}
    <section id="skills" className="section hairline-t">
        <div className="container">
            <div className="section-heading reveal-fade">
                <p className="eyebrow">Skills</p>
                <h2>Technical toolkit</h2>
            </div>
            <div className="bento-grid reveal-fade" style={{"--delay": "60ms", "gridTemplateColumns": "repeat(auto-fit, minmax(280px, 1fr))"} as React.CSSProperties}>
                {skillCategories.map(category => (
                  <div key={category.id} className="bento-card">
                    <div className="bento-card-content">
                      <p className="skill-title">{category.name}</p>
                      <div className="skill-pills">
                        {category.skills.map(skill => (
                          <span key={skill.id}>{skill.name}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
        </div>
    </section>

    {/*  ENGINEERING APPROACH  */}
    <section id="services" className="section hairline-t">
        <div className="container">
            <div className="section-heading reveal-fade">
                <p className="eyebrow">Engineering Approach</p>
                <h2>How I build systems</h2>
            </div>
            <div className="timeline reveal-fade" style={{ "--delay": "60ms" } as React.CSSProperties}>
                <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <p className="service-num" style={{marginBottom: "4px"}}>01. Architecture &amp; Data</p>
                    <h3 className="service-title" style={{fontSize: "1.5rem", marginBottom: "12px"}}>Database &amp; Schema Design</h3>
                    <p className="service-body" style={{maxWidth: "500px"}}>Designing PostgreSQL schemas and optimizing distributed data patterns. Leveraging concurrency control (FOR UPDATE SKIP LOCKED) to build highly scalable backends.</p>
                </div>
                <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <p className="service-num" style={{marginBottom: "4px"}}>02. Backend Infrastructure</p>
                    <h3 className="service-title" style={{fontSize: "1.5rem", marginBottom: "12px"}}>API Development</h3>
                    <p className="service-body" style={{maxWidth: "500px"}}>Developing robust, asynchronous APIs using FastAPI and Flask. Ensuring secure endpoints, token authentication, and clean modular architecture.</p>
                </div>
                <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <p className="service-num" style={{marginBottom: "4px"}}>03. Intelligence Layer</p>
                    <h3 className="service-title" style={{fontSize: "1.5rem", marginBottom: "12px"}}>AI &amp; ML Integration</h3>
                    <p className="service-body" style={{maxWidth: "500px"}}>Integrating LLMs via LangChain, orchestrating multi-agent systems, and building custom predictive models using Scikit-Learn and Deep Neural Networks.</p>
                </div>
                <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <p className="service-num" style={{marginBottom: "4px"}}>04. Interface Design</p>
                    <h3 className="service-title" style={{fontSize: "1.5rem", marginBottom: "12px"}}>Frontend Engineering</h3>
                    <p className="service-body" style={{maxWidth: "500px"}}>Crafting highly responsive and accessible UI components with React, Next.js, and Tailwind CSS. Implementing modern animations for premium user experiences.</p>
                </div>
                <div className="timeline-item">
                    <div className="timeline-dot"></div>
                    <p className="service-num" style={{marginBottom: "4px"}}>05. Production</p>
                    <h3 className="service-title" style={{fontSize: "1.5rem", marginBottom: "12px"}}>Deployment &amp; Operations</h3>
                    <p className="service-body" style={{maxWidth: "500px"}}>Deploying full-stack applications on Vercel and backend services on Render. Configuring CI/CD and ensuring reliable cloud orchestration.</p>
                </div>
            </div>
        </div>
    </section>

    {/*  PROJECTS  */}
    <section id="projects" className="section hairline-t">
        <div className="container">
            <div className="section-heading-row reveal-fade">
                <div><p className="eyebrow">Projects</p><h2>Selected work</h2></div>
                <p className="section-sub">End-to-end systems — AI pipelines, backend infrastructure and full-stack apps.</p>
            </div>
            <div className="project-filters reveal-fade" style={{ "--delay": "60ms" } as React.CSSProperties} role="tablist">
                <button className="filter-btn is-active" data-filter="all" role="tab" aria-selected="true">All</button>
                <button className="filter-btn" data-filter="ai" role="tab" aria-selected="false">AI / ML</button>
                <button className="filter-btn" data-filter="backend" role="tab" aria-selected="false">Backend</button>
                <button className="filter-btn" data-filter="fullstack" role="tab" aria-selected="false">Full-Stack</button>
            </div>
            <div className="projects-list" id="projectsList">
                {projects.slice(0, 2).map((project, idx) => (
                    <article key={project.id} className="project-row reveal-fade" data-category="ai" style={{ "--delay": `${80 + idx * 20}ms` } as React.CSSProperties}>
                        <div className="project-left">
                            <div className="project-meta"><span className="project-num">{String(idx + 1).padStart(2, '0')}</span><span className="project-kicker">Featured</span></div>
                            <h3 className="project-title">{project.title}</h3>
                            <p className="project-body">{project.description}</p>
                            <div className="project-links">
                                {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="link-primary">Live demo &#8599;</a>}
                                {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub &#8599;</a>}
                            </div>
                        </div>
                        <div className="project-right">
                            {project.thumbnailUrl ? (
                                <Image src={project.thumbnailUrl} alt={`Thumbnail for ${project.title}`} className="project-img" width={600} height={400} />
                            ) : (
                                <div className="project-right-empty"></div>
                            )}
                        </div>
                    </article>
                ))}
                
                <div className="projects-bento-grid">
                    {projects.slice(2).map((project, idx) => (
                        <article key={project.id} className="project-bento reveal-fade" data-category="ai" style={{ "--delay": `${120 + idx * 20}ms` } as React.CSSProperties}>
                            <div className="project-meta"><span className="project-num">{String(idx + 3).padStart(2, '0')}</span><span className="project-kicker">Featured</span></div>
                            <h3 className="project-title" style={{"fontSize": "1.4rem"} as React.CSSProperties}>{project.title}</h3>
                            <p className="project-body">{project.description}</p>
                            <div className="project-links" style={{"marginTop": "auto", "paddingTop": "12px"} as React.CSSProperties}>
                                {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="link-primary">Live demo &#8599;</a>}
                                {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub &#8599;</a>}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    </section>

    {/*  EXPERIENCE  */}
    <section id="experience" className="section hairline-t">
        <div className="container">
            <div className="section-heading reveal-fade"><p className="eyebrow">Experience</p><h2>Leadership &amp; involvement</h2></div>
            <div className="credential-grid reveal-fade" style={{ "--delay": "60ms" } as React.CSSProperties}>
                {experience.map(exp => (
                  <div key={exp.id} className="credential-card">
                      <p className="credential-tag">{exp.startDate} - {exp.endDate || (exp.isCurrent ? 'Present' : '')}</p>
                      <h3 className="credential-title">{exp.role}</h3>
                      <p className="credential-org">{exp.organization}</p>
                  </div>
                ))}
                {leadership.map(item => (
                  <div key={item.id} className="credential-card">
                      <p className="credential-tag">Leadership</p>
                      <h3 className="credential-title">{item.role}</h3>
                      <p className="credential-org">{item.organization}</p>
                  </div>
                ))}
            </div>
        </div>
    </section>

    {/*  EDUCATION  */}
    <section id="education" className="section hairline-t">
        <div className="container">
            <div className="section-heading reveal-fade"><p className="eyebrow">Education</p><h2>Education &amp; certifications</h2></div>
            <div className="credential-grid reveal-fade" style={{ "--delay": "60ms" } as React.CSSProperties}>
                {education.map(edu => (
                  <div key={edu.id} className="credential-card">
                      <p className="credential-tag">{edu.startDate} - {edu.endDate} {edu.grade ? `· ${edu.grade}` : ''}</p>
                      <h3 className="credential-title">{edu.degree} {edu.field ? `— ${edu.field}` : ''}</h3>
                      <p className="credential-org">{edu.institution}</p>
                  </div>
                ))}
                
                {certifications.map((cert) => {
                  if (cert.certificateImageUrl) {
                    return (
                      <a 
                        key={cert.id} 
                        href={cert.certificateImageUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="credential-card"
                        style={{ display: 'block', textDecoration: 'none', cursor: 'pointer' }}
                      >
                        <p className="credential-tag">Certification</p>
                        <h3 className="credential-title">{cert.title}</h3>
                        <p className="credential-org">{cert.issuer}</p>
                        <span className="text-sm mt-2 inline-block text-blue-400">
                          View Certificate &rarr;
                        </span>
                      </a>
                    );
                  }
                  
                  return (
                    <div key={cert.id} className="credential-card">
                        <p className="credential-tag">Certification</p>
                        <h3 className="credential-title">{cert.title}</h3>
                        <p className="credential-org">{cert.issuer}</p>
                    </div>
                  );
                })}
            </div>
        </div>
    </section>

    {/*  CONTACT  */}
    <section id="contact" className="section hairline-t">
        <div className="container">
            <div className="section-heading reveal-fade"><p className="eyebrow">Contact</p><h2>Get in touch</h2></div>
            <div className="contact-grid reveal-fade" style={{ "--delay": "60ms" } as React.CSSProperties}>
                <div className="contact-info">
                    <p className="body-copy">I am currently open to internships, graduate roles, and freelance opportunities. I&apos;m always happy to talk about anything at the intersection of AI, backend engineering, and systems design.</p>
                    <div style={{display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.15em", color: "#28C840", border: "1px solid var(--border)", borderRadius: "999px", padding: "6px 14px", marginTop: "4px", width: "fit-content"}}>
                        <span style={{display: "block", width: "6px", height: "6px", borderRadius: "50%", background: "#28C840", boxShadow: "0 0 8px #28C840"}}></span> Available for work
                    </div>
                    <div className="contact-details">
                        <div className="contact-detail-item">
                            <span className="contact-detail-label">Email</span>
                            <span className="contact-detail-value"><span id="contactEmailDisplay">Click copy to reveal</span> <button className="copy-email-btn" id="copyEmailBtn">Copy</button></span>
                        </div>
                        <div className="contact-detail-item">
                            <span className="contact-detail-label">Location</span>
                            <span className="contact-detail-value">Tamil Nadu, India</span>
                        </div>
                    </div>
                    <div className="contact-socials">
                        <a href="https://github.com/Aakash0412" target="_blank" rel="noopener noreferrer" className="social-link">GitHub &#8599;</a>
                        <a href="https://www.linkedin.com/in/aakash-a-4bb3a32b3/" target="_blank" rel="noopener noreferrer" className="social-link">LinkedIn &#8599;</a>
                        <a href="aakash-resume.pdf" className="social-link" download>Resume &#8595;</a>
                    </div>
                </div>
                <form className="contact-form" id="contactForm" action="https://formspree.io/f/xreyrakb" method="POST">
                    <div className="form-group"><label htmlFor="contactName" className="form-label">Name</label><input type="text" id="contactName" name="name" className="form-input" placeholder="Your name" required /></div>
                    <div className="form-group"><label htmlFor="contactEmail" className="form-label">Email</label><input type="email" id="contactEmail" name="email" className="form-input" placeholder="your@email.com" required /></div>
                    <div className="form-group"><label htmlFor="contactSubject" className="form-label">Subject</label><input type="text" id="contactSubject" name="subject" className="form-input" placeholder="What's this about?" /></div>
                    <div className="form-group"><label htmlFor="contactMessage" className="form-label">Message</label><textarea id="contactMessage" name="message" className="form-textarea" rows={5} placeholder="Your message…" required></textarea></div>
                    <button type="submit" className="btn btn-primary form-submit" id="formSubmit">Send message</button>
                    <p className="form-status" id="formStatus" aria-live="polite"></p>
                </form>
            </div>
        </div>
    </section>

    {/*  FOOTER  */}
    <footer className="site-footer hairline-t">
        <div className="footer-marquee hairline-b">
            <div className="marquee-track">
                <span className="marquee-strip">
                    {profile?.shortBio} · {profile?.shortBio} ·
                </span>
                <span className="marquee-strip" aria-hidden="true">
                    {profile?.shortBio} · {profile?.shortBio} ·
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
                <a href={`mailto:${profile?.email}`} id="footerEmailLink">Email</a>
                {profile?.resumeUrl && <a href={`/${profile?.resumeUrl}`} download>Resume</a>}
            </div>
            <p className="footer-copy">&copy; {new Date().getFullYear()} {profile?.name || 'Aakash A.'}</p>
        </div>
    </footer>


    </>
  );
}
