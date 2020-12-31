import Link from 'next/link';
import React from 'react';

import { Post, TopicItem } from './blogClient/types';
import PostTitle from './PostTitle';

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
          <PostTitle title={topic.title} date={post.created_at} />
          <div
            dangerouslySetInnerHTML={{ __html: post.cooked.split('\n')[0] }}
          />
          <Link href={`/posts/${topic.slug}`}>
            <a>Continue reading</a>
          </Link>
        </React.Fragment>
      ))}
    </>
  );
};
export default TopicList;
