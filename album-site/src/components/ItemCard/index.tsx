import React, { FC, memo, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSpring, animated } from 'react-spring'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Typography from 'components/Typography'
import { readableTimeFormatter, insertBetween } from 'utils'
import './index.scss'

interface ItemCardProps {
  isAlbum?: boolean
  imgUrl: string
  title: string
  id: string
  createdAt?: number | string
  avatarUrl?: string
  nickname?: string
  userId?: string
  meta?: string[]
  className?: string
}

const trans = (x: number, y: number, s: number): string =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

const ItemCard: FC<ItemCardProps> = ({
  className,
  imgUrl,
  title,
  id,
  userId,
  avatarUrl,
  nickname,
  createdAt,
  meta = [],
  isAlbum = false
}) => {
  const ref = useRef<HTMLDivElement>()
  const [style, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: {
      mass: 5,
      tension: 350,
      friction: 40
    }
  }))

  const moveHandler = useCallback(
    ({ clientX: x, clientY: y }): void => {
      const { width, height, left, top } = ref.current.getBoundingClientRect()
      set({
        xys: [
          ((height / 2 + top - y) * 20) / height,
          ((x - left - width / 2) * 20) / width,
          1.1
        ]
      })
    },
    [set]
  )

  const leaveHandler = useCallback(() => {
    set({ xys: [0, 0, 1] })
  }, [set])

  const url = (isAlbum ? '/albums/' : '/photos/') + id

  return (
    <div className={clsx('icard', className)}>
      <animated.div
        ref={ref}
        className="icard_pbox"
        onMouseMove={moveHandler}
        onMouseLeave={leaveHandler}
        style={{
          transform: style.xys.interpolate(trans as any)
        }}
      >
        <Link
          className="icard_picBox"
          to={{ pathname: url, state: { a: [{ b: 1, c: 2 }] } }}
        >
          <img alt={title} src={imgUrl} />
        </Link>
        {isAlbum && <FontAwesomeIcon className="icard_album" icon="images" />}
      </animated.div>
      <div className="icard_tbox">
        <Link to={'/users/' + userId}>
          <img className="icard_avatar" alt={nickname} src={avatarUrl} />
        </Link>
        <div>
          <Typography variant="subtitle2" gutterBottom="small" title={title}>
            <Link to={url}>{title}</Link>
          </Typography>
          <Typography
            variant="body2"
            color="secondary"
            gutterBottom="small"
            title={nickname}
          >
            <Link to={'/users/' + userId}>{nickname}</Link>
          </Typography>
          <Typography variant="caption">
            {readableTimeFormatter(createdAt)}
            {meta.length > 0 && <span className="icard_dot">•</span>}
            {insertBetween(meta, <span className="icard_dot">•</span>)}
          </Typography>
        </div>
      </div>
    </div>
  )
}

export default memo(ItemCard)
