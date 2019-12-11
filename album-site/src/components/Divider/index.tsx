import React, { FC, memo, ReactNode } from 'react'
import './index.scss'

interface DividerProps {
  children?: ReactNode
}

const Divider: FC<DividerProps> = ({ children }) => {
  return (
    <div className="divider">
      <div className="divider_box">{children}</div>
    </div>
  )
}

export default memo(Divider)
