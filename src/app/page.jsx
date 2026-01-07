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
    </div>
  );
}