import React, { FC, memo, ReactNode } from 'react'
import ErrorReload, { ErrorReloadProps } from 'components/ErrorReload'
import Loading, { LoadingProps } from 'components/Loading'
import Result from 'components/Result'
import Divider from 'components/Divider'

interface StatefulListProps {
  onReload?: ErrorReloadProps['onReload']
  onLoadMore?: LoadingProps['onLoadMore']
  initError?: boolean
  error?: boolean
  done?: boolean
  empty?: boolean
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
  return (
    <div>
      {initError && <ErrorReload onReload={onReload} />}
      {children}
      {!initError &&
        (empty ? (
          <Result type="empty" subTitle="暂无数据" />
        ) : done ? (
          <Divider>到底了</Divider>
        ) : (
          <Loading error={error} onLoadMore={onLoadMore} />
        ))}
    </div>
  )
}

export default memo(StatefulList)
