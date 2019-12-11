import React, { FC, memo, Children, ReactElement, ReactNode } from 'react'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './index.scss'

interface MenuProps {
  pure?: boolean
  className?: string
  children?: ReactNode
}

const Menu: FC<MenuProps> = ({
  children,
  className,
  pure = false,
  ...rest
}) => {
  return (
    <ul {...rest} className={clsx('menu', pure && 'menu-pure', className)}>
      {Children.map(
        children as ReactElement,
        (
          {
            key,
            props: { children, icon, color, variant, suffixIcon, ...rest }
          },
          i
        ) => (
          <li
            {...rest}
            key={key || i}
            className={clsx(
              'menu_item',
              color && `menu_item-${color}`,
              variant && `menu_item-${variant}`
            )}
          >
            {icon && (
              <FontAwesomeIcon
                className="menu_item_icon-p"
                fixedWidth
                icon={icon}
              />
            )}
            <div className="menu_item_content">{children}</div>
            {suffixIcon && (
              <FontAwesomeIcon
                className="menu_item_icon-s"
                fixedWidth
                icon={suffixIcon}
              />
            )}
          </li>
        )
      )}
    </ul>
  )
}

export { default as Item } from './Item'
export default memo(Menu)
