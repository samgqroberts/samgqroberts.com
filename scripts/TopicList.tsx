import React from "react";
import { Post, TopicItem } from "./blogClient/types";

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
          <h1>{topic.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.cooked }} />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
}