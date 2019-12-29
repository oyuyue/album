import React, { FC, memo, useState, useCallback, useEffect } from 'react'
import { Switch, Route, RouteComponentProps } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import day from 'dayjs'
import Typography from 'components/Typography'
import Button from 'components/Button'
import Tabs, { Tab } from 'components/Tabs'
import { randomImage } from 'utils'
import { UserKey } from 'store/reducers/user'
import useShallowSelector from 'hooks/useShallowSelector'
import selectUserDetails from 'store/selector'
import { Gender } from 'types/entity'
import { useDispatch } from 'react-redux'
import { fetchUser } from 'store/actions'
import Avatar from 'components/Avatar'
import Albums from './components/Albums'
import Settings from './components/Settings'
import './index.scss'
import Skeleton from 'components/Skeleton'

function renderGenderIcon(gender: Gender) {
  const icon =
    gender === Gender.MALE ? 'mars' : gender === Gender.FEMALE ? 'venus' : null

  return (
    icon && (
      <FontAwesomeIcon
        className={`{p_user_gender p_user_gender-${gender}}`}
        size="lg"
        icon="mars"
      />
    )
  )
}

const User: FC<RouteComponentProps<{ id: string; type: string }>> = ({
  history: { push },
  match: {
    params: { id, type = UserKey.PHOTOS }
  }
}) => {
  const [defaultBg] = useState(randomImage)
  const dispatch = useDispatch()
  const switchHandler = useCallback(
    (v: string) => {
      push(`/users/${id}/${v}`)
    },
    [id, push]
  )
  const details = useShallowSelector(selectUserDetails)

  useEffect(() => {
    dispatch(fetchUser(id))
  }, [dispatch, id])

  return (
    <article className="p_user">
      <section className="p_user_header">
        <div
          className="p_user_banner"
          style={{
            backgroundImage: details.bannerUrl || `url(${defaultBg})`
          }}
        />
        {!details.username ? (
          <Skeleton height="100px" />
        ) : (
          <div className="p_user_box">
            <Avatar url={details.avatarUrl} className="p_user_avatar" />
            <div className="p_user_ibox">
              <div className="p_user_info">
                <Typography variant="h5">{details.nickname}</Typography>
                {renderGenderIcon(details.gender)}
                <Typography className="p_user_info_joined" variant="caption">
                  {day(details.joinedAt).format('YYYY/MM/DD')} 加入
                </Typography>
                {details.logged && <Button icon="cog">编辑资料</Button>}
              </div>
              <Typography variant="body2" className="p_user_bio">
                {details.bio}
              </Typography>
              <div className="p_user_meta">
                <div className="p_user_meta_item">
                  <FontAwesomeIcon
                    className="p_user_meta_item_icon"
                    icon="star"
                    size="xs"
                  />
                  <Typography variant="caption">{`获得收藏${details.likedCount ||
                    0}次`}</Typography>
                </div>
                <div className="p_user_meta_item">
                  <FontAwesomeIcon
                    className="p_user_meta_item_icon"
                    icon="eye"
                    size="xs"
                  />
                  <Typography variant="caption">{`图片被浏览${details.viewedCount ||
                    0}次`}</Typography>
                </div>
              </div>
            </div>
          </div>
        )}
        {details.username && (
          <Tabs value={type} onChange={switchHandler} className="p_user_tabs">
            <Tab value={UserKey.PHOTOS} sub={details.photoCount}>
              相片
            </Tab>
            <Tab value={UserKey.ALBUMS} sub={details.albumCount}>
              相册
            </Tab>
            <Tab value={UserKey.FAVORITES} sub={details.likeCount}>
              收藏
            </Tab>
            {details.logged && <Tab value="settings">设置</Tab>}
          </Tabs>
        )}
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
