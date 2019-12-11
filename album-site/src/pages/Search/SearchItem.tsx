import React, { FC, memo } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import Typography from 'components/Typography'

interface SearchItemProps {
  circle?: boolean
  title?: string
  sub?: string
  imageUrl?: string
  url?: string
}

const SearchItem: FC<SearchItemProps> = ({
  url,
  imageUrl,
  circle,
  title,
  sub
}) => {
  return (
    <div className={clsx('searchItem', circle && 'searchItem-circle')}>
      <Link to={url}>
        <img className="searchItem_image" alt="" src={imageUrl} />
      </Link>
      <div className="searchItem_info">
        <Link to={url}>
          <Typography className="searchItem_title" variant="subtitle1">
            {title}
          </Typography>
        </Link>
        <Typography variant="caption">{sub}</Typography>
      </div>
    </div>
  )
}

export default memo(SearchItem)
