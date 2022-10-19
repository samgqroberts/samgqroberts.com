import Link from 'next/link';
import React from 'react';

import { Post, TopicItem } from './blogClient/types';
import PostTitle from './PostTitle';

export function getExcerpt(post: Post): string {
  return post.cooked.split('\n')[0];
}

export interface TopicAndFirstPost {
  topic: TopicItem;
  post: Post;
}

export interface PostSummary {
  title: string;
  slug: string;
  created_at: string;
  excerpt: string;
}

const TopicList: React.FC<{
  posts: PostSummary[];
}> = ({ posts }) => {
  return (
    <>
      {posts.map((post) => (
        <React.Fragment key={post.slug}>
          <PostTitle title={post.title} date={post.created_at} useH1={false} />
          <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
          <Link href={`/posts/${post.slug}`}>
            <a>Continue reading</a>
          </Link>
        </React.Fragment>
      ))}
    </>
  );
};
export default TopicList;
