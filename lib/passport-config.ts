import { Education, Experience, Leadership, Project, Certification, Profile } from "@prisma/client";

export interface JourneyMilestone {
  id: string;
  category: "education" | "leadership" | "research" | "project" | "certification" | "future";
  stampType: "circular" | "rectangular" | "crested" | "oval" | "placeholder";
  inkColor: "burgundy" | "navy" | "charcoal" | "gold" | "faded";
  title: string;
  organization: string;
  location?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  dateLabel: string;
  isCurrent: boolean;
  stampLabel: string;
  subtitle?: string | null;
  description?: string | null;
  skills?: string[];
  externalUrl?: string | null;
}

export const PASSPORT_METADATA = {
  documentType: "P",
  typeLabel: "CAREER PASSPORT / OFFICIAL RECORD",
  documentCode: "AA-CSBS-2023",
  issuingState: "IND",
  issuingAuthority: "SASTRA DEEMED UNIVERSITY · CSBS",
  holderSurname: "AYYAPPAN",
  holderGivenName: "AAKASH",
  fieldOfPractice: "AI SYSTEMS & BACKEND ENGINEERING",
  nationality: "INDIAN",
  dateOfIssue: "AUG 2023",
  validity: "PERPETUAL / CONTINUOUS",
};

export const FUTURE_STAMPS: Array<{
  id: string;
  title: string;
  organization: string;
  dateLabel: string;
  stampLabel: string;
  note: string;
}> = [
  {
    id: "future-1",
    title: "AI INFRASTRUCTURE",
    organization: "PRODUCTION DEPLOYMENT",
    dateLabel: "NEXT HORIZON",
    stampLabel: "AWAITING ENTRY",
    note: "Advanced Distributed AI & Large Language Systems",
  },
  {
    id: "future-2",
    title: "DISTRIBUTED SYSTEMS",
    organization: "HIGH-SCALE BACKEND",
    dateLabel: "JOURNEY CONTINUES",
    stampLabel: "THE JOURNEY CONTINUES",
    note: "Scalable Concurrency & Cloud Data Architectures",
  },
];

/**
 * Normalizes date presentation into uniform consular "IN: ... / OUT: ..." or "YEAR" format
 * without mutating underlying stored records.
 */
export function formatMilestoneDate(start?: string | null, end?: string | null, isCurrent?: boolean): string {
  const cleanStart = (start || "").trim();
  const cleanEnd = (end || "").trim();

  const normalizeDatePart = (str: string) => {
    if (!str) return "";
    // e.g. "08/2023" -> "AUG 2023", "2023" -> "2023", "05/27" -> "MAY 2027"
    if (/^\d{2}\/\d{4}$/.test(str)) {
      const [m, y] = str.split("/");
      const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      const monthIdx = parseInt(m, 10) - 1;
      return `${months[monthIdx] || m} ${y}`;
    }
    if (/^\d{2}\/\d{2}$/.test(str)) {
      const [m, y] = str.split("/");
      const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
      const monthIdx = parseInt(m, 10) - 1;
      const fullYear = `20${y}`;
      return `${months[monthIdx] || m} ${fullYear}`;
    }
    return str.toUpperCase();
  };

  const formattedStart = normalizeDatePart(cleanStart);
  const formattedEnd = isCurrent ? "PRESENT" : normalizeDatePart(cleanEnd);

  if (formattedStart && formattedEnd) {
    return `${formattedStart} — ${formattedEnd}`;
  }
  if (formattedStart) {
    return formattedStart;
  }
  if (formattedEnd) {
    return formattedEnd;
  }
  return "VERIFIED RECORD";
}

/**
 * Resolves the verified single source of truth for employment / professional status.
 * Both Biometric Page and the Highlighted Current Stamp use this function.
 */
