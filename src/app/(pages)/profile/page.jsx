"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Profile() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const Logout = async () => {
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: 'include' // Important for cookie handling
            });

            const result = await res.json();

            if (result.success) {
                console.log(result.message);
                // Force a hard redirect to clear any cached state
                window.location.href = "/login";
            } else {
                console.error("Logout failed:", result.error);
            }
        } catch (err) {
            console.error("Logout error:", err);
            // Force redirect even if logout request fails
            window.location.href = "/login";
        }
    };

    const getUserData = async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch("/api/auth/me", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: 'include' // Important for cookie handling
            });

            const result = await res.json();

            if (result.success && result.data) {
                setData(result.data);
                console.log("Fetched user data:", result.data, result.message);
            }
            else {
                setError(result.error || "Failed to fetch user data");
            }
        } catch (err) {
            console.error("Error fetching user data:", err);
            setError("Network error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);


    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black flex items-center flex-col justify-center">
                <div className="text-red-500 text-xl">Error: {error}</div>
                <button
                    onClick={Logout}
                    className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition active:scale-95"
                >
                    Exit
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Profile</h1>

                {data ? (
                    <div>
                        <div className="bg-[#0a0a0a] p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">User Information</h2>
                            <div className="space-y-3">
                                <p><span className="font-medium">Name:</span> {data.name}</p>
                                <p><span className="font-medium">Email:</span> {data.email}</p>
                                <p><span className="font-medium">User ID:</span> {data._id}</p>
                                <p><span className="font-medium">My Tasks:</span> {data.mytasks}</p>
                                {data.createdAt && (
                                    <p><span className="font-medium">Member Since:</span> {new Date(data.createdAt).toLocaleDateString()}</p>
                                )}
                            </div>
                        </div>
                        <div className="mt-8 space-x-4">
                            <button
                                onClick={Logout}
                                className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition active:scale-95"
                            >
                                Logout
                            </button>

                            <Link
                                href="/mytasks"
                                className="inline-block px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold transition"
                            >
                                Todo
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="text-gray-400">No user data available</div>
                        <button
                            onClick={Logout}
                            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition active:scale-95"
                        >
                            Exit
                        </button>
                    </div>
                )}


            </div>
        </div>
    );
}
