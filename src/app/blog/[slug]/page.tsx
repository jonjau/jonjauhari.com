import clsx from "clsx";
import { getBlogPostBySlug } from "../../../lib/api";
import markdownToHtml from "../../../lib/markdown-to-html";

//TODO: minutes to read, machine readable time, typography styling,
//TODO: back and forward links
export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = getBlogPostBySlug(params.slug);
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
          className={clsx(
            "max-w-none",
            "text-amber-100",
            "prose",
            "prose-lg",
            "prose-invert",
            "prose-stone",
            "prose-ol:max-w-prose",
            "prose-ol:mx-auto",
            "prose-ul:max-w-prose",
            "prose-ul:mx-auto",
            "prose-p:max-w-prose",
            "prose-p:mx-auto",
            "prose-blockquote:max-w-prose",
            "prose-blockquote:mx-auto",
            "prose-blockquote:text-amber-200",
            "prose-blockquote:border-l-amber-700",
            "prose-blockquote:border-l-4",
            "prose-headings:max-w-prose",
            "prose-headings:mx-auto",
            "prose-headings:text-teal-600",
            "prose-headings:font-normal",
            "prose-headings:font-serif",
            "prose-a:text-teal-600",
            "prose-a:decoration-dotted",
            "prose-a:underline-offset-4",
            "prose-a:decoration-2",
            "prose-a:decoration-teal-600",
            "hover:prose-a:decoration-amber-700",
            "hover:prose-a:text-teal-400",
            "focus:prose-a:decoration-solid",
            "focus:prose-a:decoration-amber-700",
            "focus:prose-a:text-teal-200",
            "prose-li:marker:text-amber-400",
            "prose-code:text-amber-200",
            "prose-code:font-normal",
            "prose-pre:mx-auto",
            "prose-strong:text-amber-200",
          )}
        />
      </article>
      <nav>||back and forward links||</nav>
    </>
  );
}
