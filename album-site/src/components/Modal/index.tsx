import React, { FC, memo, useState, useCallback, HTMLAttributes } from 'react'
import { CSSTransition } from 'react-transition-group'
import { render, unmountComponentAtNode } from 'react-dom'
import clsx from 'clsx'
import Typography from 'components/Typography'
import Button from 'components/Button'
import './index.scss'

export interface ModalProps extends HTMLAttributes<HTMLElement> {
  title?: string
  noFooter?: boolean
  noCancel?: boolean
  maskNotClose?: boolean
  onConfirm?: () => void
  onCancel?: () => void
  onExited?: () => void
  autoClose?: boolean
  show?: boolean
}

let Modal: FC<ModalProps> & {
  confirm?: (args: ModalProps) => void
  alert?: (args: ModalProps) => void
} = ({
  title,
  className,
  children,
  noFooter,
  onConfirm,
  onCancel,
  onExited,
  maskNotClose = false,
  autoClose = true,
  noCancel,
  show = false
}) => {
  const [closed, setClosed] = useState(show)

  const closeHandler = useCallback(
    (fn: Function) => {
      if (typeof fn === 'function') {
        Promise.resolve(fn()).then((res: any) => {
          autoClose && res !== false && setClosed(true)
        })
      } else {
        autoClose && setClosed(true)
      }
    },
    [autoClose]
  )

  const cancelHandler = useCallback(
    (e: MouseEvent | any) => {
      e.stopPropagation()
      closeHandler(onCancel)
    },
    [closeHandler, onCancel]
  )
  const confirmHandler = useCallback(() => closeHandler(onConfirm), [
    closeHandler,
    onConfirm
  ])
  const onMaskClick = useCallback(
    (e: MouseEvent | any) => {
      if (!maskNotClose) cancelHandler(e)
    },
    [cancelHandler, maskNotClose]
  )

  return (
    <div className="modal">
      <div
        className={clsx('modal_mask', !closed && 'modal_mask-active')}
        onClick={onMaskClick}
      ></div>
      <div className="modal_inner">
        <CSSTransition
          in={!closed}
          unmountOnExit
          appear
          classNames="modal"
          onExited={onExited}
          timeout={300}
        >
          <div className="modal_content">
            {title && (
              <div className="modal_title">
                <Typography variant="subtitle1">{title}</Typography>
                <Button icon="times" onClick={cancelHandler} />
              </div>
            )}
            <div className="modal_main">{children}</div>
            {!noFooter && (
              <div className="modal_actions">
                {!noCancel && <Button onClick={cancelHandler}>取消</Button>}
                <Button
                  onClick={confirmHandler}
                  color="blue"
                  className="modal_actions_confirm"
                >
                  确认
                </Button>
              </div>
            )}
          </div>
        </CSSTransition>
      </div>
    </div>
  )
}

Modal = memo(Modal)

const newInstance = (props: ModalProps) => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  const onExited = props.onExited
  props.onExited = () => {
    onExited && onExited()
    unmountComponentAtNode(div)
    div.parentNode.removeChild(div)
  }

  render(<Modal {...props} />, div)
}

Modal.confirm = newInstance
Modal.alert = props => {
  newInstance({ noCancel: true, ...props })
}

export default Modal
