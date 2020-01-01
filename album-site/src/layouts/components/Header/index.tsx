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
import {
  isLogged,
  selectMyUsername,
  selectMyAvatar
} from 'store/reducers/account'
import Avatar from 'components/Avatar'

const Header: FC = () => {
  const dispatch = useDispatch()
  const toggle = useCallback(() => dispatch(toggleSidebar()), [dispatch])
  const logged = useShallowSelector(isLogged)
  const username = useShallowSelector(selectMyUsername)
  const avatarUrl = useShallowSelector(selectMyAvatar)
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
        {logged && (
          <Dropdown
            autoHide
            overlay={
              <Menu pure>
                <Item to="/edit/photos" icon="image">
                  上传图片
                </Item>
                <Item to="/edit/albums" icon="folder-plus">
                  新增相册
                </Item>
              </Menu>
            }
            horizontal="right"
            vertical="top"
          >
            <Button className="header_add" icon="plus" size="big" />
          </Dropdown>
        )}
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
            autoHide
            overlay={
              <Menu pure>
                {logged && (
                  <Item to={`/users/${username}`} icon="user">
                    个人中心
                  </Item>
                )}
                {logged && (
                  <Item to={`/users/${username}/settings`} icon="cog">
                    设置
                  </Item>
                )}
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
            {logged ? (
              <Avatar url={avatarUrl} />
            ) : (
              <Button className="header_toggle" icon="user" size="big" />
            )}
          </Dropdown>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
