import fs from 'fs';
import { GetStaticProps } from 'next';
import Head from 'next/head';

import { blogClientFromEnvOrThrow } from '../scripts/blogClient/BlogClient.factory';
import Page from '../scripts/page/Page';
import { generateRss, siteUrl } from '../scripts/rss';
import TopicList, { getExcerpt, PostSummary } from '../scripts/TopicList';

export const PageMeta: React.FC<{
  title: string;
  description: string;
  url: string;
}> = ({ title, description, url }) => (
  <Head>
    <title>{title} &middot; Sam Roberts</title>
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={url} />
    <meta property="og:image" content="/headshot.png" />
    <meta name="description" content={description} />
  </Head>
);

const Home: React.FC<{
  posts: PostSummary[];
}> = ({ posts }) => {
  // NB samgqroberts 2022-08-18 for whatever reason the ordering gets lost by here, need to sort again
  posts.sort((t1, t2) => t2.created_at.localeCompare(t1.created_at));
  return (
    <Page>
      <PageMeta
        title="Home"
        description="Sam Roberts' personal website"
        url={siteUrl}
      />
      <TopicList {...{ posts }} />
    </Page>
  );
};
export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const blogClient = blogClientFromEnvOrThrow();
  const topics = (await blogClient.getBlogTopics()).valueOrThrow(
    'Unable to get blog topics'
  );
  const topicsAndPosts = (
    await Promise.all(
      topics.map((topic) => {
        return blogClient
          .getFirstPostForTopic(topic.id)
          .then((post) => ({ topic, post }));
      })
    )
  ).sort((t1, t2) => t2.topic.created_at.localeCompare(t1.topic.created_at));

  // write rss file
  const rss = await generateRss(topicsAndPosts);
  fs.writeFileSync('./public/feed.xml', rss);

  // condense
  const posts: PostSummary[] = topicsAndPosts.map(({ topic, post }) => {
    return {
      title: topic.title,
      slug: topic.slug,
      created_at: post.created_at,
      excerpt: getExcerpt(post)
    };
  });

  return {
    props: {
      posts
    }
  };
};
