import { get, post } from 'utils/request'

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
export const fetchToken = () => get('/token')
export const fetchMyDetails = () => get('/users/me')
export const sendEmailCaptcha = (email: string) => post('/captcha', { email })
export const signUp = (payload: any) => post('/signup', payload)
export const changePassword = (payload: any) => post('/password', payload)
export const login = (payload: any) => post('/login', payload)
