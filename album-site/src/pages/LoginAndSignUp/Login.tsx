import React, { FC, memo } from 'react'
import { Link } from 'react-router-dom'
import Input from 'components/Input'
import Button from 'components/Button'

const Login: FC = () => {
  return (
    <form className="las_login">
      <Input required type="email" label="邮箱" placeholder="请输入邮箱地址" />
      <Input
        required
        gapBottom="big"
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
  )
}

export default memo(Login)
