import { get } from 'utils'

export const fetchBanners = () => get('/banners')
export const fetchTags = () => get('/tags')
export const fetchCategories = () => get('/categories')

export const fetchPhotos = (payload?: any) => get('/photos', payload)
export const fetchAlbums = (payload?: any) => get('/albums', payload)
export const search = (payload?: any) => get('/search', payload)
export const fetchAlbum = (id: string) => get('/albums/' + id)
export const fetchUser = (id: string) => get('/users/' + id)
export const fetchUserPhotos = (uId: string, payload?: any) =>
  get(`/users/${uId}/photos`, payload)
export const fetchUserAlbums = (uId: string, payload?: any) =>
  get(`/users/${uId}/albums`, payload)
