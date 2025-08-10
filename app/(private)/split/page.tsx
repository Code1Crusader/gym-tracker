import { Button } from "@/components/ui/button";
import SplitItem from "@/components/split/SplitItem";
import prisma from "@/lib/prisma";
import { getServerAuthSession } from "@/lib/auth";
import { redirect, RedirectType } from "next/navigation";
import Link from "next/link";

export default async function SplitPage() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/login", RedirectType.replace);
  }

  const userSplitData = await prisma.user.findUnique({
    select: {
      splits: {
        select: {
          id: true,
          muscleGroups: true,
          gymSessions: true,
        },
      },
    },
    where: {
      username: session.user.username,
    },
  });

  return (
    <div className='w-full p-10 m-10 border border-1 border-grey rounded-md flex flex-col items-center gap-6'>
      {userSplitData?.splits ? (
        <ul>
          {userSplitData.splits.map((splitData) => (
            <SplitItem key={splitData.id} split={splitData} />
          ))}
        </ul>
      ) : (
        <>
          <h2 className='text-gray-400 text-xl'>THERE IS NO SPLIT DATA</h2>
          <Button asChild className='cursor-pointer'>
            <Link href='split/create-split'>+ Create Split</Link>
          </Button>
        </>
      )}
    </div>
  );
}
