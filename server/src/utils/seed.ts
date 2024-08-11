import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
async function main() {
  const hashedPassword = await bcrypt.hash("12345678", 10);

  await prisma.user.createMany({
    data: [
      {
        display_name: "Sital Adhikari",
        password: hashedPassword,
        verification_code: "1234",
        email: "test@gmail.com",
      },

      {
        display_name: "Alice",
        password: hashedPassword,
        verification_code: "1234",
        email: "alice@prisma.io",
      },
      {
        display_name: "Ram",
        password: hashedPassword,
        verification_code: "1234",
        email: "ram@prisma.io",
      },
      {
        display_name: "Hari",
        password: hashedPassword,
        verification_code: "1234",
        email: "hari@prisma.io",
      },
      {
        display_name: "Mukesh",
        password: hashedPassword,
        verification_code: "1234",
        email: "Mukes@prisma.io",
      },
    ],
  });
}

main().then(async () => {
  console.log("Seeded successfully");
  await prisma.$disconnect();
});
