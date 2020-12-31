import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { blogClientFromEnvOrThrow } from '../../scripts/blogClient/BlogClient.factory';
import Content from '../../scripts/Content';
import Menu from '../../scripts/Menu';
import PostTitle from '../../scripts/PostTitle';
import { TopicAndFirstPost } from '../../scripts/TopicList';
import styles from '../../styles/general.module.css';

const Post: React.FC<{
  topicAndPost: TopicAndFirstPost;
}> = ({ topicAndPost }) => {
  const { topic, post } = topicAndPost;
  return (
    <div className={styles.container}>
      <Head>
        <title>Sam Roberts&apos; personal website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu />
      <Content>
        <PostTitle title={topic.title} date={post.created_at} />
        <div dangerouslySetInnerHTML={{ __html: post.cooked }} />
      </Content>
    </div>
  );
};
export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const blogClient = blogClientFromEnvOrThrow();
  const slugs = await blogClient.getAllBlogPostSlugs();
  return {
    paths: slugs.map((slug) => ({
      params: {
        slug
      }
    })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const blogClient = blogClientFromEnvOrThrow();
  const topicAndPost = await blogClient.getTopicAndPostBySlug(
    String(params.slug)
  );
  return {
    props: {
      topicAndPost
    }
  };
};
