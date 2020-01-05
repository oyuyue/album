import React, { FC, memo, ReactNode, useCallback } from 'react'
import ErrorReload, { ErrorReloadProps } from 'components/ErrorReload'
import Loading, { LoadingProps } from 'components/Loading'
import Result from 'components/Result'

interface StatefulListProps {
  onReload?: ErrorReloadProps['onReload']
  onLoadMore?: LoadingProps['onLoadMore']
  initError?: boolean
  empty?: boolean
  error?: boolean
  done?: boolean
  children?: ReactNode
}

const StatefulList: FC<StatefulListProps> = ({
  children,
  error = false,
  done = false,
  empty = false,
  onReload,
  initError,
  onLoadMore
}) => {
  const render = useCallback(() => {
    if (!initError) {
      if (error) return <Loading error={error} onLoadMore={onLoadMore} />
      if (done && empty) return <Result type="empty" subTitle="暂无数据" />
      if (done) return null
      return <Loading error={error} onLoadMore={onLoadMore} />
    }
  }, [done, empty, error, initError, onLoadMore])

  return (
    <div>
      {initError && <ErrorReload onReload={onReload} />}
      {children}
      {render()}
    </div>
  )
}

export default memo(StatefulList)
