import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding certifications...');

  const certifications = [
    {
      title: 'AI Agents',
      issuer: 'Coursera',
      certificateImageUrl: '/certificates/AI Agents.pdf',
      isPublished: true,
      displayOrder: 1,
    },
    {
      title: 'AI Tools',
      issuer: 'Coursera',
      certificateImageUrl: '/certificates/AI TOOLS.pdf',
      isPublished: true,
      displayOrder: 2,
    },
    {
      title: 'Front End Certification',
      issuer: 'freeCodeCamp',
      certificateImageUrl: '/certificates/FRONT END CERTIFICATION.pdf',
      isPublished: true,
      displayOrder: 3,
    },
    {
      title: 'Human Computer Interaction',
      issuer: 'Coursera',
      certificateImageUrl: '/certificates/Human Computer Interaction.pdf',
      isPublished: true,
      displayOrder: 4,
    },
    {
      title: 'Introduction to GenAI',
      issuer: 'Google Cloud',
      certificateImageUrl: '/certificates/Intro_to_GenAI.pdf',
      isPublished: true,
      displayOrder: 5,
    },
    {
      title: 'The Joy of Computing using Python',
      issuer: 'NPTEL',
      certificateImageUrl: '/certificates/The Joy of Computing using Python.pdf',
      isPublished: true,
      displayOrder: 6,
    }
  ];

  for (const cert of certifications) {
    await prisma.certification.create({
      data: cert,
    });
  }

  console.log('Certifications seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
