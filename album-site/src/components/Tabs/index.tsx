import React, {
  FC,
  useState,
  useRef,
  useEffect,
  useCallback,
  memo,
  ReactNode,
  Children,
  HTMLAttributes,
  ReactElement
} from 'react'
import clsx from 'clsx'
import Typography from 'components/Typography'
import './index.scss'

interface TabsProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  children?: ReactNode
  value?: any
  onChange?: (n: any) => void
}

const Tabs: FC<TabsProps> = ({
  className,
  children,
  onChange,
  value,
  ...rest
}) => {
  const [lw, setLw] = useState(() => [0, 0])
  const ref = useRef<HTMLLIElement[]>([])
  const onClick = useCallback(
    (v: any) => () => {
      if (!Object.is(v, value)) onChange && onChange(v)
    },
    [onChange, value]
  )

  useEffect(() => {
    try {
      let current = 0
      Children.forEach(
        children as ReactElement,
        ({ props: { value: v } }, i) => {
          if (Object.is(v, value)) current = i
        }
      )
      setLw([ref.current[current].offsetLeft, ref.current[current].offsetWidth])
    } catch (ignored) {}
  }, [children, value])

  return (
    <div {...rest} className={clsx('tabs', className)}>
      <ul className="tabs_list">
        {Children.map(
          children as ReactElement,
          ({ key, props: { children, sub, value: v } }, i) => (
            <li
              key={key || v}
              ref={n => (ref.current[i] = n)}
              onClick={onClick(v)}
              className={clsx(
                'tabs_item',
                Object.is(v, value) && 'tabs_item-active'
              )}
            >
              {children}
              {sub && (
                <Typography className="tabs_item_sub" variant="caption">
                  {sub}
                </Typography>
              )}
            </li>
          )
        )}
      </ul>
      <span
        style={{ left: lw[0], width: lw[1] }}
        className="tabs_indicator"
      ></span>
    </div>
  )
}

export { default as Tab } from './Tab'
export default memo(Tabs)
