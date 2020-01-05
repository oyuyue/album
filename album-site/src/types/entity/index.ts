export interface Banner {
  id?: string
  url?: string
  imageUrl?: string
  desc?: string
}

export enum Gender {
  UNKNOWN = 'UNKNOWN',
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}
export interface User {
  id?: string
  email?: string
  username?: string
  nickname?: string
  avatarUrl?: string
  bannerUrl?: string
  gender?: Gender
  bio?: string
  joinedAt?: string
  photoCount?: number
  albumCount?: number
  likeCount?: number
  viewedCount?: number
  likedCount?: number
}

export interface Tag {
  id?: string
  name?: string
  imageUrl?: string
}

export interface Category {
  id?: string
  name?: string
  imageUrl?: string
}

export interface Photo {
  id?: string
  personal?: boolean
  photoId?: string
  imageUrl?: string
  title?: string
  views?: number
  stars?: number
  createdTime?: number
  updatedTime?: number
  user?: User
  tags?: Tag[]
}
