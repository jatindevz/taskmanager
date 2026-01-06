import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/helpers/jwt";
import connectDB from "@/database/db";
import User from "@/models/user.model";

await connectDB();

// add task to database
export async function POST(req) {
  try {
    const { task } = await req.json();  // only task from frontend
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "No token found" }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.myTasks.push({ task }); // let Mongoose generate _id
    await user.save();

    return NextResponse.json({
      message: "Task added to user",
      success: true,
      data: user.myTasks,
    });

  } catch (error) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}

// get tasks from database
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
      data: user.myTasks,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}

// delete task from database
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const taskId = searchParams.get("id");

    if (!taskId) {
      return NextResponse.json({ error: "Task ID missing" }, { status: 400 });
    }

    const cookieStore = await cookies();
    const token =  cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "No token found" }, { status: 401 });
    }

    const decoded = await verifyToken(token);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Compare as strings
    user.myTasks = user.myTasks.filter(task => task._id.toString() !== taskId);
    await user.save();

    return NextResponse.json({
      message: "Task deleted",
      success: true,
      data: user.myTasks,
    });

  } catch (error) {
    return NextResponse.json(
      { error: error.message, success: false },
      { status: 500 }
    );
  }
}
