import React, { FC, memo, ButtonHTMLAttributes } from 'react'
import {
  FontAwesomeIcon,
  FontAwesomeIconProps
} from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import './index.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'text' | 'outlined' | 'contained' | 'round' | 'circle'
  color?: 'primary' | 'secondary' | 'blue' | 'danger' | 'white'
  size?: 'small' | 'big'
  icon?: FontAwesomeIconProps['icon']
  suffixIcon?: FontAwesomeIconProps['icon']
  iconProps?: Omit<FontAwesomeIconProps, 'icon'>
  suffixIconProps?: Omit<FontAwesomeIconProps, 'icon'>
  block?: boolean
}

const Button: FC<ButtonProps> = ({
  className,
  icon,
  suffixIcon,
  iconProps,
  suffixIconProps,
  color,
  size,
  children,
  variant = 'text',
  block,
  type = 'button',
  ...rest
}) => {
  return (
    <button
      {...rest}
      type={type}
      className={clsx(
        'btn',
        variant && `btn-${variant}`,
        color && `btn-${color}`,
        size && `btn-${size}`,
        block && 'btn-block',
        className
      )}
    >
      {icon && (
        <FontAwesomeIcon
          size={size === 'small' ? 'sm' : 'lg'}
          {...iconProps}
          className="btn_icon"
          icon={icon}
        />
      )}
      {children && <span className="btn_content">{children}</span>}
      {suffixIcon && (
        <FontAwesomeIcon
          size={size === 'small' ? 'sm' : 'lg'}
          {...suffixIconProps}
          className="btn_icon"
          icon={icon}
        />
      )}
    </button>
  )
}

export default memo(Button)
