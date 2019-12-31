import { takeLeading, put, call, retry } from 'redux-saga/effects'
import { replace, goBack } from 'connected-react-router'
import * as api from 'api'
import {
  FETCH_TOKEN,
  FETCH_MY_DETAILS,
  SEND_SIGN_UP_CAPTCHA,
  SIGN_UP,
  LOGIN,
  CHANGE_PASSWORD,
  LOGOUT,
  CHANGE_EMAIL,
  SEND_RETRIEVE_PASSWORD_CAPTCHA,
  RETRIEVE_PASSWORD,
  SEND_CHANGE_EMAIL_CAPTCHA
} from 'store/constants'
import { setAccessToken } from 'utils/storage'
import { setMyDetails, unsetMyDetails } from 'store/actions'
import { PayloadAction } from 'types/store'
import Notification from 'components/Notification'
import { stateful } from './utils'

function* fetchToken() {
  const res = yield call(api.fetchToken)
  setAccessToken(res.accessToken)
}

function* fetchMyDetails(): any {
  const res = yield retry(3, 2000, api.fetchMyDetails)
  yield put(setMyDetails(res))
}

function* sendSignUpCaptcha({ payload }: PayloadAction) {
  yield call(api.sendSignUpCaptcha, payload)
}

function* sendRetrievePasswordCaptcha({ payload }: PayloadAction) {
  yield call(api.sendRetrievePasswordCaptcha, payload)
}

function* sendChangeEmailCaptcha({ payload }: PayloadAction) {
  yield call(api.sendChangeEmailCaptcha, payload)
}

function* signUp({ payload }: PayloadAction) {
  const res = yield call(api.signUp, payload)
  setAccessToken(res.accessToken)
  yield put(replace('/account/login'))
}

function* retrievePassword({ payload }: PayloadAction) {
  const res = yield call(api.retrievePassword, payload)
  setAccessToken(res.accessToken)
  yield put(goBack())
}

function* changePassword({ payload }: PayloadAction) {
  yield call(api.changePassword, payload)
  Notification.success('修改密码成功')
}

function* changeEmail({ payload }: PayloadAction) {
  yield call(api.changeEmail, payload)
  Notification.success('修改邮箱成功')
}

function* login({ payload }: PayloadAction) {
  try {
    const res = yield call(api.login, payload)
    setAccessToken(res.accessToken)
    yield put(goBack())
    yield call(fetchMyDetails)
  } catch (error) {
    console.log('login error', error)
  }
}

function* logout() {
  yield call(api.logout)
  yield put(unsetMyDetails())
}

export default function*() {
  yield takeLeading(FETCH_TOKEN, fetchToken)
  yield takeLeading(FETCH_MY_DETAILS, fetchMyDetails)
  yield takeLeading(SEND_SIGN_UP_CAPTCHA, sendSignUpCaptcha)
  yield takeLeading(SEND_RETRIEVE_PASSWORD_CAPTCHA, sendRetrievePasswordCaptcha)
  yield takeLeading(SEND_CHANGE_EMAIL_CAPTCHA, sendChangeEmailCaptcha)
  yield takeLeading(LOGOUT, logout)
  yield takeLeading(SIGN_UP, stateful(signUp))
  yield takeLeading(CHANGE_PASSWORD, stateful(changePassword))
  yield takeLeading(RETRIEVE_PASSWORD, stateful(retrievePassword))
  yield takeLeading(LOGIN, stateful(login))
  yield takeLeading(CHANGE_EMAIL, stateful(changeEmail))
}
