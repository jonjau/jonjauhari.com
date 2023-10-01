import Link from "next/link";
import { Post, getAllPosts } from "../../../lib/api";

export default async function Blog() {
  const posts = await getAllPosts();
  return (
    <>
      <h1 className="font-serif text-4xl/loose">Blog</h1>
      <p className="mb-8 text-lg">
        I sometimes write about programming and software development. The RSS
        feed for this blog is <Link href="/rss.xml">here</Link>.
      </p>
      <ol>
        {posts.map((post: Post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <article
                itemScope
                itemType="https://schema.org/BlogPosting"
                className="my-6 rounded p-6"
              >
                <header className="mb-4 font-serif">
                  <h2 itemProp="headline" className="text-xl">
                    {post.title}
                  </h2>
                  <time itemProp="datePublished">
                    {post.date.toLocaleDateString("en-AU", {
                      dateStyle: "long",
                    })}
                  </time>
                </header>
                <p itemProp="description">{post.description}</p>
              </article>
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
