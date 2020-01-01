import { call } from 'redux-saga/effects'
import { uploadImage as uploadImageApi } from 'api'

export function* uploadImage(file: File) {
  if (!file) return
  const data = new FormData()
  data.append('file', file)
  const { url }: { url: string } = yield call(uploadImageApi, data)
  return url
}
