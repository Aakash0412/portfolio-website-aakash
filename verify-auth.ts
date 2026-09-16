import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log("Connecting to production DB...");
  const user = await prisma.user.findUnique({
    where: { email: 'admin@aakashayyappan.com' }
  });

  if (!user) {
    console.log("CASE A: User NOT FOUND in database.");
    return;
  }
  
  console.log(`User found. Email: ${user.email}, Role: ${user.role}`);
  console.log(`isActive: ${user.isActive ? 'true' : 'false'}`);
  console.log(`Has passwordHash: ${user.passwordHash ? 'YES' : 'NO'}`);

  if (user.passwordHash) {
    const isMatch = await bcrypt.compare('password', user.passwordHash);
    console.log(`Password match with 'password': ${isMatch ? 'MATCH' : 'MISMATCH'}`);
  }
}

main()
  .catch(e => {
    console.error("Error executing verification:", e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
