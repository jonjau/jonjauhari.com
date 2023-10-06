import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import BlogPost from "@/app/blog/[slug]/page";

const blogPostsDir = join(process.cwd(), "content", "blog");
const projectPostsDir = join(process.cwd(), "content", "projects");

export type BlogPost = {
  slug: string;
  title: string;
  date: Date;
  draft?: boolean;
  description: string;
  content: string;
};

export type ProjectPost = BlogPost & { thumbnail: string };

const getPostBySlug = <T>(
  dir: string,
  slug: string,
  m: (file: matter.GrayMatterFile<string>) => T,
): T => {
  const fullPath = join(dir, slug, "index.md");
  const fileContents = fs.readFileSync(fullPath, "utf8");

  return m(matter(fileContents));
};

export function getBlogPostBySlug(slug: string): BlogPost {
  return getPostBySlug(blogPostsDir, slug, ({ data: frontmatter, content }) => {
    return {
      slug: slug,
      title: frontmatter.title,
      date: frontmatter.date,
      draft: frontmatter.draft,
      description: frontmatter.description,
      content: content,
    };
  });
}

export function getProjectPostBySlug(slug: string): ProjectPost {
  return getPostBySlug(
    projectPostsDir,
    slug,
    ({ data: frontmatter, content }) => {
      const posixPath = `/images/projects/${slug}`;
      const inlineImageLinkRegex = /\!\[([^\[]+)\]\((.*)\)/gm;
      const contentWithStaticLinks = content.replace(
        inlineImageLinkRegex,
        `![$1](${posixPath}/$2)`,
      );

      return {
        slug: slug,
        title: frontmatter.title,
        date: frontmatter.date,
        draft: frontmatter.draft,
        description: frontmatter.description,
        thumbnail: `${posixPath}/${frontmatter.featured}`,
        content: contentWithStaticLinks,
      };
    },
  );
}

const getAllPosts = <T extends { date: Date }>(
  dir: string,
  postGetter: (slug: string) => T,
) =>
  fs
    .readdirSync(dir)
    .map((slug) => postGetter(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));

export function getAllBlogPosts() {
  return getAllPosts(blogPostsDir, getBlogPostBySlug);
}

export function getAllProjectPosts() {
  return getAllPosts(projectPostsDir, getProjectPostBySlug);
}
