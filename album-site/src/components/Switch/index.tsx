import React, { FC, memo } from 'react'
import './index.scss'

const Switch: FC = () => {
  return (
    <label className="switch">
      <input className="switch_input" type="checkbox" />
      <div className="switch_inner">
        <div className="switch_inner_thumb" />
      </div>
    </label>
  )
}

export default memo(Switch)
