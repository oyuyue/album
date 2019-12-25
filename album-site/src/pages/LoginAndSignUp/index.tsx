import React, { FC, memo } from 'react'
import { RouteComponentProps, Switch, Route } from 'react-router-dom'
import Modal from 'components/Modal'
import Login from './Login'
import SignUp from './SignUp'
import PasswordReset from './PasswordReset'
import './index.scss'

const LoginAndSignUp: FC<RouteComponentProps> = ({ history: { goBack } }) => {
  return (
    <Modal title=" " onCancel={goBack} noFooter>
      <div className="las">
        <div className="las_box">
          <Switch>
            <Route path="/account/login" component={Login} />
            <Route path="/account/signup" component={SignUp} />
            <Route path="/account/password_reset" component={PasswordReset} />
          </Switch>
        </div>
        {/* <div className="las_3">
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
        </div> */}
      </div>
    </Modal>
  )
}

export default memo(LoginAndSignUp)
