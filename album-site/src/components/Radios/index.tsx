import React, { FC, memo, Children, HTMLAttributes, ReactElement } from 'react'
import clsx from 'clsx'
import Typography from 'components/Typography'
import './index.scss'

interface RadiosProps extends HTMLAttributes<HTMLElement> {
  label?: string
  name?: string
}

const Radios: FC<RadiosProps> = ({
  children,
  className,
  label,
  defaultValue,
  name = 'radios'
}) => {
  return (
    <div className={clsx('radios', className)}>
      {label && (
        <Typography className="radios_title" variant="subtitle2">
          {label}
        </Typography>
      )}
      <div className="radios_inner">
        {Children.map(
          children as ReactElement,
          ({ key, props: { children, value } }) => (
            <label key={key}>
              <input
                name={name}
                type="radio"
                defaultChecked={
                  defaultValue != undefined && defaultValue === value
                }
                value={value}
              />
              <div className="radios_content">
                <div className="radios_icon"></div>
                <Typography variant="caption">{children}</Typography>
              </div>
            </label>
          )
        )}
      </div>
    </div>
  )
}

export { default as Radio } from './Radio'
export default memo(Radios)
