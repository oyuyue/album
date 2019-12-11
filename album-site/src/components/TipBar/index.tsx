import React, { FC, memo, HTMLAttributes, useCallback, useState } from 'react'
import Button from 'components/Button'
import Typography from 'components/Typography'
import './index.scss'
import clsx from 'clsx'

export interface TipBarProps extends HTMLAttributes<HTMLElement> {
  closeable?: boolean
  text?: string
  onClose?: () => void
  autoClose?: boolean
}

const TipBar: FC<TipBarProps> = ({
  children,
  text,
  closeable = true,
  autoClose = true,
  onClose
}) => {
  const [closed, set] = useState(false)
  const closeHandler = useCallback(() => {
    autoClose && set(true)
    onClose && onClose()
  }, [autoClose, onClose])

  return (
    <div className={clsx('tipBar', closed && 'tipBar-hide')}>
      <div className="tipBar_content">
        {text && (
          <Typography className="tipBar_text" variant="subtitle2">
            {text}
          </Typography>
        )}
        {children}
      </div>
      {closeable && <Button icon="times" onClick={closeHandler} />}
    </div>
  )
}

export default memo(TipBar)
