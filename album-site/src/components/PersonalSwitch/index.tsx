import React, { FC, memo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Switch, { SwitchProps } from 'components/Switch'
import Typography from 'components/Typography'
import './index.scss'

interface PersonalSwitchProps extends SwitchProps {}

const PersonalSwitch: FC<PersonalSwitchProps> = ({ ...rest }) => {
  return (
    <div className="pw">
      <div className="pw_label">
        <FontAwesomeIcon className="pw_icon" icon="shield-alt" />
        <Typography variant="subtitle2">仅自己可见</Typography>
      </div>
      <Switch {...rest} />
    </div>
  )
}

export default memo(PersonalSwitch)
