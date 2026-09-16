import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
  console.log('Reading data dump...');
  const dataRaw = fs.readFileSync('data-dump.json', 'utf8');
  const data = JSON.parse(dataRaw);

  console.log('Injecting data into PostgreSQL...');

  // Use a transaction for the entire import
  await prisma.$transaction(async (tx) => {
    // 1. Independent parent tables
    if (data.User && data.User.length > 0) {
      await tx.user.createMany({ data: data.User });
      console.log(`- User: ${data.User.length}`);
    }
    
    if (data.Profile && data.Profile.length > 0) {
      await tx.profile.createMany({ data: data.Profile });
      console.log(`- Profile: ${data.Profile.length}`);
    }

    if (data.Project && data.Project.length > 0) {
      await tx.project.createMany({ data: data.Project });
      console.log(`- Project: ${data.Project.length}`);
    }

    if (data.SkillCategory && data.SkillCategory.length > 0) {
      await tx.skillCategory.createMany({ data: data.SkillCategory });
      console.log(`- SkillCategory: ${data.SkillCategory.length}`);
    }

    if (data.Certification && data.Certification.length > 0) {
      await tx.certification.createMany({ data: data.Certification });
      console.log(`- Certification: ${data.Certification.length}`);
    }

    if (data.Experience && data.Experience.length > 0) {
      await tx.experience.createMany({ data: data.Experience });
      console.log(`- Experience: ${data.Experience.length}`);
    }

    if (data.Education && data.Education.length > 0) {
      await tx.education.createMany({ data: data.Education });
      console.log(`- Education: ${data.Education.length}`);
    }

    if (data.Leadership && data.Leadership.length > 0) {
      await tx.leadership.createMany({ data: data.Leadership });
      console.log(`- Leadership: ${data.Leadership.length}`);
    }

    if (data.Achievement && data.Achievement.length > 0) {
      await tx.achievement.createMany({ data: data.Achievement });
      console.log(`- Achievement: ${data.Achievement.length}`);
    }

    if (data.SocialLink && data.SocialLink.length > 0) {
      await tx.socialLink.createMany({ data: data.SocialLink });
      console.log(`- SocialLink: ${data.SocialLink.length}`);
    }

    // 2. First-level dependent tables (depends on SkillCategory)
    if (data.Skill && data.Skill.length > 0) {
      await tx.skill.createMany({ data: data.Skill });
      console.log(`- Skill: ${data.Skill.length}`);
    }

    // 3. Second-level dependent tables (depends on Project and Skill)
    if (data.ProjectSkill && data.ProjectSkill.length > 0) {
      await tx.projectSkill.createMany({ data: data.ProjectSkill });
      console.log(`- ProjectSkill: ${data.ProjectSkill.length}`);
    }

    // Depends on Experience
    if (data.ExperiencePoint && data.ExperiencePoint.length > 0) {
      await tx.experiencePoint.createMany({ data: data.ExperiencePoint });
      console.log(`- ExperiencePoint: ${data.ExperiencePoint.length}`);
    }
  });

  console.log('Import successfully completed!');
}

main()
  .catch((e) => {
    console.error('Import failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
