import React, { FC, memo, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchBanners } from 'store/actions'
import Carousel from 'components/Carousel'
import JumpLink from 'components/JumpLink'
import useShallowSelector from 'hooks/useShallowSelector'
import { StateableStatus } from 'store/hors/stateable'
import { selectBanner } from 'store/reducers/banner'

const Banner: FC = () => {
  const dispatch = useDispatch()
  const { status, state } = useShallowSelector(selectBanner)
  useEffect(() => {
    dispatch(fetchBanners())
  }, [dispatch])

  return status === StateableStatus.SUCCESS && state.length === 0 ? null : (
    <section className="discover_banner">
      <Carousel
        dataSource={state}
        renderItem={({ imageUrl, url }) => (
          <JumpLink url={url}>
            <img alt="" src={imageUrl} />
          </JumpLink>
        )}
      />
    </section>
  )
}

export default memo(Banner)
