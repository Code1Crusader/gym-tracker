import prisma from "./prisma";

export async function generateDefaultUsername(
  base: string = "GymBro",
  name: string
) {
  const userCount = await prisma.user.count();

  const username = `${base}-${name}${userCount + 1}`;

  return username;
}
