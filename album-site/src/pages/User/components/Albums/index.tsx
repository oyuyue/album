import React, { FC, memo, useEffect } from 'react'
import Menu, { Item } from 'components/Menu'
import Switch from 'components/Switch'
import './index.scss'
import { useDispatch } from 'react-redux'
import { fetchUserStuffs } from 'store/actions'
import { UserKey, selectUserAlbums } from 'store/reducers/user'
import StatefulList from 'components/StatefulList'
import useShallowSelector from 'hooks/useShallowSelector'
import { hasMore, isListError, isListInitError } from 'store/reducers/list'
import { FETCH_USER_ALBUMS } from 'store/constants'
import ActionCard from '../ActionCard'

const Albums: FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUserStuffs(UserKey.ALBUMS))
  }, [dispatch])
  const albums = useShallowSelector(selectUserAlbums)
  const done = !useShallowSelector(hasMore(FETCH_USER_ALBUMS))
  const error = useShallowSelector(isListError(FETCH_USER_ALBUMS))
  const initError = useShallowSelector(isListInitError(FETCH_USER_ALBUMS))

  return (
    <StatefulList done={done} error={error} initError={initError}>
      <div className="pu_albums">
        <ActionCard
          className="pu_albums_item"
          actions={
            <Menu>
              <Item color="blue" icon="edit">
                编辑
              </Item>
              <Item color="blue" icon="plus">
                添加相片
              </Item>
              <Item color="blue" icon="shield-alt">
                <div className="pu_albums_item_mi">
                  <span>私人</span>
                  <Switch />
                </div>
              </Item>
              <Item variant="divider" />
              <Item color="danger" icon="trash">
                删除
              </Item>
            </Menu>
          }
        />
      </div>
    </StatefulList>
  )
}

export default memo(Albums)
