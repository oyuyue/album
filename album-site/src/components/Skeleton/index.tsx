import React, { FC, memo, HTMLAttributes, CSSProperties } from 'react'
import clsx from 'clsx'
import './index.scss'

interface SkeletonProps extends HTMLAttributes<HTMLElement> {
  variant?: 'rect' | 'circle' | 'round'
  height?: CSSProperties['height']
  width?: CSSProperties['width']
}

const Skeleton: FC<SkeletonProps> = ({
  className,
  variant,
  children,
  style,
  width,
  height,
  ...rest
}) => {
  return (
    <div
      {...rest}
      style={{ ...style, width, height }}
      className={clsx('skeleton', variant && `skeleton-${variant}`, className)}
    >
      {children}
    </div>
  )
}

export default memo(Skeleton)
