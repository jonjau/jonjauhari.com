import { join } from "path";
import md from "markdown-it";
import shiki from "shiki";

export default async function markdownToHtml(markdown: string) {
  const theme = await shiki.loadTheme(
    join(process.cwd(), "src", "lib", "gruvbox-dark-hard.json"),
  );
  const highlighter = await shiki.getHighlighter({ theme });
  return md({
    highlight: (code, lang) => highlighter.codeToHtml(code, { lang }),
  }).render(markdown);
}
