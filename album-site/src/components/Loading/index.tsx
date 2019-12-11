import React, { FC, memo, HTMLAttributes, useRef, useEffect } from 'react'
import clsx from 'clsx'
import {
  FontAwesomeIcon,
  FontAwesomeIconProps
} from '@fortawesome/react-fontawesome'
import { throttle } from 'lodash-es'
import Typography from 'components/Typography'
import Button from 'components/Button'
import './index.scss'

export interface LoadingProps extends HTMLAttributes<HTMLElement> {
  iconProps?: Omit<FontAwesomeIconProps, 'icon'>
  error?: boolean
  errorText?: string
  errorBtnText?: string
  triggerDistance?: number
  disableLoadMore?: boolean
  onLoadMore?: () => void
}

const Loading: FC<LoadingProps> = ({
  iconProps,
  error = false,
  errorText = '加载失败 : (',
  errorBtnText = '重新加载',
  onLoadMore,
  triggerDistance = 50,
  className,
  disableLoadMore = false,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>()

  useEffect(() => {
    if (disableLoadMore) return
    const scrollHandler = throttle(() => {
      if (
        onLoadMore &&
        ref.current.getBoundingClientRect().bottom - window.innerHeight <=
          triggerDistance
      ) {
        onLoadMore()
      }
    }, 300)
    document.addEventListener('scroll', scrollHandler, false)
    return () => document.removeEventListener('scroll', scrollHandler, false)
  }, [disableLoadMore, onLoadMore, triggerDistance])

  return (
    <div {...rest} ref={ref} className={clsx('loading', className)}>
      {error ? (
        <>
          <Typography variant="subtitle2">{errorText}</Typography>
          <Button color="blue" className="loading_btn" onClick={onLoadMore}>
            {errorBtnText}
          </Button>
        </>
      ) : (
        <FontAwesomeIcon size="2x" spin {...iconProps} icon="sync-alt" />
      )}
    </div>
  )
}

export default memo(Loading)
