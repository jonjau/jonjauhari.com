import React from "react";
import { Link, graphql, PageProps } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

import { ThemeProvider } from "styled-components";
import theme from "../common/theme";
import { MarkdownRemarkNode } from "../common/types";
import PostListItem from "../components/post-list-item";

const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/blog/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`;

interface Props extends PageProps {
  data: {
    allMarkdownRemark: {
      nodes: MarkdownRemarkNode[];
    };
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
}

// TODO: compact/archive view
const Blog = ({ data, location }: Props) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const posts = data.allMarkdownRemark.nodes;

  return (
    <ThemeProvider theme={theme}>
      <Layout location={location} title={siteTitle}>
        <SEO title="Blog" />
        <ol style={{ listStyle: `none` }}>
          {posts.map((post: MarkdownRemarkNode) => (
            <li key={post.fields.slug}>
              <Link to={`/blog${post.fields.slug}`} itemProp="url">
                <PostListItem post={post} />
              </Link>
            </li>
          ))}
        </ol>
      </Layout>
    </ThemeProvider>
  );
};

export { Blog as default, pageQuery };