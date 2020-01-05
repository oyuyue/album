import { get, post, del } from 'utils/request'

export const fetchBanners = () => get('/banners')
export const fetchTags = () => get('/tags')
export const fetchCategories = () => get('/categories')

export const fetchPhotos = (payload?: any) => get('/photos', payload)
export const fetchPhoto = (photoId: any) => get(`/photos/${photoId}`)
export const fetchAlbums = (payload?: any) => get('/albums', payload)
export const search = (payload?: any) => get('/search', payload)
export const fetchAlbum = (id: string) => get('/albums/' + id)
export const upsertAlbum = (payload?: any) => post('/albums', payload)
export const changePhotoVisibility = (payload: any) =>
  post('/photos/actions/change-visibility', payload)
export const upsertPhoto = (payload?: any) => post('/photos', payload)
export const deletePhoto = (photoId: string) => del(`/photos/${photoId}`)
export const deleteAlbum = (id: string) => del(`/albums/${id}`)
export const changeAlbumVisibility = (payload: any) =>
  post('/albums/actions/change-visibility', payload)
export const fetchUser = (id: string) => get('/users/' + id)
export const fetchUserAlbums = (payload?: any) => get('/albums', payload)
export const fetchToken = () => get('/token')
export const fetchMyDetails = () => get('/users/me')
export const updateMyProfile = (payload: any) => post('/users', payload)
export const sendSignUpCaptcha = (email: string) =>
  get('/captcha/sign-up', { email })
export const sendRetrievePasswordCaptcha = (email: string) =>
  get('/captcha/retrieve-password', { email })
export const sendChangeEmailCaptcha = (email: string) =>
  get('/captcha/email', { email })
export const signUp = (payload: any) => post('/sign-up', payload)
export const changePassword = (payload: any) => post('/password', payload)
export const login = (payload: any) => post('/login', payload)
export const logout = () => get('/logout')
export const uploadImage = (file: FormData) => post('/upload/image', file)
export const changeEmail = (payload: any) => post('/email', payload)
export const retrievePassword = (payload: any) =>
  post('/retrieve-password', payload)
