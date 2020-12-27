import React from "react";
import { Post, TopicItem } from "./blogClient/types";
import PostTitle from "./PostTitle";
import Link from 'next/link';
import styles from '../styles/general.module.css';

export interface TopicAndFirstPost {
  topic: TopicItem
  post: Post
}

export default function TopicList({ topicsAndPosts }: {
  topicsAndPosts: TopicAndFirstPost[]
}) {
  return (
    <React.Fragment>
      {topicsAndPosts.map(({ topic, post }) => (
        <React.Fragment key={topic.slug}>
          <PostTitle title={topic.title} date={post.created_at} />
          <div dangerouslySetInnerHTML={{ __html: post.cooked.split('\n')[0] }} />
          <Link href={`/posts/${topic.slug}`}>
            <a>Continue reading</a>
          </Link>
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}