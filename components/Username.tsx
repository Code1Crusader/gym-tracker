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
});

export default function Username({
  userEmail,
}: {
  userEmail: string;
}): React.ReactElement {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const request = await fetch("/api/user/update-username", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        userEmail: userEmail,
      }),
    });

    if (request.ok) {
      router.push("/");
    } else {
      console.error("Failed to update the username", request);
    }
  }
  return (
    <Card className='w-full max-w-sm flex flex-col mt-10'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col gap-6'>
              <CardHeader>
                <CardTitle>Username</CardTitle>
                <CardDescription>
                  Please enter your desired username
                </CardDescription>
              </CardHeader>
            </div>
            <CardContent>
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
            </CardContent>
            <CardFooter>
              <Button className='w-full' type='submit'>
                Submit
              </Button>
            </CardFooter>
          </div>
        </form>
      </Form>
    </Card>
  );
}
