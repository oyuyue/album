import React, { FC, memo } from 'react'
import Menu, { Item } from 'components/Menu'
import Switch from 'components/Switch'
import ActionCard from '../ActionCard'

const Photos: FC = () => {
  return (
    <div className="pu_photos">
      <div className="pu_photos_head"></div>
      <div className="pu_photos_items">
        <ActionCard
          className="pu_albums_item"
          actions={
            <Menu>
              <Item color="blue" icon="edit">
                编辑
              </Item>
              <Item color="blue" icon="shield-alt">
                <div className="pu_albums_item_mi">
                  <span>私人</span>
                  <Switch />
                </div>
              </Item>
              <Item variant="divider" />
              <Item color="danger" icon="trash">
                删除
              </Item>
            </Menu>
          }
        />
      </div>
    </div>
  )
}

export default memo(Photos)
