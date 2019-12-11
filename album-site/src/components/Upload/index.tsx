import React, {
  FC,
  memo,
  ReactNode,
  useCallback,
  useRef,
  DragEvent,
  useState
} from 'react'
import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Notification from 'components/Notification'
import Typography from 'components/Typography'
import { isFunction } from 'lodash-es'
import './index.scss'
import { mimeCheck } from 'utils'

interface UploadProps {
  onChange?: (file: File) => void
  accept?: string
  children?: ReactNode
  className?: string
  dragClassName?: string
  draggable?: boolean
  maxSize?: number
}

const Upload: FC<UploadProps> = ({
  children,
  onChange,
  className,
  dragClassName,
  accept = 'image/*',
  draggable = false,
  maxSize = 15360 // 15M
}) => {
  const ref = useRef<HTMLInputElement>()
  const [isActive, setActive] = useState(false)
  const stopPropagation = useCallback(e => e.stopPropagation(), [])
  const open = useCallback(() => {
    if (ref.current && isFunction(ref.current.click)) {
      ref.current.click()
    }
  }, [])
  const emitChange = useCallback(
    (file: File) => {
      if (!file) return
      if (!mimeCheck(accept, file.type)) {
        return Notification.error({ title: '非法文件格式' })
      }

      if (maxSize > 0 && maxSize < file.size / 1024) {
        return Notification.error({
          title: `文件过大（最大 ${maxSize / 1024} ）`
        })
      }

      onChange && onChange(file)
    },
    [accept, maxSize, onChange]
  )
  const changeHandler = useCallback(
    ({ target: { files } }) => {
      emitChange(files[0])
    },
    [emitChange]
  )
  const prevent = useCallback((ev: DragEvent) => {
    ev.preventDefault()
    ev.stopPropagation()
  }, [])
  const highline = useCallback(
    (ev: DragEvent) => {
      prevent(ev)
      setActive(true)
    },
    [prevent]
  )
  const unHighline = useCallback(
    (ev: DragEvent) => {
      prevent(ev)
      setActive(false)
    },
    [prevent]
  )
  const dropHandler = useCallback(
    (ev: DragEvent) => {
      unHighline(ev)
      emitChange(ev.dataTransfer.files[0])
    },
    [emitChange, unHighline]
  )

  return (
    <span className={clsx('upload', className)} onClick={open}>
      <input
        ref={ref}
        onClick={stopPropagation}
        accept={accept}
        type="file"
        onChange={changeHandler}
        hidden
      />
      {draggable ? (
        <div
          onDrag={prevent}
          onDragStart={prevent}
          onDragEnd={prevent}
          onDragEnter={highline}
          onDragOver={highline}
          onDragLeave={unHighline}
          onDrop={dropHandler}
          className={clsx(
            'upload_drag',
            dragClassName,
            isActive && 'upload_drag-active'
          )}
        >
          <FontAwesomeIcon size="5x" icon="cloud-upload-alt" />
          <Typography className="upload_drag_text" variant="subtitle2">
            拖拽文件到这里或点击上传
          </Typography>
        </div>
      ) : (
        children
      )}
    </span>
  )
}

export default memo(Upload)
