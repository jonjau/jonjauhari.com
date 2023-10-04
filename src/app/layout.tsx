import clsx from "clsx";
import "./globals.css";
import "@fontsource/iosevka";
import type { Metadata } from "next";
import { Source_Serif_4, Source_Sans_3 } from "next/font/google";
import Link from "next/link";
import { FaEnvelope, FaGithub, FaLinkedin, FaSquareFull } from "react-icons/fa";

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

// TODO: text selection bg change
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
      <body className="flex min-h-screen flex-col bg-stone-800 text-amber-100">
        <header className="absolute left-0 right-0 z-10">
          <nav className="px-4 py-12 md:bg-transparent">
            <div className="mx-auto flex max-w-6xl items-center">
              <Link href="/" className={clsx("flex-0", ...uiLinkClasses)}>
                <div className="flex justify-center">
                  <span className="flex items-center justify-center">
                    <FaSquareFull className="rounded-sm text-2xl text-[#197060]" />
                  </span>
                  <span className="mx-3 text-2xl font-bold ">
                    Jonathan Jauhari
                  </span>
                </div>
              </Link>
              <div className="flex flex-1 items-center justify-end">
                {[
                  { linkText: "Blog", href: "/blog" },
                  { linkText: "Projects", href: "/projects" },
                  { linkText: "About", href: "/about" },
                ].map(({ linkText, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className={clsx(
                      "mx-2",
                      "block",
                      "px-4",
                      "py-1",
                      "text-2xl",
                      "font-bold",
                      ...uiLinkClasses,
                    )}
                  >
                    {linkText}
                  </Link>
                ))}
              </div>
            </div>
          </nav>
        </header>
        <main className="flex flex-auto flex-col">
          <div className="mx-auto max-w-3xl px-6 pt-40">{children}</div>
        </main>
        <footer className="mt-8">
          <div className="mx-auto flex max-w-3xl pb-8">
            <span className="inline-flex items-center">
              © {new Date().getFullYear()} Jonathan Jauhari
            </span>
            <div className="ml-auto flex items-center justify-center">
              {[
                { linkIcon: <FaGithub />, href: "https://github.com/jonjau" },
                {
                  linkIcon: <FaLinkedin />,
                  href: "https://www.linkedin.com/in/jonathanjauhari/",
                },
                {
                  linkIcon: <FaEnvelope />,
                  href:
                    "\u006d\u0061\u0069\u006c\u0074\u006f\u003a" +
                    "%6A%6F%6E%63%6A%61%75%68%61%72%69%40%67%6D%61" +
                    "%69%6C%2E%63%6F%6D",
                },
              ].map(({ linkIcon, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={clsx("p-2", "text-2xl", ...uiLinkClasses)}
                >
                  {linkIcon}
                </Link>
              ))}
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
