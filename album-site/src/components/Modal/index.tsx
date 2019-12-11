import React, {
  FC,
  memo,
  useState,
  useCallback,
  useRef,
  HTMLAttributes
} from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { animated, useSpring } from 'react-spring'
import clsx from 'clsx'
import Typography from 'components/Typography'
import Button from 'components/Button'
import './index.scss'
import useForceUpdate from 'hooks/useForceUpdate'

export interface ModalProps extends HTMLAttributes<HTMLElement> {
  title?: string
  noFooter?: boolean
  noCancel?: boolean
  onConfirm?: () => void
  onCancel?: () => void
  afterClose?: () => void
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
  autoClose,
  afterClose,
  noCancel,
  show
}) => {
  const [close, setClose] = useState(false)
  const isShow = show == null ? !close : show
  const closed = useRef(!isShow)

  if (isShow) closed.current = false

  const forceUpdate = useForceUpdate()

  const cancelHandler = useCallback(
    (e: MouseEvent | any) => {
      e.stopPropagation()
      if (typeof onCancel === 'function') {
        Promise.resolve(onCancel()).then(() => autoClose && setClose(true))
      } else {
        autoClose && setClose(true)
      }
    },
    [autoClose, onCancel]
  )
  const confirmHandler = useCallback(() => {
    if (typeof onConfirm === 'function') {
      Promise.resolve(onConfirm()).then(() => autoClose && setClose(true))
    } else {
      autoClose && setClose(true)
    }
  }, [autoClose, onConfirm])

  const spring = useSpring({
    from: { transform: 'scale(0)', opacity: 0 },
    to: {
      transform: `scale(${isShow ? 1 : 0})`,
      opacity: isShow ? 1 : 0
    },
    onRest: ({ opacity }) => {
      if (opacity === 0) {
        closed.current = true
        forceUpdate()
        afterClose && afterClose()
      }
    }
  })

  return (
    <div
      className="modal"
      style={{ display: isShow || !closed.current ? 'block' : 'none' }}
    >
      <div
        className={clsx('modal_mask', isShow && 'modal_mask-active')}
        onClick={cancelHandler}
      ></div>
      <div className="modal_inner">
        <animated.div style={spring}>
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
        </animated.div>
      </div>
    </div>
  )
}

Modal = memo(Modal)

const newInstance = (props: ModalProps) => {
  const div = document.createElement('div')
  document.body.appendChild(div)

  props.autoClose = true
  const afterClose = props.afterClose
  props.afterClose = () => {
    afterClose && afterClose()
    unmountComponentAtNode(div)
    div.parentNode.removeChild(div)
  }

  render(<Modal {...props} />, div)
}

Modal.confirm = newInstance
Modal.alert = props => {
  newInstance({ ...props, noCancel: true })
}

export default Modal
