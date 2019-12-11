import React, { FC, memo } from 'react'
import { Link } from 'react-router-dom'
import Result from 'components/Result'
import Typography from 'components/Typography'
import Button from 'components/Button'

const NotFound: FC = () => (
  <Result
    icon={<Typography variant="h1">404</Typography>}
    subTitle="页面不存在"
    extra={
      <Link to="/">
        <Button variant="contained" color="primary">
          返回首页
        </Button>
      </Link>
    }
  />
)

export default memo(NotFound)
