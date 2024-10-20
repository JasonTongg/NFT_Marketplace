import React from "react";
import Image from "next/image";
import Link from "next/link";
import Image404 from "../public/404.png";

export default function Custom404() {
  return (
    <div className="min-h-[100vh] flex flex-col items-center justify-center gap-4">
      <Image src={Image404} alt="404" className="w-[200px]" />
      <h1 className="text-center text-3xl font-bold">404 - Page Not Found</h1>
      <p className="text-center text-lg">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <div className="text-center">
        <Link
          href="/"
          className="bg-[#ECDFCC]  px-6 py-2 rounded-[30px] text-[#181C14]"
        >
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
