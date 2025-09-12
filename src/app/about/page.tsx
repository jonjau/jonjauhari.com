import InlineLink from "@/components/inline-link";
import { LetterJ } from "../svg";
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
      <div className="h-32 mx-auto">
        <LetterJ />
      </div>
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
        I&apos;m <span className="text-amber-200">Jonathan Jauhari</span>, a software developer based in Melbourne interested in financial applications.
      </p>
      <p className="mb-4">
        At <InlineLink
          title="IntegraDev website"
          href="https://integradev.com.au/"
        >
          IntegraDev
        </InlineLink>, I focus on expanding the capabilities of the <InlineLink
          title="Guided Applications"
          href="https://www.transact-online.co.uk/guided-applications/"
        >online onboarding feature</InlineLink> of
        the <InlineLink
          title="Transact website"
          href="https://www.transact-online.co.uk/"
        >Transact investment platform</InlineLink> — an industry-leading investment platform in the UK, owned by IntegraFin (<InlineLink
          title="LSE:IHP company page"
          href="https://www.londonstockexchange.com/stock/IHP/integrafin-holdings-plc/company-page"
        >LSE:IHP</InlineLink>).
      </p>
      <p className="mb-4">
        Beyond work, I run a homelab and self-host open source applications for my family and myself.
        Since making the jump to Linux, I&apos;ve developed an honest interest of the operations side of software development.
      </p>
      <p className="mb-4">
        I&apos;d like to gain professional experience with provisioning, monitoring and managing distributed applications on cloud platforms,
        and implementing automations in the software development process. Practice makes perfect,
        so once in a while I&apos;ll build a web application from scratch outside of work,
        and take the app all the way to public cloud deployment.</p>
      <p className="mb-4">
        I draw inspiration from the early days of computing, when software was simpler.
        Things were as breakable as they were fixable.
        Just as we are frugal with time and money... should we not be frugal also with complexity in software?
        Open, simple software is empowering and enduring.
      </p>
      <p className="mb-4">
        In the off-hours when I&apos;m not spending time with family and friends,
        I like to tinker with my home server, practice cooking dishes I&apos;d pay good money for, or play real-time strategy games.
      </p>
      <p className="mb-4">
        Sporadically, I read books (but more often Wikipedia!).
        I enjoy going down rabbit holes learning about world history, philosophy and language.
      </p>
      <p className="mb-4">
        I&apos;m always open to working on interesting software projects, so feel free to check out my           <InlineLink
          title="GitHub"
          href="https://github.com/jonjau"
        >
          GitHub
        </InlineLink>, <InlineLink
          title="LinkedIn"
          href="https://www.linkedin.com/in/jonjauhari"
        >
          LinkedIn
        </InlineLink>,
        or send me an email at <span className="text-amber-200">joncjauhari [at] gmail [dot] com</span>.
      </p>
    </article >
  );
}
