import { Button } from "@/components/ui/button";
import { getServerAuthSession } from "@/lib/auth";
import Link from "next/link";
import SignOutButton from "../auth/SignOutButton";

export default async function NavBar(): Promise<React.ReactElement> {
  const session = await getServerAuthSession();
  return (
    <div className='grid grid-flow-row w-full py-4 px-4 shadow-md my-5'>
      {session?.user ? (
        <SignOutButton />
      ) : (
        <Button asChild className='text-white justify-self-end'>
          <Link href='/sign-in'>Sign in</Link>
        </Button>
      )}
    </div>
  );
}
