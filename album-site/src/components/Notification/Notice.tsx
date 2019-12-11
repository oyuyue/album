import React, {
  FC,
  memo,
  useRef,
  useEffect,
  useCallback,
  HTMLAttributes,
  ReactNode
} from 'react'
import clsx from 'clsx'
import {
  FontAwesomeIcon,
  FontAwesomeIconProps
} from '@fortawesome/react-fontawesome'
import Button from 'components/Button'
import './index.scss'
import Typography from 'components/Typography'

export type IconType = 'success' | 'error' | 'info' | 'warning'

const iconMap: { [K in IconType]: FontAwesomeIconProps['icon'] } = {
  success: 'check-circle',
  error: 'exclamation-circle',
  info: 'info-circle',
  warning: 'exclamation-triangle'
}

export interface NoticeProps extends HTMLAttributes<HTMLElement> {
  type?: IconType
  title?: string
  body?: string
  icon?: ReactNode
  needResetTimer?: boolean
  onClose?: () => void
  duration?: number
}

const Notice: FC<NoticeProps> = ({
  type,
  icon,
  title,
  body,
  onClose,
  children,
  duration,
  needResetTimer
}) => {
  const timer = useRef<NodeJS.Timeout>()
  const closeHandler = useCallback(() => {
    onClose && onClose()
  }, [onClose])

  useEffect(() => {
    clearTimeout(timer.current)
    if (duration) timer.current = setTimeout(closeHandler, Math.abs(duration))
    return () => clearTimeout(timer.current)
  }, [closeHandler, duration, needResetTimer])

  return (
    <div className={clsx('notice', type && `notice-${type}`)}>
      <div className="notice_content">
        {type && <FontAwesomeIcon size="lg" icon={iconMap[type]} />}
        {icon}
        <div className="notice_main">
          {title && <Typography variant="subtitle1">{title}</Typography>}
          {body && (
            <Typography
              style={{ color: 'inherit' }}
              className="notice_body"
              variant="caption"
            >
              {body}
            </Typography>
          )}
          {children}
        </div>
      </div>
      <Button
        icon="times"
        onClick={closeHandler}
        style={{ color: 'inherit' }}
      />
    </div>
  )
}

export default memo(Notice)
