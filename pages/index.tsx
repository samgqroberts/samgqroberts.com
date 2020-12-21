import { TopicItem } from 'discourser/source/types';
import Head from 'next/head';
import { blogClientFromEnvOrThrow } from '../scripts/BlogClient.factory';
import styles from '../styles/Home.module.css';

export default function Home({ topics }: {
  topics: TopicItem[]
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sam Roberts' personal website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {JSON.stringify(topics)}
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
