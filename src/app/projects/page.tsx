import { ProjectPost, getAllProjectPosts } from "../../lib/api";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import clsx from "clsx";
import { notFound } from "next/navigation";
import { postLinkClasses } from "@/components/styles";

export function generateMetadata() {
  return {
    title: "Projects - Jonathan Jauhari",
  };
}

export default async function Projects() {
  let posts;
  try {
    posts = await getAllProjectPosts();
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
        Projects
      </h1>
      <p className="text-md mb-4 sm:mb-8 sm:text-lg">
        Here I write about notable projects that I&apos;ve undertaken.
      </p>
      <ol>
        {posts.map((post: ProjectPost) => (
          <li key={post.slug}>
            <Link href={`/projects/${post.slug}`} className="group">
              <article
                itemScope
                itemType="https://schema.org/BlogPosting"
                className={clsx([
                  "flex",
                  "flex-col",
                  "sm:flex-row",
                  "items-center",
                  "justify-center",
                  "my-3",
                  "p-3",
                  "bg-stone-900",
                  "sm:bg-inherit",
                  "sm:my-6",
                  "sm:p-6",
                  ...postLinkClasses,
                ])}
              >
                <div className="mr-6 basis-2/5">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    width={200}
                    height={200}
                    className="rounded-sm "
                  />
                </div>
                <div className="basis-3/5">
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
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
