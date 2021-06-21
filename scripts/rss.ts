import { siteTitle } from '../pages/_document';
import { getExcerpt, TopicAndFirstPost } from './TopicList';
import { stripHtml } from './util';

export const siteUrl = 'https://samgqroberts.com';

export function generateRssItem({ topic, post }: TopicAndFirstPost): string {
  const url = `${siteUrl}/posts/${topic.slug}`;
  const title = topic.title;
  const excerpt = stripHtml(getExcerpt(post));
  const content = post.cooked;
  const pubDate = new Date(topic.created_at).toUTCString();

  return `
    <item>
      <guid isPermaLink="true">${url}</guid>
      <title>${title}</title>
      <description>${excerpt}</description>
      <link>${url}</link>
      <pubDate>${pubDate}</pubDate>
      <content:encoded><![CDATA[${content}]]></content:encoded>
    </item>
  `;
}

export async function generateRss(
  topicsAndPosts: TopicAndFirstPost[]
): Promise<string> {
  const itemsList = topicsAndPosts.map(generateRssItem);
  const lastBuildDate = new Date(
    topicsAndPosts.sort((a, b) =>
      b.post.updated_at.localeCompare(a.post.updated_at)
    )[0].post.updated_at
  ).toUTCString();

  return `
    <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/" version="2.0">
      <channel>
        <title>${siteTitle}</title>
        <description>${siteTitle}</description>
        <link>${siteUrl}</link>
        <language>en</language>
        <lastBuildDate>${lastBuildDate}</lastBuildDate>
        <atom:link href="${siteUrl}" rel="self" type="application/rss+xml" />
        ${itemsList.join('')}
      </channel>
    </rss>
  `;
}
