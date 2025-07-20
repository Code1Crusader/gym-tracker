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

    if (!userEmail) {
      return NextResponse.json(
        {
          error: "User email not provided",
        },
        { status: 402 }
      );
    }

    // Check if username already exists
    const userExists = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (userExists) {
      return NextResponse.json(
        {
          error: "Username already exists",
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
        error: "Invalid request data",
      },
      { status: 400 }
    );
  }
}
