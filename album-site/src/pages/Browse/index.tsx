import React, { FC, memo, useCallback, useMemo } from 'react'
import { RouteComponentProps } from 'react-router'
import { isString } from 'lodash-es'
import Typography from 'components/Typography'
import Tabs, { Tab } from 'components/Tabs'
import Select, { Option } from 'components/Select'
import { stringifyQuery } from 'utils'
import Items from './Items'
import TagSelect from './TagSelect'
import './index.scss'

export enum PathnameType {
  ALBUMS = 'albums',
  PHOTOS = 'photos'
}

const Browse: FC<RouteComponentProps<{ type: PathnameType }>> = ({
  history: { replace },
  match: {
    params: { type }
  },
  location: { search, pathname }
}) => {
  const { sort, tags } = useMemo(() => {
    const query = new URLSearchParams(search)
    const tags = query.get('tags')
    return {
      sort: query.get('sort') || '',
      tags: tags && isString(tags) ? tags.split(',') : []
    }
  }, [search])
  const sortChangeHandler = useCallback(
    sort =>
      replace(
        pathname +
          stringifyQuery({
            tags,
            sort
          })
      ),
    [pathname, replace, tags]
  )
  const tagsChangeHandler = useCallback(
    tags => replace(pathname + stringifyQuery({ tags, sort })),
    [pathname, replace, sort]
  )
  const switchHandler = useCallback(
    (v: PathnameType) => replace('/browse/' + v),
    [replace]
  )

  return (
    <article className="browse">
      <section className="browse_head">
        <Typography>浏览</Typography>
        <Tabs
          className="browse_tabs"
          value={type || PathnameType.PHOTOS}
          onChange={switchHandler}
        >
          <Tab value={PathnameType.PHOTOS}>相片</Tab>
          <Tab value={PathnameType.ALBUMS}>相册</Tab>
        </Tabs>
        <div className="browse_filter">
          <div className="browse_filter_item">
            <Typography
              className="browse_filter_item_label"
              variant="subtitle1"
            >
              筛选条件
            </Typography>
            <TagSelect tags={tags} onChange={tagsChangeHandler} type={type} />
          </div>
          <div className="browse_filter_item">
            <Typography
              className="browse_filter_item_label"
              variant="subtitle1"
            >
              排序方式
            </Typography>
            <Select
              onChange={sortChangeHandler}
              value={sort}
              className="browse_filter_item_select"
            >
              <Option value="">推荐</Option>
              <Option value="views,DESC">浏览次数（高到低）</Option>
            </Select>
          </div>
        </div>
      </section>
      <Items type={type} sort={sort} tags={tags} />
    </article>
  )
}

export default memo(Browse)
