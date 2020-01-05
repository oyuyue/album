import { SearchKey } from 'store/reducers/search'
import { makeAC, makePAC, makeKAC, makeLAC } from 'store/helpers'
import { UserKey } from 'store/reducers/user'
import { BP } from 'setup/setupMediaQuery'
import { StateType } from 'store/reducers/state'
import {
  FETCH_BANNERS,
  SET_BANNERS,
  FETCH_PHOTOS,
  FETCH_MORE_PHOTOS,
  SET_PHOTOS,
  ADD_MORE_PHOTOS,
  CHANGE_PHOTO_REQUEST_PARAMS,
  CHANGE_ALBUM_REQUEST_PARAMS,
  SET_ALBUMS,
  ADD_MORE_ALBUMS,
  FETCH_MORE_ALBUMS,
  FETCH_TAGS,
  SET_TAGS,
  FETCH_CATEGORIES,
  SET_CATEGORIES,
  SEARCH,
  SET_SEARCH,
  CHANGE_SEARCH_REQUEST_PARAMS,
  ADD_MORE_SEARCH,
  FETCH_RECOMMEND_PHOTS,
  SET_RECOMMEND_PHOTOS,
  ADD_MORE_RECOMMEND_PHOTOS,
  FETCH_MORE_RECOMMEND_PHOTS,
  FETCH_ALBUMS,
  SEARCH_MORE,
  FETCH_ALBUM,
  FETCH_ALBUM_PHOTOS,
  FETCH_MORE_ALBUM_PHOTOS,
  SET_ALBUM,
  SET_ALBUM_PHOTOS,
  ADD_MORE_ALBUM_PHOTOS,
  FETCH_USER,
  SET_USER,
  FETCH_USER_STUFFS,
  SET_USER_STUFFS,
  ADD_MORE_USER_STUFFS,
  UI_CHANGE_BP,
  UI_TOGGLE_SIDEBAR,
  UI_TOGGLE_THEME,
  FETCH_MY_DETAILS,
  FETCH_TOKEN,
  SET_MY_DETAILS,
  SEND_SIGN_UP_CAPTCHA,
  SIGN_UP,
  CHANGE_STATE,
  LOGIN,
  CHANGE_PASSWORD,
  LOGOUT,
  UNSET_MY_DETAILS,
  CHANGE_USER_PROFILE,
  CHANGE_EMAIL,
  SEND_RETRIEVE_PASSWORD_CAPTCHA,
  RETRIEVE_PASSWORD,
  SEND_CHANGE_EMAIL_CAPTCHA,
  EDIT_ALBUM,
  FETCH_EDIT_ALBUM,
  SET_EDIT_ALBUM,
  CHANGE_LIST,
  CHANGE_LIST_STATUS,
  FETCH_USER_ALBUMS,
  SET_USER_ALBUMS,
  DELETE_ALBUM,
  CHANGE_ALBUM_VISIBILITY
} from '../constants'

export const fetchBanners = makeAC(FETCH_BANNERS)
export const setBanners = makePAC(SET_BANNERS)

export const fetchRecommendPhotos = makeAC(FETCH_RECOMMEND_PHOTS)
export const fetchMoreRecommendPhotos = makeAC(FETCH_MORE_RECOMMEND_PHOTS)
export const setRecommendPhotos = makePAC(SET_RECOMMEND_PHOTOS)
export const addMoreRecommendPhotos = makePAC(ADD_MORE_RECOMMEND_PHOTOS)

export const fetchPhotos = makePAC(FETCH_PHOTOS)
export const fetchMorePhotos = makeAC(FETCH_MORE_PHOTOS)
export const setPhotos = makePAC(SET_PHOTOS)
export const addMorePhotos = makePAC(ADD_MORE_PHOTOS)
export const changePhotoParams = makePAC(CHANGE_PHOTO_REQUEST_PARAMS)

