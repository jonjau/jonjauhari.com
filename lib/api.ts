import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "content", "blog");

export type Post = {
  slug: string;
  title: string;
  date: Date;
  draft?: boolean;
  description: string;
  content: string;
};

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string): Post {
  const fullPath = join(postsDirectory, `${slug}/index.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: slug,
    title: data.title,
    date: data.date,
    draft: data.draft,
    description: data.description,
    content: content,
  };
}

export function getAllPosts() {
  return (
    getPostSlugs()
      .map((slug) => getPostBySlug(slug))
      // sort posts by date in descending order
      .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  );
}
