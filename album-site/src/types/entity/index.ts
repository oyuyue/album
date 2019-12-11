export interface Banner {
  id?: string
  url?: string
  imageUrl?: string
  desc?: string
}

export interface User {
  id?: string
  nickname?: string
  avatarUrl?: string
  gender?: number
  bio?: string
  photoCount?: number
  albumCount?: number
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
  id: string
  imageUrl: string
  title: string
  views: number
  stars: number
  createdTime?: number
  updatedTime?: number
  user?: User
  album?: Album
  tags?: Tag[]
}

export interface Album {
  id?: string
  imageUrl?: string
  title?: string
  createdTime?: number
  updatedTime?: number
  photoCount?: number
  categories?: Category[]
  photos?: Photo[]
  user?: User
}
