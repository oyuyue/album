import React, { FC, memo } from 'react'
import { Link } from 'react-router-dom'
import Input from 'components/Input'
import Button from 'components/Button'
import CaptchaCountDown from 'components/CaptchaCountDown'

const PasswordReset: FC = () => {
  return (
    <form className="las_signup">
      <Input required type="email" label="邮箱" placeholder="请输入邮箱地址" />
      <CaptchaCountDown />
      <Input required type="password" label="密码" placeholder="最短 6 位" />
      <Input
        required
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
  )
}

export default memo(PasswordReset)
