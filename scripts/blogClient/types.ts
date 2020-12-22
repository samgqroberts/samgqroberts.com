/**
 * These types are INCOMPLETE! They only have what is necessary for this application to run.
 */

export interface Category {
  id: number
  name: string
  slug: string
}

export interface CategoryList {
  categories: Category[]
}

export interface CategoriesResponse {
  category_list: CategoryList
}

export interface TopicItem {
  id: number
  title: string
  slug: string
  created_at: string
  tags?: string[] | undefined
}

export interface TopicResponse {
  post_stream: PostStream
  id: number
  title: string
  created_at: string
  slug: string
  tags?: string[] | undefined
}

export interface TopicList {
  topics: TopicItem[]
}

export interface CategoryResponse {
  topic_list: TopicList
}

export interface Post {
  id: number
  name: string
  username: string
  created_at: string
  updated_at: string
  cooked: string
  post_number: number
}

export interface PostStream {
  posts: Post[]
}

export interface TopicPostsResponse {
  post_stream: PostStream
}