import React, { FC, memo, useMemo, useEffect, useCallback } from 'react'
import { RouteComponentProps } from 'react-router'
import { useDispatch } from 'react-redux'
import Tabs, { Tab } from 'components/Tabs'
import { SearchKey } from 'store/reducers/search'
import { search as searchAction } from 'store/actions'
import Items from './Items'
import './index.scss'

const Search: FC<RouteComponentProps<{ type: SearchKey }>> = ({
  history: { replace },
  location: { search },
  match: {
    params: { type }
  }
}) => {
  const dispatch = useDispatch()
  const term = useMemo(() => new URLSearchParams(search).get('term') || '', [
    search
  ])
  useEffect(() => {
    dispatch(searchAction(type || SearchKey.PHOTOS, { term }))
  }, [dispatch, term, type])

  const switchHandler = useCallback(
    (v: SearchKey) => {
      replace(`/search/${v}?term=${term}`)
    },
    [replace, term]
  )

  return (
    <article className="search">
      <section className="search_tabs">
        <Tabs value={type || SearchKey.PHOTOS} onChange={switchHandler}>
          <Tab value={SearchKey.PHOTOS}>相片</Tab>
          <Tab value={SearchKey.ALBUMS}>相册</Tab>
          <Tab value={SearchKey.USERS}>用户</Tab>
        </Tabs>
      </section>
      <section className="search_content">
        <Items />
      </section>
    </article>
  )
}

export default memo(Search)
