import Head from 'next/head';
import { blogClientFromEnvOrThrow } from '../scripts/blogClient/BlogClient.factory';
import { TopicItem } from '../scripts/blogClient/types';
import Menu from '../scripts/Menu';
import Content from '../scripts/Content';
import styles from '../styles/general.module.css';

export default function Home({ topics }: {
  topics: TopicItem[]
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sam Roberts' personal website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu />
      <Content />
    </div>
  )
}

export async function getStaticProps() {
  const blogClient = blogClientFromEnvOrThrow();
  const topics = (await blogClient.getBlogTopics()).valueOrThrow('Unable to get blog topics');
  return {
    props: {
      topics,
    }
  }
}
