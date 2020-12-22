import Head from 'next/head';
import { blogClientFromEnvOrThrow } from '../scripts/blogClient/BlogClient.factory';
import { TopicItem } from '../scripts/blogClient/types';
import Menu from '../scripts/Menu';
import Content from '../scripts/Content';
import styles from '../styles/general.module.css';
import TopicList, { TopicAndFirstPost } from '../scripts/TopicList';

export default function Home({ topicsAndPosts }: {
  topicsAndPosts: TopicAndFirstPost[]
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sam Roberts' personal website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu />
      <Content><TopicList {...{ topicsAndPosts }} /></Content>
    </div>
  )
}

export async function getStaticProps() {
  const blogClient = blogClientFromEnvOrThrow();
  const topics = (await blogClient.getBlogTopics()).valueOrThrow('Unable to get blog topics');
  const topicsAndPosts = await Promise.all(topics.map(topic => {
    return blogClient.getFirstPostForTopic(topic.id).then(post => ({ topic, post }))
  }));
  return {
    props: {
      topicsAndPosts,
    }
  }
}
