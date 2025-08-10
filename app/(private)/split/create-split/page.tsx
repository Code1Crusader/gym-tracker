import { CreateSplitItem } from "@/components/split/CreateSplitItem";
import prisma from "@/lib/prisma";

export default async function CreateSplitPage() {
  const muscleGroups = await prisma.muscleGroup.findMany();
  return (
    <div>
      <CreateSplitItem muscleGroups={muscleGroups}></CreateSplitItem>
    </div>
  );
}
