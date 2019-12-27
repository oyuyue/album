import React, { FC, memo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Input from 'components/Input'
import Button from 'components/Button'
import CaptchaCountDown from 'components/CaptchaCountDown'
import { useDispatch } from 'react-redux'
import { sendCaptcha } from 'store/actions'
import useForm from 'hooks/useForm'

const SignUp: FC = () => {
  const [bind, form] = useForm()
  const dispatch = useDispatch()
  const captchaHandler = useCallback(() => {
    const res = form.report('email')
    if (res) {
      dispatch(sendCaptcha(form.value('email')))
    }
    return res
  }, [dispatch, form])

  return (
    <form {...bind} className="las_signup">
      <Input
        required
        type="email"
        name="email"
        label="邮箱"
        placeholder="请输入邮箱地址"
      />
      <CaptchaCountDown onGetCaptcha={captchaHandler} />
      <Input required type="password" label="密码" placeholder="最短 6 位" />
      <Input
        required
        type="password"
        gapBottom="big"
        label="确认密码"
        placeholder="重复输入密码"
      />
      <Button type="submit" block variant="contained" color="primary">
        注册
      </Button>
      <Link replace to="/account/login">
        <Button type="button" className="las_signup_extra" block color="blue">
          已有账号登录
        </Button>
      </Link>
    </form>
  )
}

export default memo(SignUp)
