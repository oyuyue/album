import React, { FC, memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface ItemProps {
  imageUrl?: string
}

const Item: FC<ItemProps> = ({ imageUrl }) => {
  // return <img alt="" draggable={false} src={imageUrl} />
  return <FontAwesomeIcon size="2x" spin icon="sync-alt" />
}

export default memo(Item)
