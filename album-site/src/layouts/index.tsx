import React, { FC, memo } from 'react'
import { Route } from 'react-router-dom'
import clsx from 'clsx'

import useShallowSelector from 'hooks/useShallowSelector'
import { selectUI } from 'store/reducers/ui'
import { BP } from 'setup/setupMediaQuery'
import Discover from 'pages/Discover'
import Browse from 'pages/Browse'
import Details from 'pages/Details'
import User from 'pages/User'
import Album from 'pages/Album'
import Search from 'pages/Search'
import LoginAndSignUp from 'pages/LoginAndSignUp'
import Upload from 'pages/Upload'
import AlbumEdit from 'pages/AlbumEdit'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import CachedSwitch from './components/CachedSwitch'

import './index.scss'

const Layout: FC = () => {
  const { sidebarVisible, bp } = useShallowSelector(selectUI)
  return (
    <>
      <Header />
      <Sidebar />
      <div
        className={clsx(
          'main',
          sidebarVisible && bp >= BP.WIDESCREEN && 'main-narrow'
        )}
      >
        <CachedSwitch>
          <Route exact path="/" fallback component={Discover} />
          <Route path="/browse/:type?" component={Browse} />
          <Route path="/photos/:id" renderPrev component={Details} />
          <Route path="/users/:id/:type?" component={User} />
          <Route path="/album" component={Album} />
          <Route path="/search/:type?" component={Search} />
          <Route path="/upload/:type/:id?" renderPrev component={Upload} />
          <Route path="/account/:type" renderPrev component={LoginAndSignUp} />
          <Route path="/edit/albums/:id?" renderPrev component={AlbumEdit} />
        </CachedSwitch>
      </div>
    </>
  )
}

export default memo(Layout)
