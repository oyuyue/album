import React, {
  FC,
  memo,
  useCallback,
  useState,
  ReactNode,
  InputHTMLAttributes
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
  maxLen?: number
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
  maxLen,
  gapBottom,
  prefix,
  suffix,
  ...rest
}) => {
  const [focus, setFocus] = useState(false)
  const onFocus = useCallback(() => setFocus(true), [])
  const onBlur = useCallback(() => setFocus(false), [])

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
            className={clsx('input_inp', C === 'textarea' && 'input_textarea')}
          />
          {suffix}
        </div>
        {maxLen && (
          <Typography className="input_len" variant="caption">
            0/{maxLen}
          </Typography>
        )}
      </div>
    </label>
  )
}

export default memo(Input)
