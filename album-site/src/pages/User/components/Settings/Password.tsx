import React, { FC, memo, useCallback } from 'react'
import Input from 'components/Input'
import Notification from 'components/Notification'
import useShallowSelector from 'hooks/useShallowSelector'
import { isLoading } from 'store/reducers/state'
import { CHANGE_PASSWORD } from 'store/constants'
import { useDispatch } from 'react-redux'
import { changePassword } from 'store/actions'
import SettingsItem from './SettingsItem'

const Password: FC = () => {
  const loading = useShallowSelector(isLoading(CHANGE_PASSWORD))
  const dispatch = useDispatch()

  const submitHandler = useCallback(
    (data: any) => {
      if (!data) return false
      if (data.newPassword !== data.repassword) {
        Notification.error('两次新密码不一致')
        return false
      }
      delete data.repassword
      dispatch(changePassword(data))
    },
    [dispatch]
  )

  return (
    <SettingsItem
      onSubmit={submitHandler}
      title="密码"
      subTitle="已设置"
      loading={loading}
    >
      <Input
        gapBottom="midden"
        type="password"
        name="password"
        placeholder="请输入当前密码"
        label="密码"
        minLength={6}
        maxLength={18}
        required
      />
      <Input
        type="password"
        name="newPassword"
        placeholder="请输入新密码"
        label="新密码"
        minLength={6}
        maxLength={18}
        required
      />
      <Input
        gapBottom="midden"
        type="password"
        name="repassword"
        placeholder="请重复输入新密码"
        label="重复新密码"
        minLength={6}
        maxLength={18}
        required
      />
    </SettingsItem>
  )
}

export default memo(Password)
