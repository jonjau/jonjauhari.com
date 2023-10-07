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
      <h1 className="font-serif text-4xl/loose text-teal-600">Blog</h1>
      <p className="mb-8 text-lg">
        I sometimes write about programming and software development. The RSS
        feed for this blog is <Link href="/rss.xml">here</Link>.
      </p>
      <ol>
        {posts.map((post: BlogPost) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group">
              <article
                itemScope
                itemType="https://schema.org/BlogPosting"
                className={clsx(["my-6", "p-6", ...postLinkClasses])}
              >
                <header className="mb-4 font-serif">
                  <h2
                    itemProp="headline"
                    className="text-2xl/loose text-teal-600"
                  >
                    {post.title}
                  </h2>
                </header>
                <p itemProp="description">
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
