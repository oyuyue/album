import React, {
  FC,
  memo,
  useState,
  useEffect,
  useRef,
  HTMLAttributes,
  ReactNode
} from 'react'
import clsx from 'clsx'
import './index.scss'

interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  overlay?: ReactNode
  trigger?: 'click'
  vertical?: 'top' | 'bottom'
  horizontal?: 'left' | 'right'
}

const Dropdown: FC<DropdownProps> = ({
  children,
  overlay,
  trigger = 'click',
  vertical = 'top',
  horizontal = 'left'
}) => {
  const [show, set] = useState(false)
  const [h, setH] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handler(ev: DocumentEventMap['click']): void {
      if (!ref.current.contains(ev.target as Node)) {
        set(false)
      } else if (!menuRef.current.contains(ev.target as Node)) {
        set(s => !s)
      }
    }
    setH(ref.current.offsetHeight)
    document.addEventListener(trigger, handler)
    return () => document.removeEventListener(trigger, handler)
  }, [trigger])

  return (
    <div ref={ref} className="dropdown">
      {children}
      <div
        ref={menuRef}
        className={clsx(
          'dropdown_menus',
          show && 'dropdown_menus-active',
          `dropdown_menus-${vertical}`,
          `dropdown_menus-${horizontal}`
        )}
        style={{
          marginBottom: vertical === 'bottom' ? h + 8 : 0
        }}
      >
        {overlay}
      </div>
    </div>
  )
}

export default memo(Dropdown)
