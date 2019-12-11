import React, { FC, memo } from 'react'
import Typography from 'components/Typography'
import Chip from 'components/Chip'
import ItemCard from 'components/ItemCard'
import Divider from 'components/Divider'
import notify from 'components/Notification'
import Modal from 'components/Modal'
import NotFound from '../Exceptions/404'
import './index.scss'

const Album: FC = () => {
  return (
    <article className="p_album">
      <section className="p_album_header">
        <img
          alt=""
          src="https://static-cdn.jtvnw.net/ttv-boxart/League%20of%20Legends-144x192.jpg"
        />
        <div className="p_album_info">
          <Typography variant="h4">相册</Typography>
          <Typography className="p_album_info_meta" variant="body2">
            1年前 * 13张
          </Typography>
          <div className="p_album_info_tags">
            <Chip
              onClick={() => notify.success({ title: 'title' })}
              className="p_album_info_tag"
            >
              风景
            </Chip>
            <Chip
              onClick={() => Modal.alert({ title: 'alert' })}
              className="p_album_info_tag"
            >
              风景
            </Chip>
          </div>
          <div className="p_album_user">
            <img
              className="p_album_user_avatar"
              alt=""
              src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3953498865,3906563569&fm=26&gp=0.jpg"
            />
            <Typography variant="subtitle2">Nickname</Typography>
          </div>
        </div>
      </section>
      <Divider />
      {/* <section className="p_album_content">
        <ItemCard
          className="p_album_content_item"
          url="/"
          title="title"
          imgUrl="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2743268655,1778161208&fm=26&gp=0.jpg"
        />
      </section> */}
      <NotFound />
    </article>
  )
}

export default memo(Album)
