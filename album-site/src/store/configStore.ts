import { createStore, applyMiddleware, Store } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { enableBatching } from 'redux-batched-actions'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import createRootReducers from './reducers'
import rootSaga from './sagas'

export const history = createBrowserHistory()

export default (preloadedState?: any): Store => {
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    enableBatching(createRootReducers(history)),
    preloadedState,
    applyMiddleware(routerMiddleware(history), sagaMiddleware)
  )

  sagaMiddleware.run(rootSaga)

  return store
}
