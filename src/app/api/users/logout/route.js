import { NextResponse } from "next/server.js";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const cookieStore = cookies();
    cookieStore.delete("token");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
