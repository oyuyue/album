import React, { FC, memo, ReactNode, HTMLAttributes } from 'react'

interface TabProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  sub?: string | number
  value: any
}

const Tab: FC<TabProps> = ({ children, ...rest }) => {
  return <div {...rest}>{children}</div>
}

export default memo(Tab)
