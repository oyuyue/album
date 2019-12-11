import React, {
  FC,
  memo,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
  HTMLAttributes
} from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { animated, useTransition } from 'react-spring'
import { uniqueId } from 'lodash-es'
import clsx from 'clsx'
import Notice, { NoticeProps } from './Notice'
import './index.scss'

interface NotificationProps extends HTMLAttributes<HTMLElement> {
  maxCount?: number
  ref?: any
}

let Notification: FC<NotificationProps> = (
  { className, maxCount, ...rest },
  ref
) => {
  const [notices, set] = useState([])

  const remove = useCallback((key: string): void => {
    set(p => p.filter(n => n.key !== key))
  }, [])

  const add = useCallback(
    (notice: NoticeProps & { key: string }): void => {
      const key = (notice.key = notice.key || uniqueId('notice_'))
      set(notices => {
        const i = notices.findIndex(n => n.key === key)
        if (i !== -1) {
          notices[i] = notice
        } else {
          if (maxCount && notices.length > maxCount) {
            notice.key = notices[0].key
            notice.needResetTimer = true
            notices.shift()
          }
          notices.push(notice)
        }

        const onClose = notice.onClose
        notice.onClose = () => {
          onClose && onClose()
          remove(notice.key)
        }

        return [...notices]
      })
    },
    [maxCount, remove]
  )

  useImperativeHandle(ref, () => ({
    add,
    remove
  }))

  const transitions = useTransition(notices, x => x.key, {
    from: {
      maxHeight: 150,
      marginBottom: 10,
      transform: 'scale(0)',
      opacity: 0
    },
    enter: {
      maxHeight: 150,
      marginBottom: 10,
      transform: 'scale(1)',
      opacity: 1
    },
    leave: {
      maxHeight: 0,
      marginBottom: 0,
      transform: 'scale(0)',
      opacity: 0
    }
  })

  return (
    <div {...rest} className={clsx('notification', className)}>
      {transitions.map(
        ({ key, item: { needResetTimer, ...rest }, props }, i) => (
          <animated.div key={key} style={props}>
            {
              <Notice
                {...rest}
                needResetTimer={needResetTimer && i === notices.length - 1}
              />
            }
          </animated.div>
        )
      )}
    </div>
  )
}

Notification = memo(forwardRef(Notification))

export const newInstance = (
  props: NotificationProps,
  cb: (obj: any) => void
) => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  let called = false
  const ref = (node: any) => {
    if (called) return
    called = true
    cb({
      add: (notice: NoticeProps) => node.add(notice),
      remove: (key: string) => node.remove(key),
      destroy() {
        unmountComponentAtNode(div)
        div.parentNode.removeChild(div)
      }
    })
  }

  render(<Notification {...props} ref={ref} />, div)
}

export default Notification
