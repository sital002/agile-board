import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      display_name: "Alice",
      password: "password",
      verification_code: "1234",
      email: "alice@prisma.io",
    },
  });
  await prisma.user.create({
    data: {
      display_name: "Ram",
      password: "password",
      verification_code: "1234",
      email: "ram@prisma.io",
    },
  });
  await prisma.user.create({
    data: {
      display_name: "Hari",
      password: "password",
      verification_code: "1234",
      email: "hari@prisma.io",
    },
  });
  await prisma.user.create({
    data: {
      display_name: "Mukesh",
      password: "password",
      verification_code: "1234",
      email: "Mukes@prisma.io",
    },
  });
}

main().then(async () => {
  console.log("Seeded successfully");
  await prisma.$disconnect();
});
