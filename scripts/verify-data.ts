import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  const dataRaw = fs.readFileSync('data-dump.json', 'utf8');
  const sqliteData = JSON.parse(dataRaw);

  const pgCounts = {
    User: await prisma.user.count(),
    Profile: await prisma.profile.count(),
    Project: await prisma.project.count(),
    SkillCategory: await prisma.skillCategory.count(),
    Skill: await prisma.skill.count(),
    ProjectSkill: await prisma.projectSkill.count(),
    Certification: await prisma.certification.count(),
    Experience: await prisma.experience.count(),
    ExperiencePoint: await prisma.experiencePoint.count(),
    Education: await prisma.education.count(),
    Leadership: await prisma.leadership.count(),
    Achievement: await prisma.achievement.count(),
    SocialLink: await prisma.socialLink.count(),
  };

  console.log('| Model | SQLite count | PostgreSQL count | Match |');
  console.log('|---|---|---|---|');

  for (const model of Object.keys(pgCounts)) {
    const sqliteCount = (sqliteData[model] || []).length;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pgCount = (pgCounts as any)[model];
    const match = sqliteCount === pgCount ? '✅ YES' : '❌ NO';
    console.log(`| ${model} | ${sqliteCount} | ${pgCount} | ${match} |`);
  }

  // Admin user verification
  const adminUser = await prisma.user.findUnique({ where: { email: 'admin@aakashayyappan.com' } });
  console.log(`\nAdmin user exists: ${adminUser ? '✅ YES' : '❌ NO'}`);
  if (adminUser) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sqliteAdmin = sqliteData.User.find((u: any) => u.email === 'admin@aakashayyappan.com');
    console.log(`Admin password hash matches exactly: ${adminUser.passwordHash === sqliteAdmin.passwordHash ? '✅ YES' : '❌ NO'}`);
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
