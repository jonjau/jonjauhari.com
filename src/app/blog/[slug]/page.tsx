import clsx from "clsx";
import { getPostBySlug } from "../../../lib/api";
import markdownToHtml from "../../../lib/markdown-to-html";

//TODO: minutes to read, machine readable time, typography styling
export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  const content = await markdownToHtml(post.content);
  return (
    <>
      <article itemScope itemType="http://schema.org/BlogPosting">
        <header className="w-[65ch]">
          <h1
            itemProp="headline"
            className="mb-4 font-serif text-5xl text-teal-600"
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
            "prose",
            "prose-headings:text-teal-600",
            "prose-headings:font-normal",
            "prose-headings:font-serif",
            "prose-blockquote:text-amber-200",
            "prose-blockquote:border-l-amber-700",
            "prose-blockquote:border-l-4",
            "prose-lg",
            "prose-invert",
            "text-amber-100",
          )}
        />
      </article>
      <nav>back and forward links</nav>
    </>
  );
}

// "prose-p:max-w-prose",
// "flex",
// "flex-col",
// "items-center",
