import { Store } from 'redux'
import setupIcons from './setupIcons'
import setupMediaQuery from './setupMediaQuery'

export default function boot(store: Store): void {
  setupIcons()
  setupMediaQuery(store)
}
