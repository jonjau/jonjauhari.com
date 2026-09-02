# jonjauhari.com v4

Version 4 of my personal website. It's built with Hugo and plain CSS
deployed with Cloudflare Pages. It has 0 javascript.

- V3 was built with Next.js and Tailwind, deployed with Vercel
- V2 was built with Gatsby and styled-components, deployed with Netlify.
- V1 was built with Hugo and plain CSS and Sass, deployed with GitHub Pages.

```sh
hugo server    # http://localhost:1313
hugo           # build to ./public
```

Either the standard or extended binary works.
There is no Sass, so the extended build is not required.

### Requirements

- **Hugo ≥ 0.158.0** — the site uses the new template scheme (0.146+) and
  `.Site.Language.Locale` (0.158+).

