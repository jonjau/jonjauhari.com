import InlineLink from "@/components/inline-link";
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
        I&apos;m Jonathan Jauhari, a software developer based in Melbourne interested in financial applications.
      </p>
      <p className="mb-4">
        At <InlineLink
          title="IntegraDev website"
          href="https://integradev.com.au/"
        >
          IntegraDev
        </InlineLink>, I focus on expanding the capabilities of the online onboarding feature of
        the <InlineLink
          title="Transact website"
          href="https://www.transact-online.co.uk/"
        >Transact investment platform</InlineLink> — an industry leader in the UK.
      </p>
      <p className="mb-4">
        After setting up a Proxmox homelab and self-hosting open source applications for my family and myself,
        as well as switching to Linux, I&apos;ve developed an honest appreciation of the
        operations side of software development.
      </p>
      <p className="mb-4">
        I&apos;m eager to gain professional experience with provisioning, monitoring and managing distributed applications on cloud platforms,
        and implementing automations in the software development process.
      </p>
      <p className="mb-4">
        I draw inspiration from the early days of computing, when software was simpler.
        Things were as breakable as they were fixable.
        Just as we are frugal with time and money, should we not be frugal also with complexity in software?
        Open and simple software empowers users and endures the test of time.
      </p>
      <p className="mb-4">
        In my off-hours when I&apos;m not spending time with family and friends,
        I like to tinker with my home server, practice cooking dishes or play real-time strategy games.
      </p>
      <p className="mb-4">
        Sporadically, I read books (more often Wikipedia!).
        I enjoy going down rabbit holes learning about history, philosophy and language.
      </p>
    </article>
  );
}
