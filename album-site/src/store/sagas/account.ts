import { takeLeading, put, call } from 'redux-saga/effects'
import {
  fetchToken as fetchTokenApi,
  sendEmailCaptcha,
  signUp as signUpApi
} from 'api'
import {
  FETCH_TOKEN,
  FETCH_MY_DETAILS,
  SEND_CAPTCHA,
  SIGN_UP
} from 'store/constants'
import { setAccessToken } from 'utils/storage'
import { setMyDetails } from 'store/actions'
import { PayloadAction } from 'types/store'

function* fetchToken() {
  const res = yield call(fetchTokenApi)
  setAccessToken(res.accessToken)
}

function* fetchMyDetails(): any {
  const res = yield call(fetchMyDetails)
  yield put(setMyDetails(res))
}

function* sendCaptcha({ payload }: PayloadAction) {
  yield call(sendEmailCaptcha, payload)
}

function* signUp({ payload }: PayloadAction) {
  try {
    const res = yield call(signUpApi, payload)
    setAccessToken(res.accessToken)
  } catch (error) {
    console.log(error)
  }
}

export default function*() {
  yield takeLeading(FETCH_TOKEN, fetchToken)
  yield takeLeading(FETCH_MY_DETAILS, fetchMyDetails)
  yield takeLeading(SEND_CAPTCHA, sendCaptcha)
  yield takeLeading(SIGN_UP, signUp)
}
