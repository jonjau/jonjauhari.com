import Link from "next/link";
import { BlogPost, getAllBlogPosts } from "../../lib/api";
import clsx from "clsx";

const postLinkClasses = [
  "border-l-4",
  "border-transparent",
  "group-hover:border-dotted",
  "group-hover:border-amber-700",
  "group-hover:bg-stone-900",
  "group-focus:border-amber-700",
  "group-focus:border-solid",
];

// TODO: RSS feed, machine readable time value attributes
export default async function Blog() {
  const posts = await getAllBlogPosts();

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
