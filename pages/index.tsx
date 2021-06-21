import fs from 'fs';
import { GetStaticProps } from 'next';
import Head from 'next/head';

import { blogClientFromEnvOrThrow } from '../scripts/blogClient/BlogClient.factory';
import Page from '../scripts/page/Page';
import { generateRss, siteUrl } from '../scripts/rss';
import TopicList, { TopicAndFirstPost } from '../scripts/TopicList';

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
  </Head>
);

const Home: React.FC<{
  topicsAndPosts: TopicAndFirstPost[];
}> = ({ topicsAndPosts }) => {
  return (
    <Page>
      <PageMeta
        title="Home"
        description="Sam Roberts' personal website"
        url={siteUrl}
      />
      <TopicList {...{ topicsAndPosts }} />
    </Page>
  );
};
export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const blogClient = blogClientFromEnvOrThrow();
  const topics = (await blogClient.getBlogTopics()).valueOrThrow(
    'Unable to get blog topics'
  );
  const topicsAndPosts = await Promise.all(
    topics.map((topic) => {
      return blogClient
        .getFirstPostForTopic(topic.id)
        .then((post) => ({ topic, post }));
    })
  );

  // write rss file
  const rss = await generateRss(topicsAndPosts);
  fs.writeFileSync('./public/feed.xml', rss);

  return {
    props: {
      topicsAndPosts
    }
  };
};
