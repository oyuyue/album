import { makeAC, makePAC, makeKAC, makeLAC } from 'store/helpers'
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
  FETCH_TAGS,
  SET_TAGS,
  SEARCH,
  SET_SEARCH,
  CHANGE_SEARCH_REQUEST_PARAMS,
  ADD_MORE_SEARCH,
  FETCH_RECOMMEND_PHOTS,
  SET_RECOMMEND_PHOTOS,
  ADD_MORE_RECOMMEND_PHOTOS,
  FETCH_MORE_RECOMMEND_PHOTS,
  SEARCH_MORE,
  FETCH_USER,
  SET_USER,
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
  CHANGE_LIST,
  CHANGE_LIST_STATUS,
  FETCH_USER_PHOTOS,
  SET_USER_PHOTOS,
  FETCH_EDIT_PHOTO,
  SET_EDIT_PHOTO
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
export const fetchUserPhotos = makeLAC(FETCH_USER_PHOTOS)
export const setUserPhotos = makeLAC(SET_USER_PHOTOS)
export const fetchEditPhoto = makePAC(FETCH_EDIT_PHOTO)
export const setEditPhoto = makePAC(SET_EDIT_PHOTO)

export const fetchTags = makeAC(FETCH_TAGS)
export const setTags = makePAC(SET_TAGS)

export const searchMore = makeAC(SEARCH_MORE)
export const changeSearchParams = makePAC(CHANGE_SEARCH_REQUEST_PARAMS)

export const fetchUser = makePAC(FETCH_USER)
export const setUser = makePAC(SET_USER)

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
