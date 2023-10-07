import InlineLink from "@/components/inline-link";
import React from "react";

export function generateMetadata() {
  return {
    title: "Not found - Jonathan Jauhari",
  };
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center">
      <h2 className="font-serif text-7xl/normal">Page not found.</h2>
      <p className=" mt-8 pr-8 font-serif text-2xl text-amber-200">
        Have you found the void —
      </p>
      <p className=" mt-8 pl-8  text-right font-serif text-2xl text-amber-200">
        — or has the void found you?
      </p>
      <div className="my-16  h-32 border-l-4 border-l-amber-700"></div>
      <InlineLink title="Go back to homepage" href="/" className="text-2xl">
        Return home
      </InlineLink>
      .
    </div>
  );
}
