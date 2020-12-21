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
  tags?: string[] | undefined
}

export interface TopicList {
  topics: TopicItem[]
}

export interface CategoryResponse {
  topic_list: TopicList
}