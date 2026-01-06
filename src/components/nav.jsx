"use client";


import React, { use } from 'react'
import Link from 'next/link'
import { useState, useEffect } from 'react';

const Nav = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("/api/auth/me", {
                    method: "GET",
                    credentials: 'include',
                });
    
                const data = await res.json();
    
                if (data.success) {
                    console.log("User is logged in");
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error("Auth check failed:", error);
            }
        };
    
        checkAuth();
    }, []);

    const handleLogout = async () => {
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                credentials: 'include',
            });
    
            const data = await res.json();
    
            if (data.success) {
                console.log("Logout successful");
                setIsLoggedIn(false);
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    

    return (
        <div>
            <div className="flex gap-4">
                {isLoggedIn ? (
                    <div className="flex gap-4">

                    <button
                        onClick={handleLogout}
                        className="mt-6 px-6 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-gray-500 to-gray-700 shadow-lg cursor-pointer active:scale-95"
                        >
                        Logout
                    </button>
                    <Link href="/profile">
                    <button className="mt-6 px-6 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg cursor-pointer active:scale-95">
                        Go to Profile
                    </button>
                </Link>
                        </div>
                ) : (
                    <div className="flex gap-4">
                    <Link href="/login">
                        <button className="mt-6 px-6 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-gray-500 to-gray-700 shadow-lg cursor-pointer active:scale-95">
                            Login
                        </button>
                    </Link>
                    <Link href="/register">
                        <button className="mt-6 px-6 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-gray-500 to-gray-700 shadow-lg cursor-pointer active:scale-95">
                            Register
                        </button>
                    </Link>
                    </div>
                )}
               
                
            </div>
        </div>
    )
}

export default Nav