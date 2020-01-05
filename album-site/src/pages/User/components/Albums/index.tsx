import React, { FC, memo, useEffect, useCallback } from 'react'
import Menu, { Item } from 'components/Menu'
import Switch from 'components/Switch'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchUserAlbums } from 'store/actions'
import { selectUserAlbums } from 'store/reducers/user'
import StatefulList from 'components/StatefulList'
import useShallowSelector from 'hooks/useShallowSelector'
import { hasMore, isListError, isListInitError } from 'store/reducers/list'
import { FETCH_USER_ALBUMS } from 'store/constants'
import ActionCard from '../ActionCard'
import './index.scss'

const Albums: FC = () => {
  const { id: username } = useParams()
  const dispatch = useDispatch()
  const albums = useShallowSelector(selectUserAlbums)
  const done = !useShallowSelector(hasMore(FETCH_USER_ALBUMS))
  const error = useShallowSelector(isListError(FETCH_USER_ALBUMS))
  const initError = useShallowSelector(isListInitError(FETCH_USER_ALBUMS))

  const reloadHandler = useCallback(() => {
    dispatch(fetchUserAlbums(false, { username }))
  }, [dispatch, username])
  const loadMoreHandler = useCallback(() => {
    dispatch(fetchUserAlbums(true, { username }))
  }, [dispatch, username])
  const deleteHandler = useCallback(
    (albumId: string) => () => {
      console.log(albumId)
    },
    []
  )
  const visibilityHandler = useCallback(
    (albumId: string) => () => {
      // dispatch()
    },
    []
  )

  useEffect(reloadHandler, [reloadHandler])

  return (
    <StatefulList
      onReload={reloadHandler}
      onLoadMore={loadMoreHandler}
      empty={albums.length === 0}
      done={done}
      error={error}
      initError={initError}
    >
      <div className="pu_albums">
        {albums.map(album => (
          <ActionCard
            key={album.id}
            className="pu_albums_item"
            title={album.title}
            imageUrl={album.imageUrl}
            actions={
              <Menu>
                <Item
                  to={`/edit/albums/${album.albumId}`}
                  color="blue"
                  icon="edit"
                >
                  编辑
                </Item>
                <Item color="blue" icon="plus">
                  添加相片
                </Item>
                <Item color="blue" icon="shield-alt">
                  <div className="pu_albums_item_mi">
                    <span>私人</span>
                    <Switch
                      onChange={visibilityHandler(album.albumId)}
                      defaultChecked={album.personal}
                    />
                  </div>
                </Item>
                <Item variant="divider" />
                <Item
                  onClick={deleteHandler(album.albumId)}
                  color="danger"
                  icon="trash"
                >
                  删除
                </Item>
              </Menu>
            }
          />
        ))}
      </div>
    </StatefulList>
  )
}

export default memo(Albums)