export function resolveCurrentStatus(
  profile: Profile | null,
  education: Education[],
  leadership: Leadership[],
  experience: Experience[]
): {
  statusCode: "STUDENT_RESEARCHER" | "EMPLOYED" | "LEADERSHIP" | "INDEPENDENT";
  statusTitle: string;
  organization: string;
  badgeLabel: string;
  isAvailable: boolean;
  subtext: string;
} {
  // 1. Check if user set an explicit availability / status in Profile CMS
  if (profile?.availability && profile.availability.trim().length > 0) {
    return {
      statusCode: "INDEPENDENT",
      statusTitle: profile.availability.toUpperCase(),
      organization: "INDEPENDENT PRACTICE",
      badgeLabel: "STATUS VERIFIED",
      isAvailable: true,
      subtext: profile.headline || "AI Systems & Backend Engineering",
    };
  }

  // 2. Check if there is an active current experience
  const currentExp = experience.find((e) => e.isCurrent || (e.startDate && !e.endDate));
  if (currentExp) {
    return {
      statusCode: "EMPLOYED",
      statusTitle: currentExp.role.toUpperCase(),
      organization: currentExp.organization.toUpperCase(),
      badgeLabel: "ACTIVE ENGAGEMENT",
      isAvailable: false,
      subtext: currentExp.location || "VERIFIED EMPLOYMENT",
    };
  }

  // 3. Check verified current leadership
  const currentLeadership = leadership.find((l) => l.role.toLowerCase().includes("vice-chairperson") || (l.startDate && l.endDate && l.endDate.includes("2027")));
  const primaryEducation = education[0];

  if (currentLeadership) {
    return {
      statusCode: "LEADERSHIP",
      statusTitle: "VICE-CHAIRPERSON",
      organization: "ENTREPRENEURSHIP CELL · SASTRA",
      badgeLabel: "ONGOING APPOINTMENT",
      isAvailable: true,
      subtext: "B.Tech CSBS Candidate (2023–2027) · Open to Opportunities",
    };
  }

  if (primaryEducation) {
    return {
      statusCode: "STUDENT_RESEARCHER",
      statusTitle: "B.TECH CSBS CANDIDATE",
      organization: primaryEducation.institution.toUpperCase(),
      badgeLabel: "ACTIVE UNDERGRADUATE",
      isAvailable: true,
      subtext: "Expected May 2027 · Open to Internships & AI Collaborations",
    };
  }

  return {
    statusCode: "INDEPENDENT",
    statusTitle: "AI SYSTEMS & SOFTWARE ENGINEER",
    organization: "INDEPENDENT PRACTICE",
    badgeLabel: "AVAILABLE FOR WORK",
    isAvailable: true,
    subtext: "Open to Internships & Full-Stack Collaborations",
  };
}

/**
 * Maps the database records into the unified JourneyMilestone array.
 */
