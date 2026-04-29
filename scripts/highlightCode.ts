import hljs from 'highlight.js';

const CODE_BLOCK_RE = /<pre([^>]*)><code([^>]*)>([\s\S]*?)<\/code><\/pre>/g;
const CLASS_ATTR_RE = /class="([^"]*)"/;
const LANG_CLASS_RE = /(?:^|\s)(?:lang|language)-([a-zA-Z0-9+#-]+)/;

function decodeEntities(html: string): string {
  return html
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
}

export function highlightCookedCode(cooked: string): string {
  return cooked.replace(
    CODE_BLOCK_RE,
    (full, preAttrs: string, codeAttrs: string, inner: string) => {
      const classMatch = codeAttrs.match(CLASS_ATTR_RE);
      if (!classMatch) return full;
      const langMatch = classMatch[1].match(LANG_CLASS_RE);
      if (!langMatch) return full;
      const lang = langMatch[1];
      if (!hljs.getLanguage(lang)) return full;
      // Skip blocks that have already been syntax-highlighted (e.g. by a
      // Discourse plugin) to avoid double-wrapping.
      if (inner.includes('class="hljs-')) return full;

      const highlighted = hljs.highlight(decodeEntities(inner), {
        language: lang,
        ignoreIllegals: true
      }).value;
      const newClass = classMatch[1].includes('hljs')
        ? classMatch[1]
        : `${classMatch[1]} hljs`;
      const newCodeAttrs = codeAttrs.replace(
        CLASS_ATTR_RE,
        `class="${newClass}"`
      );
      return `<pre${preAttrs}><code${newCodeAttrs}>${highlighted}</code></pre>`;
    }
  );
}
