import React, {
  FC,
  memo,
  useCallback,
  useState,
  ReactNode,
  InputHTMLAttributes,
  ChangeEvent
} from 'react'
import clsx from 'clsx'
import './index.scss'
import Typography from 'components/Typography'

export interface InputProps
  extends Omit<Omit<InputHTMLAttributes<HTMLElement>, 'size'>, 'prefix'> {
  className?: string
  size?: 'small' | 'big'
  label?: string | number
  textarea?: boolean
  gapBottom?: 'small' | 'midden' | 'big'
  round?: boolean
  prefix?: ReactNode
  suffix?: ReactNode
}

const Input: FC<InputProps> = ({
  className,
  size,
  label,
  textarea = false,
  round = false,
  maxLength,
  gapBottom,
  onChange,
  prefix,
  suffix,
  ...rest
}) => {
  const [focus, setFocus] = useState(false)
  const [count, setCount] = useState(0)
  const onFocus = useCallback(() => setFocus(true), [])
  const onBlur = useCallback(() => setFocus(false), [])

  const changeHandler = useCallback(
    (ev: ChangeEvent<HTMLElement>) => {
      if (typeof maxLength === 'number') {
        setCount((ev.currentTarget as any).value.length)
      }
      onChange && onChange(ev)
    },
    [maxLength, onChange]
  )

  const C: any = textarea ? 'textarea' : 'input'
  return (
    <label
      className={clsx(
        'input',
        size && `input-${size}`,
        gapBottom && `input-mb${gapBottom}`,
        focus && 'input-focus',
        round && 'input-round',
        className
      )}
    >
      <div className="input_box">
        {label && (
          <Typography className="input_label" variant="subtitle2">
            {label}
          </Typography>
        )}
        <div className="input_main">
          {prefix}
          <C
            {...rest}
            onFocus={onFocus}
            onBlur={onBlur}
            onChange={changeHandler}
            maxLength={maxLength}
            className={clsx('input_inp', C === 'textarea' && 'input_textarea')}
          />
          {suffix}
        </div>
        {maxLength && (
          <Typography className="input_len" variant="caption">
            {count}/{maxLength}
          </Typography>
        )}
      </div>
    </label>
  )
}

export default memo(Input)
