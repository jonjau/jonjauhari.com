import "./globals.css";
import "@fontsource/iosevka";
import {
  FaBars,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaSquareFull,
  FaTimes,
} from "react-icons/fa";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import Link from "next/link";
import type { Metadata } from "next";
import React from "react";
import clsx from "clsx";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-source-serif",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-source-sans",
});

export const metadata: Metadata = {
  title: "jonjauhari.com",
  description: "Jonathan Jauhari's website",
};

const uiLinkClasses = [
  "border-b-4",
  "border-transparent",
  "hover:border-dotted",
  "hover:border-b-amber-700",
  "hover:text-amber-400",
  "focus:border-solid",
  "focus:border-b-amber-700",
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${sourceSerif.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-stone-900 text-amber-100">
        <Header />
        <main className="sm:flex sm:flex-auto sm:flex-col">
          <div className="mx-auto px-2 pt-20 sm:max-w-3xl sm:px-6 sm:pt-40">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}

const Header = () => (
  <header className="fixed left-0 right-0 z-10 sm:absolute">
    <nav
      className={clsx([
        "bg-stone-950",
        "p-4",
        "sm:bg-transparent",
        "sm:px-4",
        "sm:py-12",
      ])}
    >
      <div className="mx-auto flex items-center sm:max-w-6xl">
        <Link href="/" className={clsx("flex-0", ...uiLinkClasses)}>
          <div className="mb-1 flex justify-center">
            <span className="flex items-center justify-center">
              <FaSquareFull className="rounded-sm text-2xl text-[#197060]" />
            </span>
            <span className="mx-3 text-lg font-bold sm:text-2xl">
              Jonathan Jauhari
            </span>
          </div>
        </Link>
        <div className="flex flex-1 items-center justify-end">
          <NavLinks
            className={clsx([
              "hidden",
              "sm:block",
              "mx-2",
              "px-4",
              "my-1",
              "text-2xl",
              "font-bold",
              ...uiLinkClasses,
            ])}
          />
          <MobileNav />
        </div>
      </div>
    </nav>
  </header>
);

const NavLinks = ({ className }: { className: string }) =>
  [
    { linkText: "Blog", href: "/blog" },
    { linkText: "Projects", href: "/projects" },
    { linkText: "About", href: "/about" },
  ].map(({ linkText, href }) => (
    <Link key={href} href={href} className={className}>
      {linkText}
    </Link>
  ));

const MobileNav = () => (
  <div className="z-20 flex sm:hidden">
    <input type="checkbox" className="peer hidden" id="checkbox-toggle" />
    <label
      htmlFor="checkbox-toggle"
      className={clsx([
        "z-30",
        "block",
        "select-none",
        "text-3xl",
        "text-amber-200",
        "peer-checked:hidden",
      ])}
    >
      <FaBars />
    </label>
    <label
      htmlFor="checkbox-toggle"
      className={clsx([
        "z-30",
        "hidden",
        "select-none",
        "text-3xl",
        "text-amber-200",
        "peer-checked:block",
      ])}
    >
      <FaTimes />
    </label>
    <div
      className={clsx([
        "absolute",
        "top-0",
        "flex",
        "flex-col",
        "justify-center",
        "bg-black",
        "text-center",
        "-right-1/3",
        "w-1/3",
        "h-screen",
        "translate-x-0",
        "transition-transform",
        "peer-checked:-translate-x-full",
      ])}
    >
      <NavLinks
        className={clsx([
          "mx-2",
          "sm:block",
          "my-4",
          "px-1",
          "text-2xl",
          "font-bold",
          ...uiLinkClasses,
        ])}
      />
    </div>
  </div>
);

const Footer = () => (
  <footer className="mt-10">
    <div
      className={clsx([
        "mx-auto",
        "flex",
        "flex-col",
        "items-center",
        "pb-8",
        "sm:max-w-3xl",
        "sm:flex-row",
      ])}
    >
      <span className="inline-flex items-center">
        © {new Date().getFullYear()} Jonathan Jauhari
      </span>
      <div className="flex items-center justify-center sm:ml-auto">
        {[
          {
            linkIcon: <FaGithub />,
            title: "My GitHub profile",
            href: "https://github.com/jonjau",
          },
          {
            linkIcon: <FaLinkedin />,
            title: "My LinkedIn profile",
            href: "https://www.linkedin.com/in/jonathanjauhari/",
          },
          {
            linkIcon: <FaEnvelope />,
            title: "Send an email to my email address",
            href:
              "\u006d\u0061\u0069\u006c\u0074\u006f\u003a" +
              "%6A%6F%6E%63%6A%61%75%68%61%72%69%40%67%6D%61" +
              "%69%6C%2E%63%6F%6D",
          },
        ].map(({ linkIcon, title, href }) => (
          <Link
            key={href}
            title={title}
            href={href}
            className={clsx("p-2", "text-2xl", ...uiLinkClasses)}
          >
            {linkIcon}
          </Link>
        ))}
      </div>
    </div>
  </footer>
);
