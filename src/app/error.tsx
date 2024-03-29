"use client";

import InlineLink from "@/components/inline-link";
import React from "react";

export default function Error() {
  return (
    <div className="flex flex-col items-center">
      <h2 className="font-serif text-2xl sm:text-5xl/normal">
        Something went wrong.
      </h2>
      <p className="text-md mt-8 font-serif text-amber-200 sm:text-2xl">
        &ldquo;Mission failed — we&apos;ll get &apos;em next time.&rdquo;
      </p>
      <div className="my-16 h-32 border-l-4 border-l-amber-700"></div>
      <div className="text-lg sm:text-3xl">
        <InlineLink title="Go back to homepage" href="/" className="mx-2">
          Return home
        </InlineLink>{" "}
        or{" "}
        <InlineLink
          title="Go back to this website's GitHub page"
          href="https://github.com/jonjau/jonjauhari.com"
          className="mx-2"
        >
          report this issue
        </InlineLink>
        .
      </div>
    </div>
  );
}
