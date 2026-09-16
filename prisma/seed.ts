import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const adminPassword = process.env.ADMIN_SEED_PASSWORD;
  if (!adminPassword) {
    console.error("❌ ERROR: ADMIN_SEED_PASSWORD is not configured in the environment.");
    console.error("Please provide it to seed the admin user securely. Example:");
    console.error("ADMIN_SEED_PASSWORD=\"your-secure-password\" npx prisma db seed");
    process.exit(1);
  }

  // Generate hash dynamically instead of using a hardcoded string
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  // Create default Admin User
  await prisma.user.upsert({
    where: { email: 'admin@aakashayyappan.com' },
    update: {},
    create: {
      email: 'admin@aakashayyappan.com',
      name: 'Aakash A.',
      passwordHash: passwordHash,
      role: 'ADMIN',
    },
  });

  // Profile
  await prisma.profile.create({
    data: {
      name: 'Aakash A.',
      headline: 'AI Systems & Software Engineer',
      bio: "I'm a pre-final year Computer Science & Business Systems student at SASTRA Deemed University, passionate about building intelligent systems and robust backend infrastructure. I specialize in training models, developing APIs, and architecting data pipelines that bridge the gap between complex algorithms and real-world impact.",
      shortBio: 'CSBS student building AI systems, backend APIs, ML pipelines, and full-stack apps.',
      email: 'aakasha0412@gmail.com',
      location: 'India',
      resumeUrl: 'aakash-resume.pdf',
    },
  });

  // Create Skill Categories & Skills
  const categoryLanguages = await prisma.skillCategory.create({ data: { name: 'Languages', displayOrder: 1 } });
  const categoryBackend = await prisma.skillCategory.create({ data: { name: 'Backend & APIs', displayOrder: 2 } });
  const categoryAI = await prisma.skillCategory.create({ data: { name: 'AI & Data Science', displayOrder: 3 } });
  const categoryFrontend = await prisma.skillCategory.create({ data: { name: 'Frontend', displayOrder: 4 } });

  const skills = [
    { name: 'Python', categoryId: categoryLanguages.id },
    { name: 'JavaScript', categoryId: categoryLanguages.id },
    { name: 'TypeScript', categoryId: categoryLanguages.id },
    { name: 'C++', categoryId: categoryLanguages.id },
    { name: 'SQL', categoryId: categoryLanguages.id },
    
    { name: 'FastAPI', categoryId: categoryBackend.id },
    { name: 'Django', categoryId: categoryBackend.id },
    { name: 'Node.js', categoryId: categoryBackend.id },
    { name: 'Express', categoryId: categoryBackend.id },
    { name: 'PostgreSQL', categoryId: categoryBackend.id },
    { name: 'MongoDB', categoryId: categoryBackend.id },
    
    { name: 'TensorFlow', categoryId: categoryAI.id },
    { name: 'PyTorch', categoryId: categoryAI.id },
    { name: 'Scikit-learn', categoryId: categoryAI.id },
    { name: 'Pandas', categoryId: categoryAI.id },
    { name: 'LangChain', categoryId: categoryAI.id },
    { name: 'OpenAI API', categoryId: categoryAI.id },
    { name: 'Gemini API', categoryId: categoryAI.id },
    
    { name: 'React', categoryId: categoryFrontend.id },
    { name: 'Next.js', categoryId: categoryFrontend.id },
    { name: 'Tailwind CSS', categoryId: categoryFrontend.id },
    { name: 'HTML/CSS', categoryId: categoryFrontend.id },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }

  // Projects
  await prisma.project.create({
    data: {
      title: 'Predicting Financial Distress in Indian Real Estate',
      slug: 'predicting-financial-distress-real-estate',
      shortDescription: 'Machine learning models identifying high-risk real estate investments in India before they collapse, trained on 10+ years of historical data.',
      description: 'Machine learning models identifying high-risk real estate investments in India before they collapse, trained on 10+ years of historical data.',
      featured: true,
      isPublished: true,
      status: 'published',
      displayOrder: 1,
      githubUrl: 'https://github.com/Aakash0412',
    }
  });

  await prisma.project.create({
    data: {
      title: 'Stock Price Predictor',
      slug: 'stock-price-predictor',
      shortDescription: 'Deep learning LSTM architecture that predicts future stock price movements by analyzing technical indicators and historical volatility.',
      description: 'Deep learning LSTM architecture that predicts future stock price movements by analyzing technical indicators and historical volatility.',
      featured: true,
      isPublished: true,
      status: 'published',
      displayOrder: 2,
      githubUrl: 'https://github.com/Aakash0412',
    }
  });

  await prisma.project.create({
    data: {
      title: 'AI Startup Validator',
      slug: 'ai-startup-validator',
      shortDescription: 'A multi-agent system that evaluates startup ideas through sequential market research, financial viability and risk assessment.',
      description: 'A multi-agent system that evaluates startup ideas through sequential market research, financial viability and risk assessment.',
      featured: true,
      isPublished: true,
      status: 'published',
      displayOrder: 3,
      liveUrl: 'https://ai-startup-validator-topaz.vercel.app/',
      githubUrl: 'https://github.com/Aakash0412',
    }
  });

  await prisma.project.create({
    data: {
      title: 'AI Resume Screener',
      slug: 'ai-resume-screener',
      shortDescription: 'Resume screening that parses documents, extracts skills and matches candidates through semantic similarity using the Gemini API.',
      description: 'Resume screening that parses documents, extracts skills and matches candidates through semantic similarity using the Gemini API.',
      featured: true,
      isPublished: true,
      status: 'published',
      displayOrder: 4,
      githubUrl: 'https://github.com/Aakash0412',
    }
  });

  // Add more seed data here as needed for Experience, Education, etc.

  console.log('Database seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });