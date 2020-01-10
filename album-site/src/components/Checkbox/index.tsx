import React, { FC, memo, InputHTMLAttributes } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import Typography from 'components/Typography'
import './index.scss'

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string | number
}

const Checkbox: FC<CheckboxProps> = ({ label, color, className, ...rest }) => {
  return (
    <label className="checkbox">
      <input {...rest} type="checkbox" />
      <div
        className={clsx(
          'checkbox_inner',
          color && `checkbox_inner-${color}`,
          className
        )}
      >
        <div className="checkbox_inner_icon">
          <FontAwesomeIcon
            size="xs"
            className="checkbox_inner_ico"
            icon="check"
          />
        </div>
        {label && (
          <Typography color={color} variant="caption">
            {label}
          </Typography>
        )}
      </div>
    </label>
  )
}

export default memo(Checkbox)
