import { RootState } from 'store/reducers'

export const routerPathnameSelector = (state: RootState) =>
  state.router.location.pathname
