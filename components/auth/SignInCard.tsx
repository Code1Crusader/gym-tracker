"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
  CardHeader,
  CardAction,
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
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const FormSchema = z.object({
  usernameOrEmail: z.union([
    z.string().email(),
    z.string().min(1, "Username or Email is required"),
  ]),
  password: z.string().min(1, "Password is required"),
});

export default function SignIn(): React.ReactElement {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  });

  async function onCredentialsSubmit(data: z.infer<typeof FormSchema>) {
    const signInData = await signIn("credentials", {
      usernameOrEmail: data.usernameOrEmail,
      password: data.password,
      redirect: false,
    });
    if (signInData?.ok && !signInData?.error) {
      router.push("/");
    } else {
      console.log(signInData?.error);
    }
  }

  async function handleGoogleSignIn() {
    await signIn("google", { callBackUrl: "/" });
  }

  return (
    <Card className='w-full max-w-sm mt-10'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onCredentialsSubmit)}>
          <div className='flex flex-col gap-6'>
            <CardHeader>
              <CardTitle>Sign in to your account</CardTitle>
              <CardDescription>
                Enter your email and password or sign in with google
              </CardDescription>
              <CardAction>
                <Button>
                  <Link href='/sign-up'>Sign up</Link>
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className='grid gap-6'>
                <FormField
                  control={form.control}
                  name='usernameOrEmail'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username or Email</FormLabel>
                      <FormControl>
                        <Input placeholder='GymBro' {...field} />
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
                        <Input type='password' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className='flex-col gap-2'>
              <Button className='w-full cursor-pointer' type='submit'>
                Login
              </Button>
              <Button
                className='w-full cursor-pointer'
                variant='outline'
                type='button'
                onClick={handleGoogleSignIn}>
                Sign in with Google
              </Button>
            </CardFooter>
          </div>
        </form>
      </Form>
    </Card>
  );
}
