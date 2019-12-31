import React, { FC, memo, useCallback, useRef } from 'react'
import Input from 'components/Input'
import CaptchaCountDown from 'components/CaptchaCountDown'
import { useDispatch } from 'react-redux'
import useShallowSelector from 'hooks/useShallowSelector'
import { selectMyEmail } from 'store/reducers/account'
import { changeEmail, sendChangeEmailCaptcha } from 'store/actions'
import { isLoading } from 'store/reducers/state'
import { CHANGE_EMAIL } from 'store/constants'
import SettingsItem from './SettingsItem'

const Email: FC = () => {
  const ref = useRef<any>()
  const email = useShallowSelector(selectMyEmail)
  const dispatch = useDispatch()
  const loading = useShallowSelector(isLoading(CHANGE_EMAIL))
  const submitHandler = useCallback(
    (data: any) => {
      dispatch(changeEmail(data))
    },
    [dispatch]
  )
  const captchaHandler = useCallback(() => {
    if (ref.current.report('email')) {
      dispatch(sendChangeEmailCaptcha(ref.current.value('email')))
      return true
    }
    return false
  }, [dispatch])

  return (
    <SettingsItem
      loading={loading}
      ref={ref}
      onSubmit={submitHandler}
      title="邮箱"
      subTitle={email}
    >
      <Input
        gapBottom="midden"
        type="email"
        placeholder="请输入邮箱地址"
        name="email"
        label="邮箱"
        required
      />
      <CaptchaCountDown name="captcha" onGetCaptcha={captchaHandler} />
      <Input
        gapBottom="midden"
        type="email"
        name="newEmail"
        placeholder="请输入新邮箱地址"
        label="新邮箱"
        required
      />
    </SettingsItem>
  )
}

export default memo(Email)
