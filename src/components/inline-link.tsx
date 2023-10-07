import Link from "next/link";
import React from "react";
import clsx from "clsx";

export default function InlineLink({
  title,
  href,
  className = "",
  children,
}: {
  title: string;
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      title={title}
      href={href}
      className={
        clsx([
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
        ]) +
        " " +
        className
      }
    >
      {children}
    </Link>
  );
}
