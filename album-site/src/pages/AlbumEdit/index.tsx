import React, { FC, memo, useCallback, useState, useEffect } from 'react'
import Modal from 'components/Modal'
import Upload from 'components/Upload'
import Input from 'components/Input'
import PersonalSwitch from 'components/PersonalSwitch'
import useForm from 'hooks/useForm'
import { fileToUrl } from 'utils'
import './index.scss'
import { RouteComponentProps } from 'react-router-dom'
import useShallowSelector from 'hooks/useShallowSelector'
import { isLoading } from 'store/reducers/state'
import { EDIT_ALBUM } from 'store/constants'
import { selectEditAlbum } from 'store/reducers/album/edit'
import { useDispatch } from 'react-redux'
import { editAlbum, fetchEditAlbum } from 'store/actions'

type img = { file?: File; url?: string }

const AlbumEdit: FC<RouteComponentProps<{ id: string }>> = ({
  history: { goBack },
  match: {
    params: { id }
  }
}) => {
  const loading = useShallowSelector(isLoading(EDIT_ALBUM))
  const album = useShallowSelector(selectEditAlbum)
  const dispatch = useDispatch()
  const [img, setImg] = useState<img>({ url: album.imageUrl })
  const [bind, form] = useForm()
  const submitHandler = useCallback(() => {
    if (form.report()) {
      const data = form.value()
      data.imageUrl = img.url
      data.file = img.file
      data.personal = !!data.personal
      data.id = album.id
      return new Promise((resolve, reject) => {
        data.resolve = resolve
        data.reject = reject
        dispatch(editAlbum(data))
      })
    }
    return false
  }, [album.id, dispatch, form, img.file, img.url])
  const uploadHandler = useCallback((file: File) => {
    fileToUrl(file).then(url => setImg({ file, url }))
  }, [])
  const exitHandler = useCallback(() => {
    goBack()
  }, [goBack])

  useEffect(() => {
    if (id) {
      dispatch(fetchEditAlbum(id))
    }
  }, [dispatch, id])

  return (
    <Modal
      maskNotClose
      loading={loading}
      onExited={exitHandler}
      onConfirm={submitHandler}
      title="编辑相册"
    >
      <form {...bind} className="ae" onSubmit={submitHandler}>
        {img.url ? (
          <img width="100%" alt="album" src={img.url} />
        ) : (
          <Upload draggable onChange={uploadHandler} />
        )}
        <Input
          gapTop="midden"
          label="标题"
          required
          defaultValue={album.title}
          name="title"
          maxLength={50}
        />
        <PersonalSwitch defaultChecked={!!album.personal} name="personal" />
      </form>
    </Modal>
  )
}

export default memo(AlbumEdit)
