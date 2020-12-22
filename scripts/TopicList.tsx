import React from "react";
import { Post, TopicItem } from "./blogClient/types";
import PostTitle from "./PostTitle";

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
        <React.Fragment>
          <PostTitle title={topic.title} date={post.created_at} />
          <div dangerouslySetInnerHTML={{ __html: post.cooked }} />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}