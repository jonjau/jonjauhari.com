# jonjauhari.com — Hugo

A Hugo port of the Next.js version of this site. No JavaScript, no Node, no
build step beyond the `hugo` binary itself.

```sh
hugo server    # http://localhost:1313
hugo           # build to ./public
```

Either the standard or extended binary works — there is no Sass, so the
extended build is not required.

### Layout paths

Hugo 0.146 introduced a new template scheme (`layouts/single.html`,
`layouts/_partials/`, `layouts/home.html`) and kept the older
`layouts/_default/` + `layouts/partials/` paths working for compatibility.
This site deliberately uses the **older** scheme: it resolves on both old and
new Hugo, whereas the new scheme fails on anything before 0.146. If a future
release drops the compatibility shim, move everything out of `_default/` up
one level, rename `partials/` → `_partials/` and `index.html` → `home.html`.

## Design

Dark, book-set, deliberately plain. Ink-and-parchment palette with a single
accent, all in custom properties at the top of `assets/css/main.css`:

| Token      | Value     | Use                        | Contrast on `--bg` |
| ---------- | --------- | -------------------------- | ------------------ |
| `--bg`     | `#14110f` | page background            | —                  |
| `--text`   | `#e8e0d0` | body text                  | 14.33:1            |
| `--dim`    | `#9c9184` | captions, dates, underlines | 6.09:1            |
| `--rule`   | `#5a4f42` | decorative hairlines only  | 2.36:1             |
| `--accent` | `#c98a3c` | headings, links on hover   | 6.43:1             |

`--rule` is below the 3:1 non-text threshold, so it is used only where nothing
depends on seeing it. Link underlines and heading anchors use `--dim`.

Typography is a system serif stack for now — Libre Baskerville is named first,
so it is used where already installed locally. Self-hosting it is outstanding
work (see below). Monospace is the system stack; no Iosevka.

Book-setting details: a drop cap on the first paragraph of each blog post
(`::first-letter`, no markup — so copy-paste and screen readers are unaffected),
small-caps letterspaced bylines, figures numbered by CSS counter, and a
`34rem` measure on prose.

Syntax highlighting is Chroma at build time, styled near-monochrome: bold
keywords, dim italic comments, accent-coloured strings and numbers. There are
35 fenced blocks across Haskell, Java, Prolog, Kotlin and plain text.

## No JavaScript

There is none, anywhere. The original's only interactive element was a mobile
nav built from a CSS checkbox hack; with three links that fit on a 320px
screen, this port just renders them inline and deletes the mechanism.

Fast navigation without JS comes from three things: a background colour set on
`:root` plus `color-scheme: dark` (so there is no white flash before CSS
applies), `rel=prefetch` hints to the next likely pages, and a single
fingerprinted stylesheet. `@view-transition { navigation: auto }` is included
as a progressive enhancement — it is Chromium-only and the browser disables it
under `prefers-reduced-motion`, so it is not load-bearing.

## Differences from the Next.js version

- **Page bundles.** Images live beside their `index.md`. This deletes
  `copy-images.mjs` and the 91MB `content/` → `public/` duplication.
- **SVGs removed.** The four potrace woodcuts are gone; the largest was 59KB
  gzipped on the homepage alone.
- **Homepage lists recent posts.** With the goat illustration gone the page was
  four sentences, so it now shows the five newest posts.
- **Thumbnails are resized at build time** to 250×180 (500×360 for 2×). The
  projects list was previously serving originals — including a 3.2MB PNG.
- **Figures have captions.** Alt text is now also rendered as a `<figcaption>`;
  it already read like caption prose.
- **Headings have anchors.** A `¶` link, visible on hover and keyboard focus.
- **Drafts are honoured.** Hugo hides `draft: true` by default; the Next.js
  version read the field but never filtered on it. Nothing is currently
  marked draft, so output is unchanged.
- **Added** RSS, per-page Open Graph/Twitter meta, and a sitemap. schema.org
  `BlogPosting` microdata is carried over.
- **Fixed** the broken `justice-as-promoting-virtue` link (the real slug is
  `justice-as-cultivating-virtue`), and made the sibling `justice-as-*` links
  absolute so they resolve under Hugo's trailing-slash URLs.

## Outstanding work

- **Nothing here has been built.** Hugo is not installed on this machine, so
  every template is unverified. Expect a round of fixes on the first
  `hugo server`. The riskiest parts are the image render hook and
  `.Fill` on the project thumbnails; both fail loudly rather than silently.
- **`laymans-quest` ships 68MB of GIFs** — `cave_interact_objects.gif` is
  43MB, `leaf.gif` 20MB, `enemyShader.gif` 6.8MB, all 600×338. They are lazy
  loaded with explicit dimensions, so they do not block rendering, but they
  should be converted to MP4/WebM. That needs `ffmpeg`, which is not installed
  here. `portvis/demo.gif` (817KB) is the same story.
- **`redstone-calculators` has 12MB of PNGs**, up to 3.2MB each. Worth running
  through a lossless optimiser, or converting to WebP/AVIF.
- **Self-host Libre Baskerville.** Add a `@font-face` block with woff2 files
  in `static/fonts/` and put the family first in `--serif`. Preload the
  regular weight.
- `favicon.ico` was copied from the Next.js app. `profile-pic.jpg` was not —
  it was referenced nowhere.

## Licence

Content under `content/` is CC BY-NC-ND 4.0, as in the original.
