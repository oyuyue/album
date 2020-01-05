import React, { FC, memo } from 'react'

interface ItemProps {
  sort: string
  tags: string[]
}

const Photos: FC<ItemProps> = ({ sort, tags }) => {
  return (
    <div>
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
    </div>
  )
}

export default memo(Photos)
