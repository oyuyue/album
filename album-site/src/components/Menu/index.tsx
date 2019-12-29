import React, {
  FC,
  memo,
  Children,
  ReactElement,
  ReactNode,
  useCallback,
  useMemo
} from 'react'
import { push } from 'connected-react-router'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './index.scss'
import { isObject, isFunction } from 'lodash-es'
import { useDispatch } from 'react-redux'

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
  const childs = useMemo(
    () => Children.toArray(children as ReactElement).filter(x => isObject(x)),
    [children]
  )
  const dispatch = useDispatch()
  const itemClickHandler = useCallback(
    (i: number) => (ev: Event) => {
      if (childs[i]) {
        const props = childs[i].props
        if (props.to) {
          dispatch(push(props.to))
        }
        if (isFunction(props.onClick)) {
          props.onClick(ev)
        }
      }
    },
    [childs, dispatch]
  )

  return (
    <ul {...rest} className={clsx('menu', pure && 'menu-pure', className)}>
      {childs.map(
        (
          {
            key,
            props: { children, icon, color, variant, suffixIcon, ...rest }
          },
          i
        ) => (
          <li
            {...rest}
            onClick={itemClickHandler(i)}
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
