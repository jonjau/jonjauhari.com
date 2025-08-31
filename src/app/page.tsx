import { Goat } from "./svg";
import InlineLink from "@/components/inline-link";
import React from "react";
import clsx from "clsx";

export function generateMetadata() {
  return {
    title: "Jonathan Jauhari",
  };
}

export default function Home() {
  return (
    <>
      <h1 className="font-serif text-4xl/normal sm:text-6xl/normal">
        Hi, I&apos;m <span className="text-teal-600">Jonathan</span>.
      </h1>
      <h2
        className={clsx([
          "font-serif",
          "text-3xl/normal",
          "text-amber-200",
          "sm:text-5xl/normal",
        ])}
      >
        I build web apps <span className="text-amber-700">—</span>
      </h2>
      <div className="w-5/6 py-2 mx-auto">
        <Goat />
      </div>
      <p className="text-md sm:text-xl">
        with a <span className="text-amber-200">sure-footed</span> approach.
      </p>
      <p className="text-md mt-6 sm:text-xl">
        This website is {" "}
        <InlineLink
          title="GitHub repository for this site"
          href="https://github.com/jonjau/jonjauhari.com"
        >
          open source
        </InlineLink>
        . Enjoy your stay!
      </p>
    </>
  );
}
