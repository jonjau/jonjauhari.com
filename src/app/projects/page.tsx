import Link from "next/link";
import Image from "next/image";
import { ProjectPost, getAllProjectPosts } from "../../lib/api";
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

export function generateMetadata() {
  return {
    title: "Projects - Jonathan Jauhari",
  };
}

export default async function Projects() {
  const posts = await getAllProjectPosts();

  return (
    <>
      <h1 className="font-serif text-4xl/loose text-teal-600">Projects</h1>
      <p className="mb-8 text-lg">
        Here I write about notable projects that I've undertaken.
      </p>
      <ol>
        {posts.map((post: ProjectPost) => (
          <li key={post.slug}>
            <Link href={`/projects/${post.slug}`} className="group">
              <article
                itemScope
                itemType="https://schema.org/BlogPosting"
                className={clsx([
                  "my-6",
                  "p-6",
                  "flex",
                  "items-center",
                  ...postLinkClasses,
                ])}
              >
                <div className="mr-6 basis-2/5">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    width={500}
                    height={500}
                    className="rounded-sm "
                  />
                </div>
                <div className="basis-3/5">
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
                </div>
              </article>
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
