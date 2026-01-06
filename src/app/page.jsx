//src/app/page.jsx - Fixed home page to be public
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/nav";

export default function Home() {
  return (
    <div className="flex flex-col gap-5 w-full h-screen justify-center items-center ">
      <h1 className="text-5xl font-bold text-[#d3d3d3]">
        Your Task Manager
      </h1>

      <Nav />

      {/* <div className="flex gap-4">
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
        <Link href="/profile">
        <button className="mt-6 px-6 py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 shadow-lg cursor-pointer active:scale-95">
          Go to Profile
        </button>
        </Link>
      </div> */}
    </div>
  );
}