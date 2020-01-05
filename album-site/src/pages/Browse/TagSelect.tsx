import React, { FC, memo } from 'react'
import Select, { Option } from 'components/Select'

interface TagSelectProps {
  tags: string[]
  onChange: (value: any) => void
}

const TagSelect: FC<TagSelectProps> = ({ tags, onChange }) => {
  return (
    <Select
      multiple
      value={tags}
      onChange={onChange}
      // onFocus={fetchHandler}
      // onReload={fetchHandler}
      // loadError={status === StateableStatus.ERROR}
      // loading={status === StateableStatus.LOADING}
      className="browse_filter_item_select"
    >
      {/* {content.map(({ id, name }) => (
        <Option key={id} value={id}>
          {name}
        </Option>
      ))} */}
    </Select>
  )
}

export default memo(TagSelect)
