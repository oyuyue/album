import React, { FC, memo, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './index.scss'
import useShallowSelector from 'hooks/useShallowSelector'
import { selectUI } from 'store/reducers/ui'
import { BP } from 'setup/setupMediaQuery'
import Button from 'components/Button'
import { useDispatch } from 'react-redux'
import { toggleSidebar } from 'store/actions'

const Sidebar: FC = () => {
  const dispatch = useDispatch()
  const { sidebarVisible, bp } = useShallowSelector(selectUI)
  const toggle = useCallback(() => dispatch(toggleSidebar()), [dispatch])

  return (
    <div>
      <div
        className={clsx(
          'sidebar',
          sidebarVisible && 'sidebar-opened',
          bp < BP.WIDESCREEN && 'sidebar-suspend'
        )}
      >
        <div className="sidebar_header">
          <Button onClick={toggle} icon="bars" size="big" />
        </div>
        <nav className="sidebar__nav">
          <NavLink className="sidebar__nav__item" to="/">
            <FontAwesomeIcon className="sidebar__nav__icon" icon="home" />
            <span>首页</span>
          </NavLink>
          <NavLink className="sidebar__nav__item" to="/browse">
            <FontAwesomeIcon
              className="sidebar__nav__icon"
              icon="camera-retro"
            />
            <span>浏览</span>
          </NavLink>
          <NavLink className="sidebar__nav__item" to="/details">
            <FontAwesomeIcon className="sidebar__nav__icon" icon="home" />
            <span>主页</span>
          </NavLink>
          <NavLink className="sidebar__nav__item" to="/users/id">
            <FontAwesomeIcon className="sidebar__nav__icon" icon="home" />
            <span>主页</span>
          </NavLink>
          <NavLink className="sidebar__nav__item" to="/album">
            <FontAwesomeIcon className="sidebar__nav__icon" icon="home" />
            <span>主页</span>
          </NavLink>
          <NavLink className="sidebar__nav__item" to="/search">
            <FontAwesomeIcon className="sidebar__nav__icon" icon="home" />
            <span>主页</span>
          </NavLink>
          <NavLink className="sidebar__nav__item" to="/login">
            <FontAwesomeIcon className="sidebar__nav__icon" icon="home" />
            <span>主页</span>
          </NavLink>
        </nav>
      </div>
      <div
        onClick={toggle}
        className={clsx(
          'sidebar_mask',
          sidebarVisible && bp < BP.WIDESCREEN && 'sidebar_mask-show'
        )}
      ></div>
    </div>
  )
}

export default memo(Sidebar)
