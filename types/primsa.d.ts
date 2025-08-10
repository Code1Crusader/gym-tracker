import { Prisma } from "@/prisma/client";

const SplitWithRelations = Prisma.validator<Prisma.SplitArgs>()({
  include: {
    muscleGroups: true,
    gymSessions: true,
  },
});

type SplitWithRelations = Prisma.GetSplitPayload<typeof SplitWithRelations>;

type SplitArray = SplitWithRelations[];
