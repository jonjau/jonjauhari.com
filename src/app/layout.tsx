import "./globals.css";
import type { Metadata } from "next";
import { Source_Serif_4, Source_Sans_3 } from "next/font/google";
import Link from "next/link";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
});

export const metadata: Metadata = {
  title: "jonjauhari.com",
  description: "Jonathan Jauhari's website",
};

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
              <Link href="/" className="flex-0">
                <div className="flex">
                  <span className="flex items-center justify-center"></span>
                  <span className="mx-3 text-2xl ">Jonathan Jauhari</span>
                </div>
              </Link>
              <div className="flex flex-1 items-center justify-end">
                <Link href="/blog" className="mx-2 block px-4 py-1 text-2xl">
                  Blog
                </Link>
                <Link
                  href="/projects"
                  className="mx-2 block px-4 py-1 text-2xl"
                >
                  Projects
                </Link>
                <Link href="/about" className="mx-2 block px-4 py-1 text-2xl">
                  About
                </Link>
              </div>
            </div>
          </nav>
        </header>
        <main className="flex flex-auto">
          <div className=" mx-auto  max-w-3xl px-6 pt-40">{children}</div>
        </main>
        <footer className="mt-8">
          <div className="mx-auto flex max-w-3xl pb-8">
            <span>© {new Date().getFullYear()} Jonathan Jauhari</span>
            <div className="ml-auto flex items-center justify-center">
              <Link href="www.google.com">links</Link>
              <Link href="www.google.com">links</Link>
              <Link href="www.google.com">links</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
