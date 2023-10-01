import Link from "next/link";

export default function Blog() {
  return (
    <>
      <h1 className="font-serif text-4xl/loose">Blog</h1>
      <p className="mb-8 text-lg">
        I sometimes write about programming and software development. The RSS
        feed for this blog is <Link href="/rss.xml">here</Link>.
      </p>
      <ol>
        <article
          itemScope
          itemType="https://schema.org/BlogPosting"
          className="my-6 rounded p-6"
        >
          <header className="mb-4 font-serif">
            <h2 itemProp="headline" className="text-xl">
              First Post
            </h2>
            <time itemProp="datePublished">2345</time>
          </header>
          <p itemProp="description">First Post's description hello</p>
        </article>
      </ol>
    </>
  );
}
