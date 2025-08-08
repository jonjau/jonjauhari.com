import { getAllBlogPosts, getBlogPostBySlug } from "../../../lib/api";
import type { BlogPost } from "../../../lib/api";
import React from "react";
import clsx from "clsx";
import markdownToHtml from "../../../lib/markdown-to-html";
import { notFound } from "next/navigation";
import { proseClasses } from "@/components/styles";

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;
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

export default async function BlogPost(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;
  let post;
  try {
    post = await getBlogPostBySlug(params.slug);
  } catch {
    notFound();
  }
  const content = await markdownToHtml(post.content);

  return (
    <>
      <article itemScope itemType="http://schema.org/BlogPosting">
        <header>
          <h1
            itemProp="headline"
            className="mb-4 font-serif text-2xl text-teal-600 sm:text-4xl"
          >
            {post.title}
          </h1>
          <time
            itemProp="datePublished"
            className="mb-4 block text-amber-200"
            dateTime={post.date.toISOString()}
          >
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
    </>
  );
}
