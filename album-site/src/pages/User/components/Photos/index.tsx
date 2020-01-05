import React, { FC, memo } from 'react'
import Menu, { Item } from 'components/Menu'
import Switch from 'components/Switch'

const Photos: FC = () => {
  return (
    <div className="pu_photos">
      <div className="pu_photos_head"></div>
      <div className="pu_photos_items"></div>
    </div>
  )
}

export default memo(Photos)
