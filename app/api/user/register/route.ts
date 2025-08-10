import { hash } from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

const UserSchema = z.object({
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
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, email, password } = UserSchema.parse(body);

    // Check if username already exists
    const usernameExists = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (usernameExists) {
      return NextResponse.json(
        { field: "username", message: "That username is already taken" },
        { status: 409 }
      );
    }

    // Check if email already exists
    const emailExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (emailExists) {
      return NextResponse.json(
        { field: "email", message: "That email is already has an account" },
        { status: 409 }
      );
    }

    // If username and email do not exist, create new user

    // Hash password
    const hashedPassword = await hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: extractedPassword, ...data } = newUser;
    return NextResponse.json(
      { user: data, message: "Successfully created user" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating user", error);
    return NextResponse.json(
      { message: "There was a problem with your registration" },
      { status: 500 }
    );
  }
}
