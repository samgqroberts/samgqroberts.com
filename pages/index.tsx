import fs from 'fs';
import { GetStaticProps } from 'next';
import Head from 'next/head';

import { blogClientFromEnvOrThrow } from '../scripts/blogClient/BlogClient.factory';
import Page from '../scripts/page/Page';
import { generateRss } from '../scripts/rss';
import TopicList, { TopicAndFirstPost } from '../scripts/TopicList';

export const PageTitle: React.FC = ({ children }) => (
  <Head>
    <title>{children} &middot; Sam Roberts</title>
  </Head>
);

const Home: React.FC<{
  topicsAndPosts: TopicAndFirstPost[];
}> = ({ topicsAndPosts }) => {
  return (
    <Page>
      <PageTitle>Home</PageTitle>
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
