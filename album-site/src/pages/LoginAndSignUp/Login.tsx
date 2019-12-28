import React, { FC, memo, useCallback, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import Input from 'components/Input'
import Button from 'components/Button'
import Spin from 'components/Spin'
import useShallowSelector from 'hooks/useShallowSelector'
import { isLoading } from 'store/reducers/state'
import { LOGIN } from 'store/constants'
import useForm from 'hooks/useForm'
import { useDispatch } from 'react-redux'
import { login } from 'store/actions'

const Login: FC = () => {
  const loading = useShallowSelector(isLoading(LOGIN))
  const [bind, form] = useForm()
  const dispatch = useDispatch()

  const submitHandler = useCallback(
    (ev: FormEvent) => {
      ev.preventDefault()
      if (form.report()) {
        dispatch(login(form.value()))
      }
    },
    [dispatch, form]
  )

  return (
    <Spin spinning={loading}>
      <form {...bind} onSubmit={submitHandler} className="las_login">
        <Input
          required
          name="username"
          type="email"
          label="邮箱"
          placeholder="请输入邮箱地址"
        />
        <Input
          required
          gapBottom="big"
          name="password"
          type="password"
          label="密码"
          placeholder="请输入密码"
        />
        <Button type="submit" block variant="contained" color="primary">
          登录
        </Button>
        <div className="las_login_extra">
          <Link replace to="/account/signup">
            <Button type="button" color="blue">
              注册
            </Button>
          </Link>
          <Link replace to="/account/password_reset">
            <Button type="button" color="blue">
              忘记密码
            </Button>
          </Link>
        </div>
      </form>
    </Spin>
  )
}

export default memo(Login)
