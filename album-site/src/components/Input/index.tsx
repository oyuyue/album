import React, {
  FC,
  memo,
  InputHTMLAttributes,
  useCallback,
  useState
} from 'react'
import clsx from 'clsx'
import './index.scss'
import Typography from 'components/Typography'

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'small' | 'big'
  label?: string | number
  textarea?: boolean
  maxLen?: number
  gapBottom?: 'small' | 'midden' | 'big'
  round?: boolean
}

const Input: FC<InputProps> = ({
  className,
  size,
  label,
  textarea = false,
  round = false,
  maxLen,
  gapBottom,
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
        <C
          onFocus={onFocus}
          onBlur={onBlur}
          className={clsx('input_inp', C === 'textarea' && 'input_textarea')}
          {...rest}
        />
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