export const fetchAlbums = makePAC(FETCH_ALBUMS)
export const fetchMoreAlbums = makeAC(FETCH_MORE_ALBUMS)
export const setAlbums = makePAC(SET_ALBUMS)
export const addMoreAlbums = makePAC(ADD_MORE_ALBUMS)
export const changeAlbumsParams = makePAC(CHANGE_ALBUM_REQUEST_PARAMS)

export const fetchTags = makeAC(FETCH_TAGS)
export const setTags = makePAC(SET_TAGS)

export const fetchCategories = makeAC(FETCH_CATEGORIES)
export const setCategories = makePAC(SET_CATEGORIES)

export const search = makeKAC<SearchKey>(SEARCH)
export const searchMore = makeAC(SEARCH_MORE)
export const setSearch = makeKAC<SearchKey>(SET_SEARCH)
export const addMoreSearch = makeKAC<SearchKey>(ADD_MORE_SEARCH)
export const changeSearchParams = makePAC(CHANGE_SEARCH_REQUEST_PARAMS)

export const fetchAlbum = makePAC(FETCH_ALBUM)
export const fetchAlbumPhotos = makePAC(FETCH_ALBUM_PHOTOS)
export const fetchMoreAlbumPhotos = makeAC(FETCH_MORE_ALBUM_PHOTOS)
export const setAlbum = makePAC(SET_ALBUM)
export const setAlbumPhotos = makePAC(SET_ALBUM_PHOTOS)
export const addMoreAlbumPhotos = makePAC(ADD_MORE_ALBUM_PHOTOS)
export const editAlbum = makePAC(EDIT_ALBUM)
export const fetchEditAlbum = makePAC(FETCH_EDIT_ALBUM)
export const setEditAlbum = makePAC(SET_EDIT_ALBUM)
export const deleteAlbum = makePAC(DELETE_ALBUM)
export const changeAlbumVisibility = makePAC(CHANGE_ALBUM_VISIBILITY)

export const fetchUser = makePAC(FETCH_USER)
export const setUser = makePAC(SET_USER)
export const fetchUserStuffs = makeKAC<UserKey>(FETCH_USER_STUFFS)
export const setUserStuffs = makeKAC<UserKey>(SET_USER_STUFFS)
export const addMoreUserStuffs = makeKAC<UserKey>(ADD_MORE_USER_STUFFS)
export const fetchUserAlbums = makeLAC(FETCH_USER_ALBUMS)
export const setUserAlbums = makeLAC(SET_USER_ALBUMS)

export const changeBP = makePAC<BP>(UI_CHANGE_BP)
export const toggleSidebar = makeAC(UI_TOGGLE_SIDEBAR)
export const toggleTheme = makeAC(UI_TOGGLE_THEME)

export const fetchMyDetails = makeAC(FETCH_MY_DETAILS)
export const fetchToken = makeAC(FETCH_TOKEN)
export const setMyDetails = makePAC(SET_MY_DETAILS)
export const unsetMyDetails = makeAC(UNSET_MY_DETAILS)
export const changeUserProfile = makePAC(CHANGE_USER_PROFILE)
export const sendSignUpCaptcha = makePAC(SEND_SIGN_UP_CAPTCHA)
export const sendRetrievePasswordCaptcha = makePAC(
  SEND_RETRIEVE_PASSWORD_CAPTCHA
)
export const sendChangeEmailCaptcha = makePAC(SEND_CHANGE_EMAIL_CAPTCHA)
export const retrievePassword = makePAC(RETRIEVE_PASSWORD)
export const signUp = makePAC(SIGN_UP)
export const changePassword = makePAC(CHANGE_PASSWORD)
export const changeEmail = makePAC(CHANGE_EMAIL)
export const login = makePAC(LOGIN)
export const logout = makeAC(LOGOUT)

export const changeList = makePAC(CHANGE_LIST)
export const changeListStatus = makePAC(CHANGE_LIST_STATUS)

const makeStateAction = (state: StateType) => (key: string) => ({
  type: CHANGE_STATE,
  payload: { [key]: state }
})
export const loading = makeStateAction(StateType.LOADING)
export const error = makeStateAction(StateType.ERROR)
export const done = makeStateAction(StateType.DONE)
