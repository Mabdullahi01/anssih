export type FaqQAndAType = {
  id: string
  answer: string
  question: string
}
export type FaqType = {
  id: string
  category: string
  title: string
  qandAs: FaqQAndAType[]
}

export type Post = {
  id: number
  title: string
  post: string
  username: string
  userImageUrl: string
  likes: number
}
export type Posts = {
  posts: Post[]
}

export type Announcement = {
  id: number
  title: string
  announcement: string
}
export type Announcements = {
  announcements: Announcement[]
}
