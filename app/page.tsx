import { getServerAuthSession } from "@/lib/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <div className='w-full h-full flex flex-col items-center'>
      Welcome {session?.user?.name}
      <footer className='w-full'></footer>
    </div>
  );
}
