import { NoticeProps, IconType } from './Notice'
import { newInstance } from './Notification'

const DEFAULT_DURATION = 3000

type Placement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
type NotifyArgs = NoticeProps & { placement?: Placement }

const notificationInstance: any = {}

const open = ({ placement = 'topRight', ...rest }: NotifyArgs) => {
  if (notificationInstance[placement]) {
    return notificationInstance[placement].add(rest)
  }

  newInstance({ className: `notification-${placement}` }, instance => {
    notificationInstance[placement] = instance
    instance.add(rest)
  })
}

const notify: any = {}
const types: IconType[] = ['error', 'info', 'success', 'warning']

types.forEach(type => {
  notify[type] = (title: string, args?: NotifyArgs) => {
    args = args || {}
    if (args.duration == null) args.duration = DEFAULT_DURATION
    if (args.title == null) args.title = title
    open({ ...args, type })
  }
})

notify.warn = notify.warning

type NotifyFn = (title: string, args?: NotifyArgs) => void

export default notify as {
  error: NotifyFn
  info: NotifyFn
  success: NotifyFn
  warning: NotifyFn
  warn: NotifyFn
}
