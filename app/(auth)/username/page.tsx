"user client";
import Username from "@/components/Username";
import { getServerAuthSession } from "@/lib/auth";
import { notFound } from "next/navigation";

export default async function UsernamePage() {
  const session = await getServerAuthSession();
  if (!session) {
    console.error("Unable to retrieve session");
    notFound();
  }

  if (!session.user) {
    console.error("User not found in session");
    notFound();
  }

  if (!session.user.email) {
    console.error("Email not found in user sesession");
    notFound();
  }
  return (
    <div>
      <Username userEmail={session?.user?.email} />
    </div>
  );
}
