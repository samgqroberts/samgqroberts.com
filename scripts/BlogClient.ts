import Discourser from "discourser";
import { TopicItem } from "discourser/source/types";
import { maybe, Maybe, none, some } from "typescript-monads";

// TODO create issue against https://github.com/bevry/discourser to add "tags" field (may have been missing because tags were disable)
function getTagsOfTopic(topic: TopicItem): string[] {
  const tags = (topic as {tags?: string[]}).tags;
  if (tags === undefined) throw new Error(`Topic ${topic.slug} has no field 'tags'`);
  return tags;
}

export default class BlogClient {
  readonly BLOG_CATEGORY_NAME = 'blog';
  readonly DISCOURSE_USERNAME = 'Sam';
  readonly DISCOURSE_ONLY_TAG = 'discourse-only';

  discourseClient: Discourser
  _blogCategoryId: Maybe<number> = none()

  constructor({ host, key }: { host: string, key: string }) {
    this.discourseClient = new Discourser({
      host,
      key,
      username: this.DISCOURSE_USERNAME,
    });
  }

  async getBlogCategoryId(): Promise<Maybe<number>> {
    const categories = await this.discourseClient.getCategories();
    const blogCategory = categories.find(b => b.name === this.BLOG_CATEGORY_NAME);
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
        return this.discourseClient.getTopicItemsOfCategory(MblogCategoryId.valueOrThrow())
          .then(topics => topics.filter(t => !getTagsOfTopic(t).includes(this.DISCOURSE_ONLY_TAG)))
          .then(topics => some(topics));
      }
      return none<TopicItem[]>();
    });
  }
}