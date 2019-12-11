import React, { FC, memo, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import ItemCard from 'components/ItemCard'
import Loading from 'components/Loading'
import ErrorReload from 'components/ErrorReload'
import useShallowSelector from 'hooks/useShallowSelector'
import { StateableStatus } from 'store/hors/stateable'
import {
  fetchMorePhotos,
  fetchMoreAlbums,
  fetchAlbums,
  fetchPhotos
} from 'store/actions'
import { readableTimeFormatter } from 'utils'
import { isNumber } from 'lodash-es'
import { selectAlbums } from 'store/reducers/album/browse'
import { selectPhotos } from 'store/reducers/photo/browse'
import { RootState } from 'store/reducers'
import { Photo } from 'types/entity'
import { PathnameType } from '.'

interface ItemProps {
  type: PathnameType
  sort: string
  tags: string[]
}

const Photos: FC<ItemProps> = ({ type, sort, tags }) => {
  const dispatch = useDispatch()
  const { status, hasMore, content } = useShallowSelector<
    RootState,
    ReturnType<typeof selectAlbums> | ReturnType<typeof selectPhotos>
  >(type === PathnameType.ALBUMS ? selectAlbums : selectPhotos)

  const loadMoreHandler = useCallback(() => {
    dispatch(
      type === PathnameType.ALBUMS ? fetchMoreAlbums() : fetchMorePhotos()
    )
  }, [dispatch, type])

  const reloadHandler = useCallback(() => {
    const payload = { tags, sort }
    dispatch(
      type === PathnameType.ALBUMS ? fetchAlbums(payload) : fetchPhotos(payload)
    )
  }, [dispatch, sort, tags, type])

  useEffect(reloadHandler, [reloadHandler])

  return (
    <div>
      {status === StateableStatus.INIT_ERROR && content.length === 0 && (
        <ErrorReload onReload={reloadHandler} />
      )}
      <section className="browse_items">
        {/* {(content as (Photo[])).map(x => (
          <ItemCard
            className="discover_citem"
            key={x.id}
            url={x.id}
            title={x.title}
            imgUrl={x.imageUrl}
            time={readableTimeFormatter(x.createdTime)}
            secondaryImgUrl={x.user.avatarUrl}
            secondaryTitle={x.user.nickname}
          />
        ))} */}
      </section>
      {hasMore && (
        <Loading
          onLoadMore={loadMoreHandler}
          error={status === StateableStatus.ERROR}
        />
      )}
    </div>
  )
}

export default memo(Photos)
