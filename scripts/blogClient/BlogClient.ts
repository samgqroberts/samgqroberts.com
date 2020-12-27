import { maybe, Maybe, none, some } from "typescript-monads";
import { TopicAndFirstPost } from "../TopicList";
import { CategoriesResponse, CategoryResponse, Post, TopicItem, TopicPostsResponse, TopicResponse } from "./types";

export default class BlogClient {
  readonly BLOG_CATEGORY_NAME = 'blog';
  readonly DISCOURSE_USERNAME = 'Sam';
  readonly DISCOURSE_ONLY_TAG = 'discourse-only';

  readonly JSON_HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  _blogCategoryId: Maybe<number> = none()

  host: string
  key: string

  constructor({ host, key }: { host: string, key: string }) {
    this.host = host;
    this.key = key;
  }

  get requestHeaders() {
    return {
      ...this.JSON_HEADERS,
      'Api-Key': this.key,
      'Api-Username': this.DISCOURSE_USERNAME,
    }
  }

  fetch<T>(url: string): Promise<T> {
    return fetch(`${this.host}/${url}`, { headers: this.requestHeaders })
      .then(response => response.json())
      .then(v => v as T);
  }

  async getBlogCategoryId(): Promise<Maybe<number>> {
    const categoriesResponse = await this.fetch<CategoriesResponse>('categories.json');
    const blogCategory = categoriesResponse.category_list.categories.find(b => b.name === this.BLOG_CATEGORY_NAME);
    return maybe(blogCategory?.id);
  }

  async blogCategoryId(): Promise<Maybe<number>> {
    if (this._blogCategoryId.isNone()) {
      this._blogCategoryId = await this.getBlogCategoryId();
    }
    return this._blogCategoryId;
  }

  getBlogTopics(): Promise<Maybe<TopicItem[]>> {
    return this.blogCategoryId().then(MblogCategoryId => {
      if (MblogCategoryId.isSome()) {
        return this.fetch<CategoryResponse>(`c/${MblogCategoryId.valueOrThrow()}.json`)
          .then(categoryResponse => categoryResponse.topic_list.topics)
          .then(topics => topics.filter(t => !t.tags?.includes(this.DISCOURSE_ONLY_TAG)))
          .then(topics => topics.sort((t1, t2) => t2.created_at.localeCompare(t1.created_at)))
          .then(topics => some(topics));
      }
      return none<TopicItem[]>();
    });
  }

  getFirstPostForTopic(topicId: number): Promise<Post> {
    return this.fetch<TopicPostsResponse>(`t/${topicId}/posts.json`)
      .then(r => r.post_stream.posts.find(p => p.post_number === 1))
  }

  getTopicAndPostBySlug(slug: string): Promise<TopicAndFirstPost> {
    return this.fetch<TopicResponse>(`t/${slug}.json`)
      .then(topic => ({
        topic,
        post: topic.post_stream.posts.find(p => p.post_number === 1)
      }))
  }

  async getAllBlogPostSlugs(): Promise<string[]> {
    const blogTopics = (await this.getBlogTopics()).valueOrThrow('Could not get blog topics')
    return blogTopics.map(t => t.slug);
  }
}