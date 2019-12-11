import React, { FC, memo, HTMLAttributes } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import Typography from 'components/Typography'
import './index.scss'

interface UploadImageProps extends HTMLAttributes<HTMLElement> {
  value?: string
  display?: boolean
}

const UploadImage: FC<UploadImageProps> = ({
  children,
  className,
  display
}) => {
  return (
    <label
      className={clsx('uploadImage', className, display && 'uploadImage-show')}
    >
      <input className="uploadImage_inp" accept="image/*" type="file" />
      <div className="uploadImage_content">{children}</div>
      {display && (
        <div className="uploadImage_desc">
          <FontAwesomeIcon size="5x" icon="cloud-upload-alt" />
          <Typography className="uploadImage_desc_text" variant="subtitle2">
            拖拽图片到这里或点击上传
          </Typography>
        </div>
      )}
    </label>
  )
}

export default memo(UploadImage)
