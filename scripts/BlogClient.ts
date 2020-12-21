import Discourser from "discourser";
import { TopicItem } from "discourser/source/types";
import { maybe, Maybe, none, some } from "typescript-monads";

const BLOG_CATEGORY_NAME = 'blog';
const DISCOURSE_USERNAME = 'Sam';

export default class BlogClient {
  discourseClient: Discourser
  _blogCategoryId: Maybe<number> = none()

  constructor({ host, key }: { host: string, key: string }) {
    this.discourseClient = new Discourser({
      host,
      key,
      username: DISCOURSE_USERNAME,
    });
  }

  async getBlogCategoryId(): Promise<Maybe<number>> {
    const categories = await this.discourseClient.getCategories();
    const blogCategory = categories.find(b => b.name === BLOG_CATEGORY_NAME);
    return maybe(blogCategory?.id);
  }

  async blogCategoryId(): Promise<Maybe<number>> {
    if (this._blogCategoryId.isNone()) {
      this._blogCategoryId = await this.getBlogCategoryId();
    }
    return this._blogCategoryId;
  }

  getTopics(): Promise<Maybe<TopicItem[]>> {
    return this.blogCategoryId().then(MblogCategoryId => {
      if (MblogCategoryId.isSome()) {
        return this.discourseClient.getTopicItemsOfCategory(MblogCategoryId.valueOrThrow())
          .then(topics => some(topics));
      }
      return none<TopicItem[]>();
    });
  }
}