import { join } from "path";
import md from "markdown-it";
import shiki from "shiki";

export default async function markdownToHtml(markdown: string) {
  const theme = await shiki.loadTheme(
    join(process.cwd(), "src", "lib", "gruvbox-dark-hard.json"),
  );
  const highlighter = await shiki.getHighlighter({ theme });
  const markdownIt = md({
    highlight: (code, lang) => highlighter.codeToHtml(code, { lang }),
  })

  // Make images clickable to open in a new tab
  markdownIt.renderer.rules.image = function (tokens, idx) {
    const token = tokens[idx];
    const src = token.attrGet("src");
    const alt = token.content || "";

    return `<a href="${src}" target="_blank" rel="noopener noreferrer">
              <img src="${src}" alt="${alt}" />
            </a>`;
  };

  return markdownIt.render(markdown);
}
