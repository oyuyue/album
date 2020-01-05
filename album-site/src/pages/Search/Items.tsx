import React, { FC, memo } from 'react'
import StatefulList from 'components/StatefulList'
import useShallowSelector from 'hooks/useShallowSelector'
import { readableTimeFormatter } from 'utils'

const Items: FC = () => {
  return (
    <StatefulList>
      {/* {(content as any[]).map(
        ({
          id,
          title,
          nickname,
          bio,
          views,
          stars,
          createdTime,
          imageUrl,
          avatarUrl
        }) => (
          <SearchItem
            circle={type === SearchKey.USERS}
            imageUrl={type === SearchKey.USERS ? avatarUrl : imageUrl}
            key={id}
            url={`/${type}/${id}`}
            title={type === SearchKey.USERS ? nickname : title}
            sub={
              type === SearchKey.USERS
                ? bio
                : readableTimeFormatter(createdTime) +
                  (type === SearchKey.ALBUMS
                    ? ''
                    : ` · ${views}次查看 · ${stars}收藏`)
            }
          />
        )
      )} */}
    </StatefulList>
  )
}

export default memo(Items)
