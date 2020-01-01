import React, { FC, memo, InputHTMLAttributes } from 'react'
import './index.scss'

export interface SwitchProps extends InputHTMLAttributes<{}> {}

const Switch: FC<SwitchProps> = ({ ...rest }) => {
  return (
    <label className="switch">
      <input {...rest} className="switch_input" type="checkbox" />
      <div className="switch_inner">
        <div className="switch_inner_thumb" />
      </div>
    </label>
  )
}

export default memo(Switch)