export function buildJourneyMilestones(data: {
  education: Education[];
  experience: Experience[];
  leadership: Leadership[];
  projects: Project[];
  certifications: Certification[];
}): JourneyMilestone[] {
  const milestones: JourneyMilestone[] = [];

  // 1. Primary Academic Entry (SASTRA)
  data.education.forEach((edu) => {
    milestones.push({
      id: `edu-${edu.id}`,
      category: "education",
      stampType: "circular",
      inkColor: "navy",
      title: edu.institution.toUpperCase(),
      organization: `${edu.degree}${edu.field ? ` · ${edu.field}` : ""}`,
      location: edu.location || "Tamil Nadu, India",
      startDate: edu.startDate,
      endDate: edu.endDate,
      dateLabel: formatMilestoneDate(edu.startDate, edu.endDate, true),
      isCurrent: true,
      stampLabel: "ACADEMIC ENROLLMENT",
      subtitle: edu.grade ? `CGPA: ${edu.grade}` : "Undergraduate Degree",
      description: edu.description || "Foundational study in computer science algorithms, database systems, and business systems.",
    });
  });

  // 2. High-Impact Research / Project Milestone: Financial Distress Prediction
  const financialProject = data.projects.find((p) =>
    p.title.toLowerCase().includes("financial distress")
  );
  if (financialProject) {
    milestones.push({
      id: `proj-${financialProject.id}`,
      category: "research",
      stampType: "crested",
      inkColor: "burgundy",
      title: "FINANCIAL DISTRESS PREDICTION",
      organization: "AI RESEARCH & ML PIPELINE",
      location: "India Real Estate Market",
      startDate: "2024",
      endDate: "2024",
      dateLabel: "RECORDED: 2024",
      isCurrent: false,
      stampLabel: "RESEARCH DISPATCH",
      subtitle: "Machine Learning · 10+ Years Historical Data",
      description: financialProject.description,
      externalUrl: financialProject.githubUrl || financialProject.liveUrl,
    });
  }

  // 3. Leadership Roles (E-Cell SASTRA)
  data.leadership.forEach((lead) => {
    const isViceChair = lead.role.toLowerCase().includes("vice-chairperson");
    milestones.push({
      id: `lead-${lead.id}`,
      category: "leadership",
      stampType: "rectangular",
      inkColor: isViceChair ? "burgundy" : "navy",
      title: lead.organization.toUpperCase(),
      organization: lead.role.toUpperCase(),
      location: "SASTRA University",
      startDate: lead.startDate,
      endDate: lead.endDate,
      dateLabel: formatMilestoneDate(lead.startDate, lead.endDate, isViceChair),
      isCurrent: isViceChair,
      stampLabel: isViceChair ? "EXECUTIVE LEADERSHIP" : "ORGANIZATIONAL APPOINTMENT",
      subtitle: isViceChair ? "Vice-Chairperson (2026–2027)" : "Promotions & Outreach (2025–2026)",
      description: lead.description,
    });
  });

  // 4. Advanced AI Systems Project: AI Startup Validator
  const startupProject = data.projects.find((p) =>
    p.title.toLowerCase().includes("startup validator")
  );
  if (startupProject) {
    milestones.push({
      id: `proj-${startupProject.id}`,
      category: "project",
      stampType: "oval",
      inkColor: "charcoal",
      title: "AI STARTUP VALIDATOR",
      organization: "MULTI-AGENT INTELLIGENCE",
      location: "Deployed Web Application",
      startDate: "2025",
      endDate: "2025",
      dateLabel: "DEPLOYED: 2025",
      isCurrent: false,
      stampLabel: "SYSTEM DISPATCH",
      subtitle: "Sequential Market & Financial Viability Agents",
      description: startupProject.description,
      externalUrl: startupProject.liveUrl || startupProject.githubUrl,
    });
  }

  // 5. Advanced System / Resume Screener Project
  const resumeProject = data.projects.find((p) =>
    p.title.toLowerCase().includes("resume screener")
  );
  if (resumeProject) {
    milestones.push({
      id: `proj-${resumeProject.id}`,
      category: "project",
      stampType: "rectangular",
      inkColor: "gold",
      title: "AI RESUME SCREENER",
      organization: "SEMANTIC SIMILARITY PIPELINE",
      location: "Gemini API Integration",
      startDate: "2025",
      endDate: "2025",
      dateLabel: "RECORDED: 2025",
      isCurrent: false,
      stampLabel: "TECHNICAL MILESTONE",
      subtitle: "Document Parsing & Semantic Skill Extraction",
      description: resumeProject.description,
      externalUrl: resumeProject.githubUrl || resumeProject.liveUrl,
    });
  }

  // 6. Experience (if any published experience exists)
  data.experience.forEach((exp) => {
    milestones.push({
      id: `exp-${exp.id}`,
      category: "education",
      stampType: "rectangular",
      inkColor: exp.isCurrent ? "burgundy" : "navy",
      title: exp.organization.toUpperCase(),
      organization: exp.role.toUpperCase(),
      location: exp.location,
      startDate: exp.startDate,
      endDate: exp.endDate,
      dateLabel: formatMilestoneDate(exp.startDate, exp.endDate, exp.isCurrent),
      isCurrent: exp.isCurrent,
      stampLabel: "EMPLOYMENT RECORD",
      subtitle: exp.employmentType || undefined,
      description: exp.description,
    });
  });

  return milestones;
}
