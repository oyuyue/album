import React, { FC, memo } from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import Button from 'components/Button'
import Typography from 'components/Typography'
import Chip from 'components/Chip'
import Slider from 'components/Slider'
import Item from './Item'
import './index.scss'

const Details: FC<RouteComponentProps> = ({
  history: { goBack },
  location
}) => {
  console.log(location)

  return (
    <div>
      <article className="details">
        <section className="details_pic">
          <Slider
            renderItem={({ imageUrl }) => <Item imageUrl={imageUrl} />}
            dataSource={[
              {
                imageUrl:
                  'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3161338898,233540018&fm=26&gp=0.jpg'
              },
              {
                imageUrl:
                  'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3220900070,4133744143&fm=26&gp=0.jpg'
              },
              {
                imageUrl:
                  'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3161338898,233540018&fm=26&gp=0.jpg'
              },
              {
                imageUrl:
                  'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3161338898,233540018&fm=26&gp=0.jpg'
              },
              {
                imageUrl:
                  'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3161338898,233540018&fm=26&gp=0.jpg'
              }
            ]}
          />
        </section>
        <section className="details_info">
          <div className="details_info_user">
            <Link to="/">
              <img
                className="details_info_user_avatar"
                alt=""
                src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1358126537,2470243223&fm=26&gp=0.jpg"
              />
            </Link>
            <Typography variant="subtitle1">
              <Link to="/">NICKNAME</Link>
            </Typography>
          </div>
          <div className="details_info_meta">
            <div className="details_info_meta_head">
              <Typography variant="subtitle1">标题标题标题标题标题</Typography>
              <Button
                className="details_info_meta_head_btn"
                icon="star"
                size="big"
              />
            </div>
            <Typography variant="caption">
              <span>100人收藏</span>
              <span className="details_info_meta_dot">•</span>
              <span>1000次点击</span>
              <span className="details_info_meta_dot">•</span>
              <span>1星期前发布</span>
            </Typography>
          </div>
          <div className="details_info_tags">
            <Chip
              className="details_info_tag"
              variant="outlined"
              color="primary"
            >
              风景
            </Chip>
            <Chip
              className="details_info_tag"
              variant="outlined"
              color="primary"
            >
              人物
            </Chip>
          </div>
          <div className="details_album">
            <div className="details_album_icon">相册</div>
            <Typography className="details_album_name" variant="subtitle2">
              <Link to="/">相册相册相册相册相册</Link>
            </Typography>
            <Typography variant="caption">10张</Typography>
          </div>
        </section>
      </article>
      <div className="details_mask" onClick={goBack} />
    </div>
  )
}

export default memo(Details)
