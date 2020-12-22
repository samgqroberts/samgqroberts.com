import Head from 'next/head';
import { TopicAndFirstPost } from '../../scripts/TopicList';
import { blogClientFromEnvOrThrow } from '../../scripts/blogClient/BlogClient.factory';
import Content from '../../scripts/Content';
import Menu from '../../scripts/Menu';
import styles from '../../styles/general.module.css';
import PostTitle from '../../scripts/PostTitle';

export default function Post({ topicAndPost }: {
  topicAndPost: TopicAndFirstPost
}) {
  const { topic, post } = topicAndPost
  return (
    <div className={styles.container}>
      <Head>
        <title>Sam Roberts' personal website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu />
      <Content>
        <PostTitle title={topic.title} date={post.created_at} />
        <div dangerouslySetInnerHTML={{ __html: post.cooked }} />
      </Content>
    </div>
  )
}

export async function getStaticPaths() {
  const blogClient = blogClientFromEnvOrThrow();
  const slugs = await blogClient.getAllBlogPostSlugs();
  return {
    paths: slugs.map(slug => ({
      params: {
        slug,
      }
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const blogClient = blogClientFromEnvOrThrow();
  const topicAndPost = await blogClient.getTopicAndPostBySlug(params.slug);
  return {
    props: {
      topicAndPost
    }
  }
}