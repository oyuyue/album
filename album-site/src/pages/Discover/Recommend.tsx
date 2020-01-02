import React, { FC, memo, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import useShallowSelector from 'hooks/useShallowSelector'
import ItemCard from 'components/ItemCard'
import Typography from 'components/Typography'
import StatefulList from 'components/StatefulList'
import { fetchRecommendPhotos, fetchMoreRecommendPhotos } from 'store/actions'
import { StateableStatus } from 'store/hors/stateable'
import { selectRecommend } from 'store/reducers/photo/recommend'

const Recommend: FC = () => {
  const dispatch = useDispatch()
  const { hasMore, content, status } = useShallowSelector(selectRecommend)
  const reloadHandler = useCallback(() => {
    dispatch(fetchRecommendPhotos())
  }, [dispatch])
  const loadMoreHandler = useCallback(() => {
    dispatch(fetchMoreRecommendPhotos())
  }, [dispatch])

  useEffect(reloadHandler, [reloadHandler])

  return (
    <section className="discover_recommend">
      <div className="discover_heading">
        <Typography variant="h6" bold>
          推荐
        </Typography>
      </div>
      <StatefulList
        onReload={reloadHandler}
        onLoadMore={loadMoreHandler}
        empty={content.length === 0 && !hasMore}
        initError={status === StateableStatus.ERROR}
        done={!hasMore}
      >
        <div className="discover_items">
          {content.map(x => (
            <ItemCard
              className="discover_citem"
              key={x.id}
              id={x.id}
              title={x.title}
              imgUrl={x.imageUrl}
              meta={[x.views + '次查看']}
              createdAt={x.createdTime}
              userId={x.user.id}
              avatarUrl={x.user.avatarUrl}
              nickname={x.user.nickname}
            />
          ))}
        </div>
      </StatefulList>
    </section>
  )
}

export default memo(Recommend)
