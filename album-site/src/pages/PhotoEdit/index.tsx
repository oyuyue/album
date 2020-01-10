import React, {
  FC,
  memo,
  useCallback,
  useRef,
  useState,
  useEffect
} from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from 'components/Button'
import Input from 'components/Input'
import Typography from 'components/Typography'
import Select, { Option } from 'components/Select'
import Switch from 'components/Switch'
import Checkbox from 'components/Checkbox'
import Upload from 'components/Upload'
import ImageFilter from 'components/ImageFilter'
import filters from 'components/ImageFilter/filters'
import { selectTags } from 'store/reducers/tag'
import useShallowSelector from 'hooks/useShallowSelector'
import { useDispatch } from 'react-redux'
import { fetchTags, editPhoto } from 'store/actions'
import useForm from 'hooks/useForm'
import { selectEditPhoto } from 'store/reducers/photo/edit'
import './index.scss'

type img = { url?: string; file?: File }
const PhotoEdit: FC<RouteComponentProps> = ({ history: { goBack } }) => {
  const canvas = useRef<HTMLCanvasElement>()
  const image = useRef<any>()

  const photo = useShallowSelector(selectEditPhoto)
  const [filter, setFilter] = useState(photo.imageFilterType)
  const [img, setImg] = useState<img>({ url: photo.imageUrl })
  const [selectedTags, setSelectedTags] = useState([])

  const [bind, form] = useForm()
  const dispatch = useDispatch()
  const tags = useShallowSelector(selectTags)

  const selectTagHandler = useCallback(tags => setSelectedTags(tags), [])
  const renderImg = useCallback((url: string, file?: File) => {
    if (!url) return
    const img = new Image()
    img.onload = () => {
      canvas.current.width = img.naturalWidth
      canvas.current.height = img.naturalHeight
      const ctx = canvas.current.getContext('2d')
      ctx.drawImage(img, 0, 0)
    }
    img.crossOrigin = 'Anonymous'
    img.src = url
    setImg({ url, file })
    image.current = img
  }, [])
  const onUpload = useCallback(
    (file: File) => {
      const reader = new FileReader()
      reader.onloadend = ({ target: { result } }) => {
        renderImg(result as string, file)
      }
      reader.readAsDataURL(file)
    },
    [renderImg]
  )
  const filterChangeHandler = useCallback((type: string) => {
    const ctx = canvas.current.getContext('2d')
    ctx.filter = filters[type] || 'none'
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height)
    ctx.drawImage(image.current, 0, 0)
    setFilter(type)
  }, [])
  const cancelHandler = useCallback(() => {
    goBack()
  }, [goBack])
  const submitHandler = useCallback(
    ev => {
      ev.preventDefault()
      if (form.report()) {
        const data = form.value()
        data.personal = !!data.personal
        data.imgUrl = img.url

        if (filter) {
          canvas.current.toBlob(
            blob => {
              if (data.origin) {
                data.imageFilterType = filter
                data.imageFile = blob
                data.originImageFile = img.file
                data.imgUrl = ''
              } else {
                data.imageFile = blob
              }

              dispatch(editPhoto(data))
            },
            'image/png',
            0.9
          )
        } else {
          data.imageFile = img.file

          dispatch(editPhoto(data))
        }
      }
    },
    [dispatch, filter, form, img.file, img.url]
  )

  useEffect(() => {
    dispatch(fetchTags())
    renderImg(photo.originImageUrl || photo.imageUrl)
  }, [dispatch, photo.imageUrl, photo.originImageUrl, renderImg])

  return (
    <div className="p_upload">
      <div className="p_upload_main">
        <div className="p_upload_preview">
          <canvas hidden={!img.url} ref={canvas} />
          {!img.url && (
            <Upload
              onChange={onUpload}
              dragClassName="p_upload_drag"
              draggable
            />
          )}
        </div>
        <form {...bind} onSubmit={submitHandler} className="p_upload_form">
          <Input
            textarea
            required
            name="title"
            label="标题"
            placeholder="请输入"
            maxLength={100}
            gapBottom="small"
            round
          />
          <Select
            fillWidth
            multiple
            placeholder="选择标签"
            value={selectedTags}
            onChange={selectTagHandler}
          >
            {tags.map(tag => (
              <Option key={tag.name} value={tag.name}>
                {tag.name}
              </Option>
            ))}
          </Select>
          <div className="p_upload_private">
            <div className="p_upload_private_text">
              <FontAwesomeIcon
                className="p_upload_private_icon"
                icon="shield-alt"
              />
              <Typography variant="subtitle2">仅自己可见</Typography>
            </div>
            <Switch name="personal" />
          </div>
          <Checkbox name="origin" label="保留原图" />
          <div className="p_upload_filters">
            {img.url && (
              <ImageFilter
                value={filter}
                onChange={filterChangeHandler}
                imageUrl={img.url}
              />
            )}
          </div>
          <div className="p_upload_actions">
            <Upload className="p_upload_actions_upload" onChange={onUpload}>
              <Button color="blue" icon="upload">
                选择相片
              </Button>
            </Upload>
            <Button className="p_upload_actions_cancel" onClick={cancelHandler}>
              取消
            </Button>
            <Button type="submit" variant="round" color="blue">
              保存
            </Button>
          </div>
        </form>
      </div>
      <div className="p_upload_mask">
        <Button
          onClick={cancelHandler}
          className="p_upload_close"
          color="white"
          icon="times"
        />
      </div>
    </div>
  )
}

export default memo(PhotoEdit)
