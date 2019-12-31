import React, { FC, memo, ReactNode } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import './index.scss'

interface SpinProps {
  children?: ReactNode
  spinning?: boolean
  size?: 'small' | 'middle' | 'big'
  className?: string
}

const Spin: FC<SpinProps> = ({
  spinning = true,
  size = 'middle',
  children,
  className
}) => {
  return (
    <div className={clsx('spin', children && 'spin-posed', className)}>
      <div className="spin_mask" hidden={!spinning}>
        <FontAwesomeIcon
          size={size === 'small' ? '1x' : size === 'big' ? '3x' : '2x'}
          spin
          icon="sync-alt"
        />
      </div>
      {children}
    </div>
  )
}

export default memo(Spin)
