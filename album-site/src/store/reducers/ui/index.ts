import { Reducer } from 'redux'
import { BP } from 'setup/setupMediaQuery'
import { PayloadAction } from 'types/store'
import {
  UI_CHANGE_BP,
  UI_TOGGLE_SIDEBAR,
  UI_TOGGLE_THEME
} from 'store/constants'
import { RootState } from '..'

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

interface UIState {
  bp: BP
  sidebarVisible: boolean
  theme: Theme
}

const UI: Reducer<UIState, PayloadAction> = (
  state = {
    bp: BP.WIDESCREEN,
    sidebarVisible: true,
    theme: Theme.LIGHT
  },
  { type, payload }
) => {
  switch (type) {
    case UI_CHANGE_BP:
      return {
        ...state,
        bp: payload,
        sidebarVisible: payload < BP.WIDESCREEN ? false : state.sidebarVisible
      }
    case UI_TOGGLE_SIDEBAR:
      return { ...state, sidebarVisible: !state.sidebarVisible }
    case UI_TOGGLE_THEME:
      return {
        ...state,
        theme: state.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
      }
    default:
      return state
  }
}

export const selectUI = ({ ui }: RootState) => ui

export default UI
