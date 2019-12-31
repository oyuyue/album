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
import { useDispatch } from 'react-redux'
import { changeUserProfile } from 'store/actions'
import useShallowSelector from 'hooks/useShallowSelector'
import { isLoading } from 'store/reducers/state'
import { CHANGE_USER_PROFILE } from 'store/constants'
import { selectMyDetails } from 'store/reducers/account'

interface EditProfileProps {
  onExited?: () => void
}

type imageData = { url?: string; file?: File }

const EditProfile: FC<EditProfileProps> = ({ onExited }) => {
  const details = useShallowSelector(selectMyDetails)
  const [banner, setBanner] = useState<imageData>({ url: details.bannerUrl })
  const [avatar, setAvatar] = useState<imageData>({ url: details.avatarUrl })
  const [bind, form] = useForm()
  const dispatch = useDispatch()
  const loading = useShallowSelector(isLoading(CHANGE_USER_PROFILE))

  const submitHandler = useCallback(() => {
    if (form.report()) {
      if (loading) return false
      const payload = { ...form.value() }
      payload.bannerFile = banner.file
      payload.bannerUrl = banner.url
      payload.avatarFile = avatar.file
      payload.avatarUrl = avatar.url
      return new Promise((resolve, reject) => {
        payload.resolve = resolve
        payload.reject = reject
        dispatch(changeUserProfile(payload))
      })
    }
    return false
  }, [
    avatar.file,
    avatar.url,
    banner.file,
    banner.url,
    dispatch,
    form,
    loading
  ])

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
        loading={loading}
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
          <Input
            label="昵称"
            required
            name="nickname"
            defaultValue={details.nickname}
            maxLength={50}
          />
          <Input
            label="简介"
            name="bio"
            textarea
            defaultValue={details.bio}
            maxLength={160}
          />
          <Radios name="gender" label="性别" defaultValue={details.gender}>
            <Radio value={Gender.MALE}>男</Radio>
            <Radio value={Gender.FEMALE}>女</Radio>
          </Radios>
        </form>
      </Modal>
    </div>
  )
}

export default memo(EditProfile)
