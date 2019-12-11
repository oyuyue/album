import React, { FC, memo } from 'react'
import Modal from 'components/Modal'
import Input from 'components/Input'
import Button from 'components/Button'
import Typography from 'components/Typography'
import './index.scss'

const LoginAndSignUp: FC = () => {
  return (
    <Modal title="登录" noFooter>
      <div className="las">
        <div className="las_box">
          <form className="las_login">
            <Input
              required
              type="email"
              label="邮箱"
              placeholder="请输入邮箱地址"
            />
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
              <Button type="button" color="blue">
                注册
              </Button>
              <Button type="button" color="blue">
                忘记密码
              </Button>
            </div>
          </form>
          {/* <form className="las_signup">
            <Input required type="email" label="邮箱" />
            <Input
              required
              type="password"
              label="密码"
              placeholder="最短 6 位"
            />
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
            <Button
              type="button"
              className="las_signup_extra"
              block
              color="blue"
            >
              已有账号登录
            </Button>
          </form> */}
        </div>
        <div className="las_3">
          <Typography gutterBottom="midden" variant="subtitle2">
            第三方登录
          </Typography>
          <div className="las_3_items">
            <Button
              style={{ color: '#1aad19' }}
              icon={['fab', 'weixin']}
              iconProps={{ size: '2x' }}
            />
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default memo(LoginAndSignUp)
