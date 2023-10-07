import { BlogPost, getAllBlogPosts } from "../../lib/api";
import InlineLink from "@/components/inline-link";
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

// TODO: RSS feed, machine readable time value attributes
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
      <p className="text-md mb-4 sm:mb-8 sm:text-lg">
        I sometimes write about programming and software development. The RSS
        feed for this blog is{" "}
        <InlineLink title="RSS feed of blog posts" href="/rss.xml">
          here
        </InlineLink>
        .
      </p>
      <ol>
        {posts.map((post: BlogPost) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group">
              <article
                itemScope
                itemType="https://schema.org/BlogPosting"
                className={clsx([
                  "my-3",
                  "p-3",
                  "bg-stone-900",
                  "sm:bg-inherit",
                  "sm:my-6",
                  "sm:p-6",
                  ...postLinkClasses,
                ])}
              >
                <header className="my-2 font-serif sm:mb-4">
                  <h2
                    itemProp="headline"
                    className="text-md/loose text-teal-600 sm:text-2xl/loose"
                  >
                    {post.title}
                  </h2>
                </header>
                <p itemProp="description" className="sm:text-md text-sm">
                  {" "}
                  <time itemProp="datePublished" className="text-amber-200">
                    {post.date.toLocaleDateString("en-AU", {
                      dateStyle: "long",
                    })}
                  </time>{" "}
                  — {post.description}
                </p>
              </article>
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
