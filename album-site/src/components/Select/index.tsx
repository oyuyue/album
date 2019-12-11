import React, {
  FC,
  memo,
  Children,
  useEffect,
  useState,
  useRef,
  HTMLAttributes,
  ReactElement,
  useCallback,
  FormEventHandler
} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isFunction } from 'lodash-es'
import clsx from 'clsx'
import './index.scss'
import Chip from 'components/Chip'
import Loading from 'components/Loading'

interface SelectProps extends HTMLAttributes<HTMLDivElement> {
  multiple?: boolean
  value?: any | any[]
  onChange: (value: any) => void
  onSearch?: (value: any) => void
  onFocus?: () => void
  onBlur?: () => void
  loading?: boolean
  loadError?: boolean
  onReload?: () => void
  placeholder?: string
  fillWidth?: boolean
}

const Select: FC<SelectProps> = ({
  multiple,
  className,
  onChange,
  onSearch,
  onFocus,
  onBlur,
  onReload,
  loading = false,
  loadError = false,
  value,
  children,
  fillWidth = false,
  placeholder = '搜索'
}) => {
  const [inputValue, setInputValue] = useState('')
  const [active, setActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>()
  const wrapperRef = useRef<HTMLDivElement>()

  const inputHandler = useCallback<FormEventHandler>(
    ({ target }) => {
      onSearch && onSearch((target as HTMLInputElement).value)
      setInputValue((target as HTMLInputElement).value)
    },
    [onSearch]
  )

  const selectHandler = useCallback(
    (v: string | number) => () => {
      if (multiple) {
        const nv = Array.isArray(value) ? [...value] : []
        const i = nv.indexOf(v)
        if (i > -1) {
          nv.splice(i, 1)
        } else {
          nv.push(v)
        }
        onChange([...nv])
      } else if (value !== v) {
        onChange(v)
        setTimeout(() => {
          setActive(false)
          if (inputRef.current && isFunction(inputRef.current.blur)) {
            inputRef.current.blur()
          }
        })
      }
    },
    [multiple, onChange, value]
  )

  useEffect(() => {
    function clickHandler(ev: DocumentEventMap['click']): void {
      if (wrapperRef.current.contains(ev.target as Node)) {
        setActive(true)
        inputRef.current.focus()
        onFocus && onFocus()
      } else {
        setActive(false)
        setInputValue('')
        onBlur && onBlur()
      }
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  }, [onBlur, onFocus])

  const options =
    Children.map(
      children as ReactElement,
      ({ key, props: { children, label, value, ...rest } }) => ({
        key: key || value,
        children,
        label,
        value,
        props: rest
      })
    ) || []

  const selected = options.filter(({ value: v }) =>
    Array.isArray(value) ? value.includes(v) : value === v
  )
  const firstSelectedValue =
    !multiple && selected[0] ? selected[0].label || selected[0].children : ''

  return (
    <div
      ref={wrapperRef}
      className={clsx(
        'select',
        className,
        active && 'select-active',
        fillWidth && 'select-fillWidth'
      )}
    >
      <div className="select_box">
        {multiple && selected.length === 0 && (
          <FontAwesomeIcon className="select_box_icon" icon="search" />
        )}
        {multiple &&
          selected.map(({ key, label, children, value }) => (
            <Chip
              key={key}
              className="select_chip"
              closeable
              size="small"
              onClick={selectHandler(value)}
            >
              {label || children}
            </Chip>
          ))}
        <input
          ref={inputRef}
          value={inputValue || (!active ? firstSelectedValue : '')}
          onChange={inputHandler}
          className="select_input"
          placeholder={
            multiple && selected.length > 0
              ? ''
              : active
              ? firstSelectedValue || placeholder
              : placeholder
          }
        />
        {!multiple && (
          <FontAwesomeIcon
            size="lg"
            className="select_box_icon"
            icon="angle-down"
          />
        )}
      </div>
      <div className="select_dropdown">
        {loading ? (
          <Loading
            disableLoadMore
            error={loadError}
            onLoadMore={onReload}
            className="select_loading"
          />
        ) : (
          options
            .filter(({ children, label }) => {
              const lv = inputValue.toLowerCase()
              return (
                (label && label.toLowerCase().includes(lv)) ||
                (children &&
                  children
                    .toString()
                    .toLowerCase()
                    .includes(lv))
              )
            })
            .map(
              ({
                key,
                children,
                value: v,
                props: { className, icon, ...rest }
              }) => (
                <div
                  {...rest}
                  tabIndex={0}
                  key={key}
                  onClick={selectHandler(v)}
                  className={clsx(
                    'select_dropdown_item',
                    (Array.isArray(value) ? value.includes(v) : value === v) &&
                      'select_dropdown_item-active',
                    className
                  )}
                >
                  {icon && (
                    <FontAwesomeIcon
                      className="select_dropdown_item_icon"
                      icon={icon}
                    />
                  )}
                  {children}
                  <FontAwesomeIcon
                    className="select_dropdown_item_check"
                    icon="check"
                  />
                </div>
              )
            )
        )}
      </div>
    </div>
  )
}

export { default as Option } from './Option'
export default memo(Select)
