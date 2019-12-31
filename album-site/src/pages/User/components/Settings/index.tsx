import React, { FC, memo } from 'react'
import Password from './Password'
import Email from './Email'
import './index.scss'

const Settings: FC = () => {
  return (
    <div className="settings">
      <div className="settings_content">
        <Email />
        <Password />
        {/* <SettingsItem
          title="绑定第三方账号"
          subSlot={
            <Button
              icon={['fab', 'weixin']}
              iconProps={{ size: 'lg' }}
              style={{ color: '#1aad19' }}
            >
              绑定微信
            </Button>
          }
        /> */}
      </div>
    </div>
  )
}

export default memo(Settings)
