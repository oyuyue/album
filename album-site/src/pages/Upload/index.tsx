import React, { FC, memo, useCallback, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from 'components/Button'
import Input from 'components/Input'
import Typography from 'components/Typography'
import Select, { Option } from 'components/Select'
import Switch from 'components/Switch'
import Checkbox from 'components/Checkbox'
import Upload from 'components/Upload'
import ImageFilter from 'components/ImageFilter'
import './index.scss'
import filters from 'components/ImageFilter/filters'

const EditPhoto: FC = () => {
  const canvas = useRef<HTMLCanvasElement>()
  const image = useRef<any>()
  const [filter, setFilter] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const selectHandler = useCallback(() => {}, [])
  const onUpload = useCallback((file: File) => {
    const reader = new FileReader()
    reader.onloadend = ({ target: { result } }) => {
      const img = new Image()
      img.onload = () => {
        canvas.current.width = img.naturalWidth
        canvas.current.height = img.naturalHeight
        const ctx = canvas.current.getContext('2d')
        ctx.drawImage(img, 0, 0)
      }
      img.crossOrigin = 'Anonymous'
      img.src = result as string
      setImageUrl(result as string)
      image.current = img
    }
    reader.readAsDataURL(file)
  }, [])

  const submitHandler = useCallback(ev => {
    ev.preventDefault()
  }, [])
  const filterChangeHandler = useCallback((type: string) => {
    const ctx = canvas.current.getContext('2d')
    ctx.filter = filters[type] || 'none'
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height)
    ctx.drawImage(image.current, 0, 0)
    setFilter(type)
  }, [])

  return (
    <div className="p_upload">
      <div className="p_upload_main">
        <div className="p_upload_preview">
          <canvas hidden={!imageUrl} ref={canvas} />
          {!imageUrl && (
            <Upload
              onChange={onUpload}
              dragClassName="p_upload_drag"
              draggable
            />
          )}
        </div>
        <form onSubmit={submitHandler} className="p_upload_form">
          <Input
            textarea
            label="标题"
            placeholder="请输入"
            maxLen={100}
            gapBottom="small"
            round
          />
          <Select fillWidth placeholder="选择相册" onChange={selectHandler}>
            <Option value="1">111111</Option>
            <Option value="2">222</Option>
            <Option value="3">333</Option>
          </Select>
          <Select
            fillWidth
            multiple
            placeholder="选择标签"
            onChange={selectHandler}
          >
            <Option value="1">111111</Option>
            <Option value="2">222</Option>
            <Option value="3">333</Option>
          </Select>
          <div className="p_upload_private">
            <div className="p_upload_private_text">
              <FontAwesomeIcon
                className="p_upload_private_icon"
                icon="shield-alt"
              />
              <Typography variant="subtitle2">仅自己可见</Typography>
            </div>
            <Switch />
          </div>
          <Checkbox label="保留原图" />
          <div className="p_upload_filters">
            {imageUrl && (
              <ImageFilter
                value={filter}
                onChange={filterChangeHandler}
                imageUrl={imageUrl}
              />
            )}
          </div>
          <div className="p_upload_actions">
            <Upload className="p_upload_actions_upload" onChange={onUpload}>
              <Button color="blue" icon="upload">
                上传相片
              </Button>
            </Upload>
            <Button className="p_upload_actions_cancel">取消</Button>
            <Button variant="round" color="blue">
              保存
            </Button>
          </div>
        </form>
      </div>
      <div className="p_upload_mask">
        <Button className="p_upload_close" color="white" icon="times" />
      </div>
    </div>
  )
}

export default memo(EditPhoto)
