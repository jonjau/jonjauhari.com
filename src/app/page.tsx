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
      <h1 className="font-serif text-4xl/normal sm:text-7xl/normal">
        Hi, I&apos;m <span className="text-teal-600">Jonathan</span>.
      </h1>
      <h2
        className={clsx([
          "font-serif",
          "text-3xl/normal",
          "text-amber-200",
          "sm:text-6xl/normal",
        ])}
      >
        I build web apps.<span className="text-amber-700">*</span>
      </h2>
      <p className="text-md mt-8 sm:text-xl">
        <span className="text-amber-700">*</span> learning to, anyway.
      </p>
      <p className="text-md mt-8 sm:text-xl">
        This website is a{" "}
        <InlineLink
          title="GitHub repository for this site"
          href="https://github.com/jonjau/jonjauhari.com"
        >
          work in progress
        </InlineLink>
        . Enjoy your stay!
      </p>
    </>
  );
}
