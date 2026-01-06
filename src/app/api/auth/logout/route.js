
//src/app/api/auth/logout/route.js - Fixed logout to properly clear cookie
import { NextResponse } from "next/server";

export async function GET() {
    return handleLogout();
}

export async function POST() {
    return handleLogout();
}

function handleLogout() {
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        });
        
        // Clear the token cookie with same settings as when it was set
        response.cookies.set("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            expires: new Date(0), // Set to past date
            path: '/', // Same path as when cookie was set
            maxAge: 0
        });
        
        return response;
    } catch (error) {
        return NextResponse.json(
            { error: error.message, success: false }, 
            { status: 500 }
        );
    }
}
