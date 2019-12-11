import React, {
  FC,
  useRef,
  ReactNode,
  ReactElement,
  Children,
  cloneElement,
  memo
} from 'react'
import {
  Route,
  matchPath,
  RouteComponentProps,
  SwitchProps
} from 'react-router-dom'
import { Location } from 'history'

const Switch = memo<RouteComponentProps>(({ location, children }) => {
  const prev = useRef<ReactElement>(),
    cur = useRef<ReactElement>(),
    prevLocation = useRef<Location>()

  let shouldRenderPrev = false

  if (
    children &&
    prevLocation.current != location &&
    (!prevLocation.current || prevLocation.current.key !== location.key)
  ) {
    prevLocation.current = location

    if (cur.current && !cur.current.props.renderPrev) {
      prev.current = cur.current
    }

    cur.current = null

    Children.forEach(children as ReactElement, (child): void => {
      const { props } = child
      const match = matchPath(location.pathname, {
        ...props,
        path: props.path || props.from
      })

      if (props.fallback && !prev.current) {
        prev.current = cloneElement(child, {
          location,
          computedMatch: match,
          path: ''
        })
      }

      if (match) {
        shouldRenderPrev = props.renderPrev
        cur.current = cloneElement(child, {
          location,
          computedMatch: match,
          key: match.path
        })
      }
    })
  }

  return (
    <>
      {shouldRenderPrev && prev.current}
      {cur.current}
    </>
  )
})
Switch.displayName = 'Switch'

const CachedSwitch: FC = ({ children }) => (
  <Route
    render={(props): ReactNode => <Switch {...props}>{children}</Switch>}
  />
)

export default memo<SwitchProps>(CachedSwitch)
