import React, { FC, memo, ReactNode } from 'react'
import ErrorReload, { ErrorReloadProps } from 'components/ErrorReload'
import Loading, { LoadingProps } from 'components/Loading'
import Result from 'components/Result'
import Divider from 'components/Divider'

interface StatefulListProps {
  onReload?: ErrorReloadProps['onReload']
  onLoadMore?: LoadingProps['onLoadMore']
  loadingError?: LoadingProps['error']
  reloadError?: boolean
  isDone?: boolean
  empty?: boolean
  children?: ReactNode
}

const StatefulList: FC<StatefulListProps> = ({
  children,
  reloadError = false,
  isDone = false,
  empty = false,
  onReload,
  loadingError,
  onLoadMore
}) => {
  return (
    <div>
      {reloadError && <ErrorReload onReload={onReload} />}
      {children}
      {empty && <Result type="empty" subTitle="暂无数据" />}
      {!isDone && !reloadError && !empty && (
        <Loading error={loadingError} onLoadMore={onLoadMore} />
      )}
      {isDone && !reloadError && !empty && <Divider>到底了</Divider>}
    </div>
  )
}

export default memo(StatefulList)
