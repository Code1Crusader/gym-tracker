"use server";

import { MuscleGroup, User } from "@/app/generated/prisma";
import prisma from "@/lib/prisma";

// TODO : user needs to be passed to prisma create
export async function createSplit(
  user: User,
  muscleGroups: MuscleGroup[],
  formData: FormData
) {
  const splitName = formData.get("name") as string;
  try {
    const split = await prisma.split.create({
      data: {
        name: splitName,
        user: {
          connect: {
            id: user.id,
          },
        },
        muscleGroups: {
          create: muscleGroups,
        },
      },
    });
    if (!split) {
      throw new Error("Unable to create split", split);
    }
  } catch (error) {
    console.error(error);
  }
}
