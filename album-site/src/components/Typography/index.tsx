import { FC, memo, createElement, HTMLAttributes } from 'react'
import clsx from 'clsx'
import './index.scss'

const variantMap = {
  h1: 'h2',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  caption: 'p'
}

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'caption'
  gutterBottom?: 'small' | 'midden' | 'big'
  bold?: boolean
}

const Typography: FC<TypographyProps> = ({
  variant = 'h2',
  children,
  className,
  gutterBottom,
  color,
  bold,
  ...rest
}) =>
  createElement(
    variantMap[variant],
    {
      className: clsx(
        'typography',
        variant && `typography-${variant}`,
        gutterBottom && `typography-gap-${gutterBottom}`,
        color && `typography-color-${color}`,
        bold && 'typography-bold',
        className
      ),
      ...rest
    },
    children
  )

export default memo(Typography)
