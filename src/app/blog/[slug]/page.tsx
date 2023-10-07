import { BlogPost, getAllBlogPosts, getBlogPostBySlug } from "../../../lib/api";
import React from "react";
import clsx from "clsx";
import markdownToHtml from "../../../lib/markdown-to-html";
import { notFound } from "next/navigation";
import { proseClasses } from "@/components/styles";

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  let post;
  try {
    post = await getBlogPostBySlug(params.slug);
  } catch {
    notFound();
  }

  return {
    title: `${post.title} - Jonathan Jauhari`,
  };
}

//TODO: minutes to read, machine readable time, typography styling,
//TODO: back and forward links
export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  let post;
  try {
    post = await getBlogPostBySlug(params.slug);
  } catch {
    notFound();
  }
  const content = await markdownToHtml(post.content);

  return (
    <>
      <article
        itemScope
        itemType="http://schema.org/BlogPosting"
        className="flex flex-col items-center"
      >
        <header className="">
          <h1
            itemProp="headline"
            className="mb-4 font-serif text-4xl text-teal-600"
          >
            {post.title}
          </h1>
          <time itemProp="datePublished" className="mb-4 block text-amber-200">
            {post.date.toLocaleDateString("en-AU", {
              dateStyle: "long",
            })}
          </time>
          <hr className="mb-4 h-1 border-0 bg-amber-700" />
        </header>
        <div
          itemProp="articleBody"
          dangerouslySetInnerHTML={{ __html: content }}
          className={clsx(proseClasses)}
        />
      </article>
      <nav>||back and forward links||</nav>
    </>
  );
}
