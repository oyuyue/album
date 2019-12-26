import React, {
  FC,
  memo,
  useEffect,
  useCallback,
  useRef,
  useState
} from 'react'
import { Link } from 'react-router-dom'
import Input from 'components/Input'
import Button from 'components/Button'
import CaptchaCountDown from 'components/CaptchaCountDown'
import { useDispatch } from 'react-redux'
import { sendCaptcha } from 'store/actions'

const SignUp: FC = () => {
  const [email, setEmail] = useState()
  const form = useRef<HTMLFormElement>()
  const emailHandler = useCallback(ev => {
    setEmail(ev.currentTarget.value)
  }, [])
  const dispatch = useDispatch()
  const captchaHandler = useCallback(() => {
    const emailEl = form.current.elements[0] as HTMLInputElement
    if (emailEl.checkValidity()) {
      // dispatch(sendCaptcha())
    } else {
      emailEl.reportValidity()
    }
  }, [])

  return (
    <form ref={form} className="las_signup">
      <Input
        required
        type="email"
        onChange={emailHandler}
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
