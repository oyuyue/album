import React, { FC, memo } from 'react'
import Banner from './Banner'
import Recommend from './Recommend'
import './index.scss'

const Discover: FC = () => {
  return (
    <article className="discover">
      <Banner />
      <Recommend />
    </article>
  )
}

export default memo(Discover)
