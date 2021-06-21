import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect, useRef } from 'react';

import { blogClientFromEnvOrThrow } from '../../scripts/blogClient/BlogClient.factory';
import Page from '../../scripts/page/Page';
import { getExcerpt, TopicAndFirstPost } from '../../scripts/TopicList';
import { stripHtml } from '../../scripts/util';
import { PageMeta } from '..';

function findHeaderElements(parent: HTMLDivElement): HTMLHeadingElement[] {
  const headings: HTMLHeadingElement[] = [];
  parent.childNodes.forEach((node) => {
    if (node instanceof HTMLHeadingElement) {
      headings.push(node);
    }
  });
  return headings;
}

function getHeadingSlug(heading: HTMLHeadingElement): string {
  let slug = '';
  const lowerCase = heading.textContent.toLowerCase();
  for (let i = 0; i < lowerCase.length; i++) {
    const char = lowerCase.charAt(i);
    if (char === ' ') {
      slug += '-';
    }
    if (char >= 'a' && char <= 'z') {
      slug += char;
    }
  }
  return slug;
}

function getPostUrl(topicSlug: string, headingSlug?: string): string {
  return `/posts/${topicSlug}#${headingSlug}`;
}

const Post: React.FC<{
  topicAndPost: TopicAndFirstPost;
}> = ({ topicAndPost }) => {
  const content = useRef<HTMLDivElement | null>(null);
  const { topic, post } = topicAndPost;
  const topicSlug = topic.slug;
  useEffect(() => {
    const hash = window.location.hash;
    findHeaderElements(content.current).forEach((node) => {
      const headingSlug = getHeadingSlug(node);
      node.setAttribute('id', getHeadingSlug(node));
      const anchor = document.createElement('a');
      anchor.textContent = '#';
      anchor.setAttribute('href', getPostUrl(topicSlug, headingSlug));
      anchor.setAttribute('class', 'heading-anchor');
      node.appendChild(anchor);
      if (hash && hash.substring(1) === headingSlug) {
        node.scrollIntoView();
      }
    });
  }, []);
  return (
    <Page>
      <PageMeta
        title={topic.title}
        description={stripHtml(getExcerpt(post))}
        url={getPostUrl(topic.slug)}
      />
      <div ref={content} dangerouslySetInnerHTML={{ __html: post.cooked }} />
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
