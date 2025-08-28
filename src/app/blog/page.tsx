import { BlogPost, getAllBlogPosts } from "../../lib/api";
import Link from "next/link";
import React from "react";
import clsx from "clsx";
import { notFound } from "next/navigation";
import { postLinkClasses } from "@/components/styles";

export function generateMetadata() {
  return {
    title: "Blog - Jonathan Jauhari",
  };
}

export default async function Blog() {
  let posts;
  try {
    posts = await getAllBlogPosts();
  } catch {
    notFound();
  }

  return (
    <>
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
        Blog
      </h1>
      <p className="text-md mb-4 sm:mb-8 sm:text-lg text-center sm:text-left">
        I sometimes write about software development.
      </p>
      <ol>
        {posts.map((post: BlogPost) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group">
              <article
                itemScope
                itemType="https://schema.org/BlogPosting"
                className={clsx([
                  "my-2",
                  "p-3",
                  "bg-stone-950",
                  "sm:bg-inherit",
                  ...postLinkClasses,
                ])}
              >
                <header className="my-2 font-serif sm:mb-2 flex flex-col sm:flex-row items-start sm:items-center text-sm sm:text-xl">
                  <time itemProp="datePublished" className="text-amber-200 pr-5">
                    {post.date.toISOString().split('T')[0]}
                  </time>
                  <h2
                    itemProp="headline"
                    className="text-teal-600"
                  >
                    {post.title}
                  </h2>
                </header>
              </article>
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
