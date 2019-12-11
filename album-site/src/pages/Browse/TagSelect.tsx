import React, { FC, memo, useCallback, useEffect } from 'react'
import Select, { Option } from 'components/Select'
import useShallowSelector from 'hooks/useShallowSelector'
import { StateableStatus } from 'store/hors/stateable'
import { useDispatch } from 'react-redux'
import { fetchCategories, fetchTags } from 'store/actions'
import { selectCategory } from 'store/reducers/category'
import { selectTag } from 'store/reducers/tag'
import { PathnameType } from '.'

interface TagSelectProps {
  tags: string[]
  onChange: (value: any) => void
  type: PathnameType
}

const TagSelect: FC<TagSelectProps> = ({ tags, onChange, type }) => {
  const dispatch = useDispatch()
  const { status, content = [] } = useShallowSelector(
    type === PathnameType.ALBUMS ? selectCategory : selectTag
  )

  const fetchHandler = useCallback(() => {
    if (status === StateableStatus.SUCCESS && content.length) return
    dispatch(type === PathnameType.ALBUMS ? fetchCategories() : fetchTags())
  }, [content.length, dispatch, status, type])

  useEffect(() => {
    if (tags && tags.length) fetchHandler()
  }, [tags, fetchHandler])

  return (
    <Select
      multiple
      value={tags}
      onChange={onChange}
      onFocus={fetchHandler}
      onReload={fetchHandler}
      loadError={status === StateableStatus.ERROR}
      loading={status === StateableStatus.LOADING}
      className="browse_filter_item_select"
    >
      {content.map(({ id, name }) => (
        <Option key={id} value={id}>
          {name}
        </Option>
      ))}
    </Select>
  )
}

export default memo(TagSelect)
