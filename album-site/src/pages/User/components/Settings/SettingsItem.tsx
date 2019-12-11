import React, {
  FC,
  memo,
  useState,
  useCallback,
  HTMLAttributes,
  ReactNode
} from 'react'
import clsx from 'clsx'
import Typography from 'components/Typography'
import Button from 'components/Button'

interface SettingsItemProps extends HTMLAttributes<HTMLElement> {
  title: string
  subTitle?: string
  subSlot?: ReactNode
}

const SettingsItem: FC<SettingsItemProps> = ({
  children,
  title,
  subTitle,
  subSlot
}) => {
  const [show, set] = useState(false)
  const expendHandler = useCallback(() => set(s => !s), [set])

  return (
    <div className={clsx('settings_item', show && 'settings_item-expend')}>
      <div className="settings_item_compress">
        <div>
          <Typography gutterBottom="midden" variant="subtitle1">
            {title}
          </Typography>
          {subTitle && <Typography variant="caption">{subTitle}</Typography>}
          {subSlot}
        </div>
        {children && (
          <Button color="blue" onClick={expendHandler}>
            {show ? '取消' : '编辑'}
          </Button>
        )}
      </div>
      {children && <div className="settings_item_expand">{children}</div>}
    </div>
  )
}

export default memo(SettingsItem)
