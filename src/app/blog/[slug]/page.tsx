import { getPostBySlug } from "../../../../lib/api";
import markdownToHtml from "../../../../lib/markdown-to-html";

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
      <article
        itemScope
        itemType="http://schema.org/BlogPosting"
        className="prose prose-invert"
      >
        <header className="font-serif text-lg">
          <h1 itemProp="headline">{post.title}</h1>
          <p>
            <time itemProp="datePublished">
              {post.date.toLocaleDateString("en-AU", {
                dateStyle: "long",
              })}
            </time>
          </p>
        </header>
        <div
          itemProp="articleBody"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
      <nav>back and forward links</nav>
    </>
  );
}
