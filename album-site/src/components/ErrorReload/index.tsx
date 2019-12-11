import React, { FC, memo } from 'react'
import TipBar, { TipBarProps } from 'components/TipBar'
import Button from 'components/Button'

export interface ErrorReloadProps extends TipBarProps {
  onReload?: () => void
}

const ErrorReload: FC<ErrorReloadProps> = ({
  text = '加载失败',
  onReload,
  ...rest
}) => (
  <TipBar text={text} {...rest}>
    <Button onClick={onReload} color="blue">
      重新加载
    </Button>
  </TipBar>
)

export default memo(ErrorReload)
