import React, { FC, memo, useEffect } from 'react'
import Menu, { Item } from 'components/Menu'
import Switch from 'components/Switch'
import './index.scss'
import { useDispatch } from 'react-redux'
import { fetchUserStuffs } from 'store/actions'
import { UserKey } from 'store/reducers/user'
import ActionCard from '../ActionCard'

const Albums: FC = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchUserStuffs(UserKey.ALBUMS))
  }, [dispatch])

  return (
    <div className="pu_albums">
      <ActionCard
        className="pu_albums_item"
        actions={
          <Menu>
            <Item color="blue" icon="edit">
              编辑
            </Item>
            <Item color="blue" icon="plus">
              添加相片
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
  )
}

export default memo(Albums)
