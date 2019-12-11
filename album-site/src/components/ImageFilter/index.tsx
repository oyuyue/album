import React, { FC, memo, useRef, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import filters from './filters'
import './index.scss'

interface ImageFilterProps {
  onChange?: (ev: string) => void
  imageUrl?: string
  className?: string
  value?: string
  itemWidth?: number
}

const ImageFilter: FC<ImageFilterProps> = ({
  imageUrl,
  className,
  onChange,
  value,
  itemWidth = 55
}) => {
  const ref = useRef<{ [k: string]: HTMLCanvasElement }>({})
  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      const h = (img.naturalHeight / img.naturalWidth) * itemWidth
      const itemHeight = Math.min(h, itemWidth * 3)
      Object.keys(ref.current).forEach(k => {
        const canvas = ref.current[k]
        canvas.height = itemHeight
        const ctx = canvas.getContext('2d')
        ctx.filter = filters[k]
        ctx.drawImage(img, 0, 0, itemWidth, h)
      })
    }
    img.src = imageUrl
  }, [imageUrl, itemWidth])
  const changeHandler = useCallback(
    (type: string) => () => {
      onChange && onChange(type === value ? '' : type)
    },
    [onChange, value]
  )

  return (
    <div className={clsx('imageFilter', className)}>
      {Object.keys(filters).map(k => (
        <div
          className={clsx(
            'imageFilter_item',
            value === k && 'imageFilter_item-active'
          )}
          onClick={changeHandler(k)}
          key={k}
        >
          <canvas
            width={itemWidth}
            height={itemWidth}
            ref={node => (ref.current[k] = node)}
          />
          <FontAwesomeIcon className="imageFilter_item_check" icon="check" />
        </div>
      ))}
    </div>
  )
}

export default memo(ImageFilter)
