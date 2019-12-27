import { isFunction } from 'util'
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
  onGetCaptcha: () => boolean | Promise<any>
  seconds?: number
  onChange?: InputProps['onChange']
  value?: InputProps['value']
  inputProps?: InputProps
  name?: string
}

const CaptchaCountDown: FC<CaptchaCountDownProps> = ({
  value,
  onChange,
  onGetCaptcha,
  inputProps,
  seconds = 60,
  name
}) => {
  const [countDown, setCountDown] = useState(0)
  const timer = useRef<NodeJS.Timeout>()

  const clearTimer = useCallback(() => {
    clearInterval(timer.current)
    timer.current = null
  }, [])

  const onCountDown = useCallback(() => {
    setCountDown(seconds)
    timer.current = setInterval(() => {
      setCountDown(v => {
        if (v <= 1) {
          clearTimer()
        }
        return v - 1
      })
    }, 1000)
  }, [clearTimer, seconds])

  const countDownHandler = useCallback(() => {
    if (timer.current) return
    if (onGetCaptcha) {
      const res = onGetCaptcha()
      if (!res) return
      if (res !== true && isFunction(res.then)) {
        timer.current = true as any
        res
          .then(() => {
            clearTimer()
            onCountDown()
          })
          .catch(() => {
            clearTimer()
          })
      } else {
        onCountDown()
      }
    }
  }, [clearTimer, onCountDown, onGetCaptcha])

  useEffect(() => () => clearInterval(timer.current), [])

  return (
    <Input
      required
      minLength={4}
      maxLength={6}
      name={name}
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
