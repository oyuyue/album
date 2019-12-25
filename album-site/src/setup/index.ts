import { Store } from 'redux'
import setupIcons from './setupIcons'
import setupMediaQuery from './setupMediaQuery'
import setupInitState from './setupInitState'

export default function boot(store: Store): void {
  setupIcons()
  setupMediaQuery(store)
  setupInitState(store)
}
