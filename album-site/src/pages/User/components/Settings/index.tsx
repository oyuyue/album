import React, { FC, memo } from 'react'
import Input from 'components/Input'
import Button from 'components/Button'
import SettingsItem from './SettingsItem'
import './index.scss'

const Settings: FC = () => {
  return (
    <div className="settings">
      <div className="settings_content">
        <SettingsItem title="邮箱" subTitle="email@address.com">
          <form>
            <Input
              gapBottom="midden"
              type="password"
              placeholder="请输入当前密码"
              label="密码"
              required
            />
            <Input
              gapBottom="midden"
              type="email"
              placeholder="请输入邮箱地址"
              label="邮箱"
              required
            />
            <Button type="submit" variant="round" color="blue">
              保存
            </Button>
          </form>
        </SettingsItem>
        <SettingsItem title="密码" subTitle="已设置">
          <form>
            <Input
              gapBottom="midden"
              type="password"
              placeholder="请输入当前密码"
              label="密码"
              required
            />
            <Input
              type="password"
              placeholder="请输入新密码"
              label="新密码"
              required
            />
            <Input
              gapBottom="midden"
              type="password"
              placeholder="请重复输入新密码"
              label="重复新密码"
              required
            />
            <Button type="submit" variant="round" color="blue">
              保存
            </Button>
          </form>
        </SettingsItem>
        <SettingsItem
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
        />
      </div>
    </div>
  )
}

export default memo(Settings)
