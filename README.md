# jonjauhari.com v4

A Hugo port of the Next.js version of this site. No JavaScript, no Node, no
build step beyond the `hugo` binary itself.

```sh
hugo server    # http://localhost:1313
hugo           # build to ./public
```

Either the standard or extended binary works.
There is no Sass, so the extended build is not required.

### Requirements

- **Hugo ≥ 0.158.0** — the site uses the new template scheme (0.146+) and
  `.Site.Language.Locale` (0.158+).

