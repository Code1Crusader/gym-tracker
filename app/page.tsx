import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/lib/auth";
import Link from "next/link";
import { redirect, RedirectType } from "next/navigation";

export default async function Home() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/sign-in", RedirectType.replace);
  }
  return (
    <div className='w-full h-full flex flex-col items-center mt-10'>
      <h2>Welcome {session?.user?.username}</h2>
      <Button asChild className='w-sm'>
        <Link href='/split'>Manage Splits</Link>
      </Button>
      <footer className='w-full'></footer>
    </div>
  );
}
