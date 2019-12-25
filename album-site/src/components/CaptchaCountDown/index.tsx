import React, {
  FC,
  memo,
  useCallback,
  useState,
  useRef,
  useEffect
} from 'react'
import Input, { InputProps } from 'components/Input'
import Button from 'components/Button'

interface CaptchaCountDownProps {
  onGetCaptcha?: () => void
  seconds?: number
  onChange?: InputProps['onChange']
  value?: InputProps['value']
  inputProps?: InputProps
}

const CaptchaCountDown: FC<CaptchaCountDownProps> = ({
  value,
  onChange,
  onGetCaptcha,
  inputProps,
  seconds = 60
}) => {
  const [countDown, setCountDown] = useState(0)
  const timer = useRef<NodeJS.Timeout>()

  const countDownHandler = useCallback(() => {
    if (timer.current) return
    setCountDown(seconds)
    timer.current = setInterval(() => {
      setCountDown(v => {
        if (v <= 1) {
          clearInterval(timer.current)
          timer.current = null
        }
        return v - 1
      })
    }, 1000)

    onGetCaptcha && onGetCaptcha()
  }, [onGetCaptcha, seconds])

  useEffect(() => () => clearInterval(timer.current), [])

  return (
    <Input
      required
      minLength={4}
      maxLength={6}
      {...inputProps}
      label="验证码"
      placeholder="请输入验证码"
      value={value}
      onChange={onChange}
      suffix={
        <Button onClick={countDownHandler} disabled={countDown > 0}>
          {countDown > 0 ? countDown + ' 秒' : '获取验证码'}
        </Button>
      }
    />
  )
}

export default memo(CaptchaCountDown)
