import InlineLink from "@/components/inline-link";
import React from "react";
import clsx from "clsx";

export function generateMetadata() {
  return {
    title: "Not found - Jonathan Jauhari",
  };
}

export default function NotFound() {
  return (
    <div className="flex flex-col items-center">
      <h2 className="font-serif text-4xl sm:text-7xl/normal">
        Page not found.
      </h2>
      <p
        className={clsx([
          "text-md",
          "mt-8",
          "pr-8",
          "font-serif",
          "text-amber-200",
          "sm:text-2xl",
        ])}
      >
        Have you found the void —
      </p>
      <p
        className={clsx([
          "text-md",
          "mt-8",
          "pr-8",
          "font-serif",
          "text-amber-200",
          "sm:text-2xl",
          "text-right",
        ])}
      >
        — or has the void found you?
      </p>
      <div className="my-16  h-32 border-l-4 border-l-amber-700"></div>
      <span>
        <InlineLink
          title="Go back to homepage"
          href="/"
          className="text-lg sm:text-3xl"
        >
          Return home
        </InlineLink>
        .
      </span>
    </div>
  );
}
