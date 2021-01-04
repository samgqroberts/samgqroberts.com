import { GetStaticPaths, GetStaticProps } from 'next';

import { blogClientFromEnvOrThrow } from '../../scripts/blogClient/BlogClient.factory';
import Page from '../../scripts/page/Page';
import PostTitle from '../../scripts/PostTitle';
import { TopicAndFirstPost } from '../../scripts/TopicList';

const Post: React.FC<{
  topicAndPost: TopicAndFirstPost;
}> = ({ topicAndPost }) => {
  const { topic, post } = topicAndPost;
  return (
    <Page>
      <PostTitle title={topic.title} date={post.created_at} />
      <div dangerouslySetInnerHTML={{ __html: post.cooked }} />
    </Page>
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
