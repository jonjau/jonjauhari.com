import fs from "fs/promises";
import { join } from "path";
import matter from "gray-matter";

const blogPostsDir = join(process.cwd(), "content", "blog");
const projectPostsDir = join(process.cwd(), "content", "projects");

export type Post = {
  slug: string;
  title: string;
  date: Date;
  draft?: boolean;
  description: string;
  content: string;
};

export type BlogPost = Post;
export type ProjectPost = BlogPost & { thumbnail: string };

const getPostBySlug = async <T extends Post>(
  dir: string,
  slug: string,
  m: (file: matter.GrayMatterFile<string>) => T,
) => {
  const fullPath = join(dir, slug, "index.md");
  const fileContents = await fs.readFile(fullPath, "utf8");

  return m(matter(fileContents));
};

export function getBlogPostBySlug(slug: string): Promise<BlogPost> {
  return getPostBySlug(blogPostsDir, slug, ({ data: frontmatter, content }) => {
    return {
      slug: slug,
      title: frontmatter.title as string,
      date: frontmatter.date as Date,
      draft: frontmatter.draft as boolean,
      description: frontmatter.description as string,
      content: content,
    };
  });
}

export function getProjectPostBySlug(slug: string): Promise<ProjectPost> {
  return getPostBySlug(
    projectPostsDir,
    slug,
    ({ data: frontmatter, content }) => {
      const posixPath = `/images/projects/${slug}`;
      const inlineImageLinkRegex = /!\[([^[]+)\]\((.*)\)/gm;
      const contentWithStaticLinks = content.replace(
        inlineImageLinkRegex,
        `![$1](${posixPath}/$2)`,
      );

      return {
        slug: slug,
        title: frontmatter.title as string,
        date: frontmatter.date as Date,
        draft: frontmatter.draft as boolean,
        description: frontmatter.description as string,
        thumbnail: `${posixPath}/${frontmatter.featured}`,
        content: contentWithStaticLinks,
      };
    },
  );
}

const getAllPosts = async <T extends Post>(
  dir: string,
  getPostFromSlug: (slug: string) => Promise<T>,
) => {
  const slugs = await fs.readdir(dir);
  const posts = await Promise.all(
    slugs.map(async (slug) => getPostFromSlug(slug)),
  );
  return (
    posts
      // sort posts by date in descending order
      .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  );
};

export function getAllBlogPosts() {
  return getAllPosts(blogPostsDir, getBlogPostBySlug);
}

export function getAllProjectPosts() {
  return getAllPosts(projectPostsDir, getProjectPostBySlug);
}
