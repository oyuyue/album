import React, { FC, memo, useCallback, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from 'components/Modal'
import Upload from 'components/Upload'
import Input from 'components/Input'
import Radios, { Radio } from 'components/Radios'
import './index.scss'
import { fileToUrl } from 'utils'
import useForm from 'hooks/useForm'
import { Gender } from 'types/entity'

interface EditProfileProps {
  onExited?: () => void
}

type imageData = { url?: string; file?: File }

const EditProfile: FC<EditProfileProps> = ({ onExited }) => {
  const [banner, setBanner] = useState<imageData>({})
  const [avatar, setAvatar] = useState<imageData>({})
  const [bind, form] = useForm()

  const submitHandler = useCallback(() => {
    console.log(form.value())
  }, [form])

  const imageHandler = useCallback(
    (isBanner: boolean) => (file: File) => {
      fileToUrl(file).then(url => {
        isBanner ? setBanner({ file, url }) : setAvatar({ file, url })
      })
    },
    []
  )

  return (
    <div className="pu_profile">
      <Modal
        maskNotClose
        onConfirm={submitHandler}
        title="编辑资料"
        onExited={onExited}
      >
        <form {...bind} className="pu_profile_content">
          <Upload onChange={imageHandler(true)}>
            {banner.url ? (
              <img
                alt="banner"
                className="pu_profile_banner"
                src={banner.url}
              />
            ) : (
              <div className="pu_profile_banner">
                <FontAwesomeIcon size="2x" icon="plus-square" />
              </div>
            )}
          </Upload>
          <div className="pu_profile_avatar">
            <Upload onChange={imageHandler(false)}>
              {avatar.url ? (
                <img
                  alt="avatar"
                  className="pu_profile_avatar_inner"
                  src={avatar.url}
                />
              ) : (
                <div className="pu_profile_avatar_inner">
                  <FontAwesomeIcon size="lg" icon="plus-square" />
                </div>
              )}
            </Upload>
          </div>
          <Input label="昵称" required name="nickname" maxLen={50} />
          <Input label="简介" name="bio" textarea maxLen={160} />
          <Radios name="gender" label="性别">
            <Radio value={Gender.MALE}>男</Radio>
            <Radio value={Gender.FEMALE}>女</Radio>
          </Radios>
        </form>
      </Modal>
    </div>
  )
}

export default memo(EditProfile)
