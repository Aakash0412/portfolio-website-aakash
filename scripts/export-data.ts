import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  console.log('Extracting data from SQLite database...');
  
  const data = {
    User: await prisma.user.findMany(),
    Profile: await prisma.profile.findMany(),
    Project: await prisma.project.findMany(),
    SkillCategory: await prisma.skillCategory.findMany(),
    Skill: await prisma.skill.findMany(),
    ProjectSkill: await prisma.projectSkill.findMany(),
    Certification: await prisma.certification.findMany(),
    Experience: await prisma.experience.findMany(),
    ExperiencePoint: await prisma.experiencePoint.findMany(),
    Education: await prisma.education.findMany(),
    Leadership: await prisma.leadership.findMany(),
    Achievement: await prisma.achievement.findMany(),
    SocialLink: await prisma.socialLink.findMany(),
  };

  fs.writeFileSync('data-dump.json', JSON.stringify(data, null, 2));

  console.log('Export Complete. Record counts:');
  for (const [model, records] of Object.entries(data)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    console.log(`- ${model}: ${(records as any[]).length}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
