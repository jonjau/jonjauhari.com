# v3

Version 3 of my personal website. It's built with Next.js and Tailwind.
It should function without JavaScript enabled, hopefully!

- V2 was built with Gatsby and styled-components, deployed with Netlify.
- V1 was built with Hugo and plain CSS and Sass, deployed with GitHub Pages.

## Starting the development server

Next.js expects statically served images to be under `public/`, but I had my
images beside my markdown files for each post under `content/`. Since I'd like
to keep that structure, I wrote a prebuild script to just copy them over.

`npm run copyimages` would have to be re-run if the images added/removed.

To run the development server:

```bash
npm run dev
# or
yarn dev
```

It should be running on [http://localhost:3000](http://localhost:3000).
