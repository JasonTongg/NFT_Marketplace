import React from "react";
import Image from "next/image";
import AboutHero from "../public/AboutHero.png";

export default function aboutHero() {
  return (
    <div className="grid grid-cols-2 items-center gap-8 w-full min-h-[70vh]">
      <div className="flex flex-col justify-center gap-3">
        <h1 className="text-5xl font-bold">👋 About Us!</h1>
        <p className="text-justify">
          We're impartial and independent. everyday we create distinctive,
          world-class programmes and content which inform, educate and entertain
          millions of people around the world.
        </p>
      </div>
      <Image src={AboutHero} alt="abouthero" className="" />
    </div>
  );
}
