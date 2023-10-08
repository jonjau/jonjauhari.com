import React from "react";
import clsx from "clsx";

export function generateMetadata() {
  return {
    title: "About - Jonathan Jauhari",
  };
}

export default function About() {
  return (
    <article>
      <header>
        <h1
          className={clsx([
            "text-center",
            "font-serif",
            "text-2xl/loose",
            "text-teal-600",
            "sm:text-left",
            "sm:text-4xl/loose",
          ])}
        >
          About me
        </h1>
      </header>
      <p className="mb-4">
        I&apos;m a Melbourne-based software engineer interested in financial
        applications, currently developing for a leading investment platform in
        the UK.
      </p>
      <p className="mb-4">
        Recently, I&apos;ve been exploring full-stack web development, working
        with React on the front end and Spring Boot and Node.js on the server
        side. Of course, I&apos;m looking to gain more practical experience
        working with other technology stacks, mainly so I&apos;ll have more to
        write here...
      </p>
    </article>
  );
}
