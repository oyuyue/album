import React, { FC, memo, useEffect, useCallback } from 'react'
import Menu, { Item } from 'components/Menu'
import Switch from 'components/Switch'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchUserPhotos } from 'store/actions'
import { selectUserPhotos } from 'store/reducers/user'
import StatefulList from 'components/StatefulList'
import useShallowSelector from 'hooks/useShallowSelector'
import { hasMore, isListError, isListInitError } from 'store/reducers/list'
import { FETCH_USER_PHOTOS } from 'store/constants'
import ActionCard from '../ActionCard'
import './index.scss'

const Photos: FC = () => {
  const { id: username } = useParams()
  const dispatch = useDispatch()
  const photos = useShallowSelector(selectUserPhotos)
  const done = !useShallowSelector(hasMore(FETCH_USER_PHOTOS))
  const error = useShallowSelector(isListError(FETCH_USER_PHOTOS))
  const initError = useShallowSelector(isListInitError(FETCH_USER_PHOTOS))

  const reloadHandler = useCallback(() => {
    dispatch(fetchUserPhotos(false, { username }))
  }, [dispatch, username])
  const loadMoreHandler = useCallback(() => {
    dispatch(fetchUserPhotos(true, { username }))
  }, [dispatch, username])
  const deleteHandler = useCallback(
    (photoId: string) => () => {
      console.log(photoId)
    },
    []
  )
  const visibilityHandler = useCallback(
    (photoId: string) => () => {
      // dispatch()
    },
    []
  )

  useEffect(reloadHandler, [reloadHandler])

  return (
    <StatefulList
      onReload={reloadHandler}
      onLoadMore={loadMoreHandler}
      empty={photos.length === 0}
      done={done}
      error={error}
      initError={initError}
    >
      <div className="pu_photos">
        {photos.map(photo => (
          <ActionCard
            key={photo.id}
            className="pu_photos_item"
            title={photo.title}
            imageUrl={photo.imageUrl}
            actions={
              <Menu>
                <Item
                  to={`/edit/photos/${photo.photoId}`}
                  color="blue"
                  icon="edit"
                >
                  编辑
                </Item>
                <Item color="blue" icon="plus">
                  添加相片
                </Item>
                <Item color="blue" icon="shield-alt">
                  <div className="pu_photos_item_mi">
                    <span>私人</span>
                    <Switch
                      onChange={visibilityHandler(photo.photoId)}
                      defaultChecked={photo.personal}
                    />
                  </div>
                </Item>
                <Item variant="divider" />
                <Item
                  onClick={deleteHandler(photo.photoId)}
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

export default memo(Photos)
