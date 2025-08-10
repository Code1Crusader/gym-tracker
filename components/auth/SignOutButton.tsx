"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function SignOutButton() {
  return (
    <Button
      className='justify-self-end'
      onClick={() => {
        signOut({
          redirect: true,
          callbackUrl: "/sign-in",
        });
      }}>
      Sign out
    </Button>
  );
}
