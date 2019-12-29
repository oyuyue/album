import React, { FC, memo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Input from 'components/Input'
import Button from 'components/Button'
import Dropdown from 'components/Dropdown'
import Menu, { Item } from 'components/Menu'
import { useDispatch } from 'react-redux'
import { toggleSidebar, logout } from 'store/actions'
import './index.scss'
import useShallowSelector from 'hooks/useShallowSelector'
import { isLogged } from 'store/reducers/account'

const Header: FC = () => {
  const dispatch = useDispatch()
  const toggle = useCallback(() => dispatch(toggleSidebar()), [dispatch])
  const logged = useShallowSelector(isLogged)
  const logoutHandler = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

  return (
    <header className="header">
      <Button
        onClick={toggle}
        className="header_toggle"
        icon="bars"
        size="big"
      />
      <div className="header_search">
        <Input
          className="header_search_input"
          type="search"
          placeholder="搜索"
        />
        <Button className="header_search_btn" size="big" icon="search" />
      </div>
      <div className="header_actions">
        {!logged && (
          <Link to="/account/signup">
            <Button variant="contained">注册</Button>
          </Link>
        )}
        {!logged && (
          <Link to="/account/login" className="header_actions_login">
            <Button variant="contained" color="primary">
              登录
            </Button>
          </Link>
        )}
        <div className="header_user">
          <Dropdown
            overlay={
              <Menu pure>
                {logged && <Item icon="user">个人中心</Item>}
                {logged && <Item icon="cog">设置</Item>}
                <Item variant="divider" />
                {logged && (
                  <Item onClick={logoutHandler} icon="sign-out-alt">
                    登出
                  </Item>
                )}
                {!logged && (
                  <Item to="/account/login" icon="sign-in-alt">
                    登录
                  </Item>
                )}
              </Menu>
            }
            horizontal="right"
            vertical="top"
          >
            <Button className="header_toggle" icon="user" size="big" />
          </Dropdown>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
