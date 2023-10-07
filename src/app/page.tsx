import InlineLink from "@/components/inline-link";
import React from "react";

export function generateMetadata() {
  return {
    title: "Jonathan Jauhari",
  };
}

//TODO: mobile site, factor out common components, e.g. links, licence
export default function Home() {
  return (
    <>
      <h1 className="font-serif text-7xl/normal">
        Hi, I&apos;m <span className="text-teal-600">Jonathan</span>.
      </h1>
      <h2 className="font-serif text-6xl/normal text-amber-200">
        I build web apps.<span className="text-amber-700">*</span>
      </h2>
      <p className="mt-8 text-xl">
        <span className="text-amber-700">*</span> learning to, anyway.
      </p>
      <p className="mt-8 text-xl">
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
