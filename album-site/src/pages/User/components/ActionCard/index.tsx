import React, { FC, memo, HTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import Typography from 'components/Typography'
import Button from 'components/Button'
import Dropdown from 'components/Dropdown'
import Chip from 'components/Chip'
import './index.scss'
import { Tag } from 'types/entity'

interface ActionCardProps extends HTMLAttributes<HTMLElement> {
  actions?: ReactNode
  imageUrl: string
  title: string
  time?: string
  view?: number
  tags?: Tag[]
  link?: string
}

const ActionCard: FC<ActionCardProps> = ({
  className,
  actions,
  imageUrl,
  title,
  link,
  view,
  time,
  tags
}) => {
  return (
    <div className={clsx('ac', className)}>
      <div className="ac_pbox">
        <Link to={link}>
          <img className="ac_image" alt="" src={imageUrl} />
        </Link>
      </div>
      <div>
        <div className="ac_tbox">
          <Typography variant="subtitle1" className="ac_title">
            {title}
          </Typography>
          <Dropdown overlay={actions} horizontal="right" vertical="bottom">
            <Button icon="ellipsis-v" />
          </Dropdown>
        </div>
        <Typography className="ac_meta" variant="caption">
          创建时间
        </Typography>
        <div className="ac_tags">
          {Array.isArray(tags) &&
            tags.map(tag => (
              <Chip key={tag.id} className="ac_tag">
                {tag.name}
              </Chip>
            ))}
        </div>
      </div>
    </div>
  )
}

export default memo(ActionCard)
