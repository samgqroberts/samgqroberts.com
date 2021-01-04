import { GetStaticProps } from 'next';

import { blogClientFromEnvOrThrow } from '../scripts/blogClient/BlogClient.factory';
import Page from '../scripts/page/Page';
import TopicList, { TopicAndFirstPost } from '../scripts/TopicList';

const Home: React.FC<{
  topicsAndPosts: TopicAndFirstPost[];
}> = ({ topicsAndPosts }) => {
  return (
    <Page>
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
  return {
    props: {
      topicsAndPosts
    }
  };
};
