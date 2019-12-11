import React, { FC, memo, useState, useCallback } from 'react'
import { Switch, Route, RouteComponentProps } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Typography from 'components/Typography'
import Button from 'components/Button'
import Tabs, { Tab } from 'components/Tabs'
import { randomImage } from 'utils'
import { UserKey } from 'store/reducers/user'
import Albums from './components/Albums'
import Settings from './components/Settings'
import './index.scss'

const User: FC<RouteComponentProps<{ id: string; type: string }>> = ({
  history: { push },
  match: {
    params: { id, type = UserKey.PHOTOS }
  }
}) => {
  const [defaultBg] = useState(randomImage)

  const switchHandler = useCallback(
    (v: string) => {
      push(`/users/${id}/${v}`)
    },
    [id, push]
  )

  return (
    <article className="p_user">
      <section className="p_user_header">
        <div
          className="p_user_banner"
          style={{
            backgroundImage: `url(${defaultBg})`
          }}
        />
        <div className="p_user_box">
          <img
            className="p_user_avatar"
            alt=""
            src="https://abs.twimg.com/sticky/default_profile_images/default_profile_200x200.png"
          />
          <div className="p_user_ibox">
            <div className="p_user_info">
              <Typography variant="h5">Nickname</Typography>
              <FontAwesomeIcon
                className="p_user_gender p_user_gender-male"
                size="lg"
                icon="mars"
              />
              <Typography className="p_user_info_joined" variant="caption">
                2019 加入
              </Typography>
              <Button icon="cog">编辑资料</Button>
            </div>
            <Typography variant="body2" className="p_user_bio">
              简介简介简介简介简介简介
            </Typography>
            <div className="p_user_meta">
              <div className="p_user_meta_item">
                <FontAwesomeIcon
                  className="p_user_meta_item_icon"
                  icon="star"
                  size="xs"
                />
                <Typography variant="caption">获得收藏100次</Typography>
              </div>
              <div className="p_user_meta_item">
                <FontAwesomeIcon
                  className="p_user_meta_item_icon"
                  icon="eye"
                  size="xs"
                />
                <Typography variant="caption">图片被浏览1000次</Typography>
              </div>
            </div>
          </div>
        </div>
        <Tabs value={type} onChange={switchHandler} className="p_user_tabs">
          <Tab value={UserKey.PHOTOS} sub="100">
            相片
          </Tab>
          <Tab value={UserKey.ALBUMS} sub="10">
            相册
          </Tab>
          <Tab value={UserKey.FAVORITES}>收藏</Tab>
          <Tab value="settings">设置</Tab>
        </Tabs>
      </section>
      <section className="p_user_content">
        <Switch>
          <Route path="/users/:id/albums" component={Albums} />
          <Route path="/users/:id/settings" component={Settings} />
        </Switch>
      </section>
    </article>
  )
}

export default memo(User)
