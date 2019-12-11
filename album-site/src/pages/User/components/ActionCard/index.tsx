import React, { FC, memo, HTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import Typography from 'components/Typography'
import Button from 'components/Button'
import Dropdown from 'components/Dropdown'
import Chip from 'components/Chip'
import './index.scss'

interface ActionCardProps extends HTMLAttributes<HTMLElement> {
  actions?: ReactNode
}

const ActionCard: FC<ActionCardProps> = ({ className, actions }) => {
  return (
    <div className={clsx('ac', className)}>
      <div className="ac_pbox">
        <Link to="/">
          <img
            className="ac_image"
            alt=""
            src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=859827503,3362795753&fm=15&gp=0.jpg"
          />
        </Link>
      </div>
      <div>
        <div className="ac_tbox">
          <Typography variant="subtitle1" className="ac_title">
            标题
          </Typography>
          <Dropdown overlay={actions} horizontal="right" vertical="bottom">
            <Button icon="ellipsis-v" />
          </Dropdown>
        </div>
        <Typography className="ac_meta" variant="caption">
          创建时间
        </Typography>
        <div className="ac_tags">
          <Chip className="ac_tag">风景</Chip>
          <Chip className="ac_tag">人物</Chip>
        </div>
      </div>
    </div>
  )
}

export default memo(ActionCard)
