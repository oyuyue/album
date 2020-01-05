import React, { FC, memo } from 'react'
import Items from './Items'
import './index.scss'

const Search: FC = () => {
  // const dispatch = useDispatch()
  // const term = useMemo(() => new URLSearchParams(search).get('term') || '', [
  //   search
  // ])

  return (
    <article className="search">
      {/* <section className="search_tabs">
          <Tab >相片</Tab>
          <Tab>用户</Tab>
        </Tabs>
      </section> */}
      <section className="search_content">
        <Items />
      </section>
    </article>
  )
}

export default memo(Search)
