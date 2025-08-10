import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { z } from "zod";

const UsernameSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters long")
    .regex(/^[a-zA-Z0-9-_]+$/, {
      message: "Username can't have any special characters except '-' and '_'",
    }),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Validate username entered by user
    const { username } = UsernameSchema.parse(body);
    const { userEmail } = body;

    // Ensure email is provided with
    if (!userEmail) {
      throw new Error("User email not provided for username creation", {
        cause: "User email is null",
      });
    }

    // Check if username already exists
    const userExists = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (userExists) {
      console.warn(`Username ${userExists.username} is already taken`);
      return NextResponse.json(
        {
          message: "That username is already taken",
        },
        { status: 409 }
      );
    }

    // Update user's username
    const udpatedUser = await prisma.user.update({
      where: {
        email: userEmail,
      },
      data: {
        username: username,
      },
    });

    return NextResponse.json(
      {
        message: "Username udpated successfully",
        user: {
          id: udpatedUser.id,
          username: udpatedUser.username,
          email: udpatedUser.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creatiing username:", error);
    return NextResponse.json(
      {
        message: "There was a problem creating your username",
      },
      { status: 500 }
    );
  }
}
