import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const cookieStore = cookies();
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json({
        success: false,
        error: "You must provide a username and password to login.",
      });
    }
    const user = await prisma.user.findFirst({
      where: { username },
    });
    if (!user) {
      return NextResponse.json({
        success: false,
        error: "Username doesn't exist. Please register",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json({
        success: false,
        error: "Username and/or password was incorrect.",
      });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET
    );
    cookieStore.set("token", token);
    return NextResponse.json({ success: true, token });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
