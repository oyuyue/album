import { takeLeading, put, call, retry } from 'redux-saga/effects'
import { replace, goBack } from 'connected-react-router'
import {
  fetchToken as fetchTokenApi,
  sendEmailCaptcha,
  signUp as signUpApi,
  login as loginApi,
  fetchMyDetails as fetchMyDetailsApi
} from 'api'
import {
  FETCH_TOKEN,
  FETCH_MY_DETAILS,
  SEND_CAPTCHA,
  SIGN_UP,
  LOGIN
} from 'store/constants'
import { setAccessToken } from 'utils/storage'
import { setMyDetails } from 'store/actions'
import { PayloadAction } from 'types/store'
import { stateful } from './utils'

function* fetchToken() {
  const res = yield call(fetchTokenApi)
  setAccessToken(res.accessToken)
}

function* fetchMyDetails(): any {
  const res = yield retry(3, 2000, fetchMyDetailsApi)
  yield put(setMyDetails(res))
}

function* sendCaptcha({ payload }: PayloadAction) {
  yield call(sendEmailCaptcha, payload)
}

function* signUp({ payload }: PayloadAction) {
  try {
    const res = yield call(signUpApi, payload)
    setAccessToken(res.accessToken)
    yield put(replace('/account/login'))
  } catch (error) {
    console.log('sign up error', error)
  }
}

function* login({ payload }: PayloadAction) {
  try {
    const res = yield call(loginApi, payload)
    setAccessToken(res.accessToken)
    yield put(goBack())
    yield call(fetchMyDetails)
  } catch (error) {
    console.log('login error', error)
  }
}

export default function*() {
  yield takeLeading(FETCH_TOKEN, fetchToken)
  yield takeLeading(FETCH_MY_DETAILS, fetchMyDetails)
  yield takeLeading(SEND_CAPTCHA, sendCaptcha)
  yield takeLeading(SIGN_UP, stateful(signUp))
  yield takeLeading(LOGIN, stateful(login))
}
