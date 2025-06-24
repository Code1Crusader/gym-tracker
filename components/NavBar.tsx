import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NavBar(): React.ReactElement {
  return (
    <div className='grid grid-flow-row w-full p-2 shadow-md'>
      <Button asChild className='text-white justify-self-end'>
        <Link href='/sign-in'>Sign in</Link>
      </Button>
    </div>
  );
}
