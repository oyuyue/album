import React, { FC, memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from 'components/Modal'
import UploadImage from 'components/UploadImage'
import Input from 'components/Input'
import Radios, { Radio } from 'components/Radios'
import './index.scss'

const EditProfile: FC = () => {
  return (
    <div className="pu_profile">
      <Modal title="编辑资料">
        <div className="pu_profile_content">
          <UploadImage>
            <div className="pu_profile_banner">
              <FontAwesomeIcon size="2x" icon="plus-square" />
            </div>
          </UploadImage>
          <UploadImage>
            <div className="pu_profile_avatar">
              <FontAwesomeIcon size="lg" icon="plus-square" />
            </div>
          </UploadImage>
          <Input label="昵称" maxLen={50} />
          <Input label="简介" textarea maxLen={160} />
          <Radios label="性别">
            <Radio>男</Radio>
            <Radio>女</Radio>
          </Radios>
        </div>
      </Modal>
    </div>
  )
}

export default memo(EditProfile)
