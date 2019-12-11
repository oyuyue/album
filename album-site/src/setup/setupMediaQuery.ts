import { Store } from 'redux'
import {
  BREAKPOINT_WIDESCREEN,
  BREAKPOINT_DESKTOP,
  BREAKPOINT_PHONE,
  BREAKPOINT_TABLET
} from 'config'
import { changeBP } from 'store/actions'

export enum BP {
  PHONE,
  TABLET,
  DESKTOP,
  WIDESCREEN
}

export default function({ dispatch }: Store): void {
  function mqCb({
    matches,
    media
  }: MediaQueryList | MediaQueryListEvent): void {
    let current = BP.WIDESCREEN

    switch (media) {
      case BREAKPOINT_WIDESCREEN:
        current = BP.WIDESCREEN
        break
      case BREAKPOINT_DESKTOP:
        current = BP.DESKTOP
        break
      case BREAKPOINT_PHONE:
        current = BP.TABLET
        break
      case BREAKPOINT_TABLET:
        current = BP.PHONE
        break
    }

    if (matches) dispatch(changeBP(current))
  }

  Array.of(
    BREAKPOINT_WIDESCREEN,
    BREAKPOINT_DESKTOP,
    BREAKPOINT_PHONE,
    BREAKPOINT_TABLET
  ).forEach(mqs => {
    const mq = window.matchMedia(mqs)
    mqCb(mq)
    mq.addListener(mqCb)
  })
}
