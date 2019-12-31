import React, {
  FC,
  memo,
  useState,
  useCallback,
  ReactNode,
  FormEvent,
  ReactElement,
  useImperativeHandle,
  forwardRef
} from 'react'
import clsx from 'clsx'
import Typography from 'components/Typography'
import Button from 'components/Button'
import useForm from 'hooks/useForm'
import Spin from 'components/Spin'

interface SettingsItemProps {
  title: string
  subTitle?: string
  subSlot?: ReactNode
  onSubmit?: (data: any) => void
  loading?: boolean
  children?: ReactElement | ReactElement[]
}

const SettingsItem: FC<SettingsItemProps> = (
  { children, title, subTitle, subSlot, onSubmit, loading },
  ref
) => {
  const [show, set] = useState(false)
  const expendHandler = useCallback(() => set(s => !s), [set])

  const [bind, form] = useForm()
  const submitHandler = useCallback(
    (ev: FormEvent) => {
      ev.preventDefault()
      if (form.report()) {
        onSubmit && onSubmit(form.value())
      }
    },
    [form, onSubmit]
  )

  useImperativeHandle(ref, () => ({
    report: (name?: string) => {
      return form.report(name)
    },
    value: (name?: string) => {
      return form.value(name)
    }
  }))

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
      <div className="settings_item_expand">
        <Spin spinning={loading}>
          <form {...bind} onSubmit={submitHandler}>
            {children}
            <Button type="submit" variant="round" color="blue">
              保存
            </Button>
          </form>
        </Spin>
      </div>
    </div>
  )
}

export default memo(forwardRef(SettingsItem))
