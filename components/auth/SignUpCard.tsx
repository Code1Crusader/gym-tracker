"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const FormSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters long")
    .regex(/^[a-zA-Z0-9-_]+$/, {
      message: "Username can't have any special characters except '-' and '_'",
    }),
  email: z
    .string()
    .min(1, "Email is required")
    .email("That is not a valid email"),
  password: z
    .string()
    .min(8, { message: "Password must be be at least 8 characters long" })
    .regex(/[a-zA-Z]/, {
      message: "Password must contain at least one letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    })
    .trim(),
});

export default function SignUp(): React.ReactElement {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  const { setError } = form;
  async function handleGoogleSingUp() {
    await signIn("google", { callbackUrl: "/username" });
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const request = await fetch("api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
    });

    if (request.ok) {
      router.push("/sign-in");
    } else {
      const body = await request.json();
      setError(body.field, {
        type: "manual",
        message: body.message,
      });
    }
  }
  return (
    <Card className='w-full max-w-sm mt-10'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-6'>
            <CardHeader className='flex flex-col gap-2'>
              <CardTitle>Sign up</CardTitle>
              <CardDescription>Create a new account</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-6'>
                <FormField
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder='GymBro' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder='gymbro@exmaple.com' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          placeholder='••••••••'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className='flex flex-col gap-2'>
              <Button className='w-full cursor-pointer' type='submit'>
                Sign Up
              </Button>
              <Button
                className='w-full cursor-pointer'
                type='button'
                onClick={handleGoogleSingUp}>
                Sign up with Google
              </Button>
              <p className='text-sm'>
                Already have an account?
                <Button
                  asChild
                  variant='link'
                  className='hover:underline inline-block'>
                  <Link href='/sign-in'>Sign In</Link>
                </Button>
              </p>
            </CardFooter>
          </div>
        </form>
      </Form>
    </Card>
  );
}
