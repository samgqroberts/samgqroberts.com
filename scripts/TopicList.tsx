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

const TopicList: React.FC<{
  topicsAndPosts: TopicAndFirstPost[];
}> = ({ topicsAndPosts }) => {
  return (
    <>
      {topicsAndPosts.map(({ topic, post }) => (
        <React.Fragment key={topic.slug}>
          <PostTitle title={topic.title} date={post.created_at} useH1={false} />
          <div dangerouslySetInnerHTML={{ __html: getExcerpt(post) }} />
          <Link href={`/posts/${topic.slug}`}>
            <a>Continue reading</a>
          </Link>
        </React.Fragment>
      ))}
    </>
  );
};
export default TopicList;
