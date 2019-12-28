import React, { FC, memo, useCallback, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import Input from 'components/Input'
import Button from 'components/Button'
import CaptchaCountDown from 'components/CaptchaCountDown'
import { useDispatch } from 'react-redux'
import { sendCaptcha, signUp } from 'store/actions'
import useForm from 'hooks/useForm'
import Notification from 'components/Notification'
import Spin from 'components/Spin'
import useShallowSelector from 'hooks/useShallowSelector'
import { isLoading } from 'store/reducers/state'
import { SIGN_UP } from 'store/constants'

const PasswordReset: FC = () => {
  const [bind, form] = useForm()
  const dispatch = useDispatch()
  const loading = useShallowSelector(isLoading(SIGN_UP))
  const captchaHandler = useCallback(() => {
    const res = form.report('email')
    if (res) {
      dispatch(sendCaptcha(form.value('email')))
    }
    return res
  }, [dispatch, form])

  const submitHandler = useCallback(
    (ev: FormEvent) => {
      ev.preventDefault()
      if (form.report()) {
        const values = form.value()
        if (values.password !== values.repassword) {
          Notification.error('两次密码不一致')
        } else {
          dispatch(signUp(values))
        }
      }
    },
    [dispatch, form]
  )

  return (
    <Spin spinning={loading}>
      <form {...bind} onSubmit={submitHandler} className="las_signup">
        <Input
          required
          type="email"
          name="email"
          label="邮箱"
          placeholder="请输入邮箱地址"
        />
        <CaptchaCountDown onGetCaptcha={captchaHandler} />
        <Input
          required
          type="password"
          name="password"
          label="密码"
          placeholder="最短 6 位"
        />
        <Input
          required
          name="password"
          type="password"
          gapBottom="big"
          label="确认密码"
          placeholder="重复输入密码"
        />
        <Button type="submit" block variant="contained" color="primary">
          重置密码
        </Button>
        <div className="las_login_extra">
          <Link replace to="/account/signup">
            <Button type="button" color="blue">
              注册
            </Button>
          </Link>
          <Link replace to="/account/login">
            <Button type="button" color="blue">
              登录
            </Button>
          </Link>
        </div>
      </form>
    </Spin>
  )
}

export default memo(PasswordReset)
