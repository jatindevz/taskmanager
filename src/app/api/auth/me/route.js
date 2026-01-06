import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifyToken } from "@/helpers/jwt";
import connectDB from "@/database/db";
import User from "@/models/user.model";

await connectDB();

export async function GET(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "No token found" }, { status: 401 });
    }

    const decoded = await verifyToken(token);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User found",
      success: true,
      data: user,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 401 }
    );
  }
}



