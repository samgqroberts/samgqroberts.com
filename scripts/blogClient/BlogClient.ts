import { maybe, Maybe, none, some } from "typescript-monads";
import { CategoriesResponse, CategoryResponse, TopicItem } from "./types";

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
          .then(topics => some(topics));
      }
      return none<TopicItem[]>();
    });
  }
}