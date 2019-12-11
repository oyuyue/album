import React, { FC, memo, HTMLAttributes } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import Typography from 'components/Typography'
import './index.scss'

interface ChipProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'outlined'
  size?: 'small' | 'midden' | 'big'
  closeable?: boolean
  color?: 'primary' | 'secondary'
  onClose?: () => void
}

const Chip: FC<ChipProps> = ({
  variant,
  className,
  children,
  size = 'midden',
  color,
  closeable,
  onClose,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={clsx(
        'chip',
        `chip-${size}`,
        variant && `chip-${variant}`,
        color && `chip-${color}`,
        className
      )}
    >
      <Typography
        className="chip_text"
        variant={size === 'small' ? 'caption' : 'subtitle2'}
      >
        {children}
      </Typography>
      {closeable && (
        <FontAwesomeIcon
          size={size === 'small' ? 'sm' : 'lg'}
          className="chip_icon"
          icon="times-circle"
        />
      )}
    </div>
  )
}

export default memo(Chip)
