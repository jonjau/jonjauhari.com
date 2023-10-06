import React from "react";
import clsx from "clsx";
import Link from "next/link";

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
      <Link
        href="/"
        className={clsx([
          "text-2xl",
          "text-teal-600",
          "underline",
          "underline-offset-4",
          "decoration-dotted",
          "decoration-2",
          "decoration-teal-600",
          "hover:decoration-amber-700",
          "hover:text-teal-400",
          "focus:decoration-solid",
          "focus:decoration-amber-700",
          "focus:text-teal-200",
        ])}
      >
        Return Home
      </Link>
    </div>
  );
}
