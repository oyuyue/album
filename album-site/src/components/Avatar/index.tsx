import React, { FC, memo } from 'react'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import './index.scss'

const DEFAULT_AVATAR =
  'https://abs.twimg.com/sticky/default_profile_images/default_profile_200x200.png'

interface AvatarProps {
  className?: string
  url?: string
  username?: string
}

const Avatar: FC<AvatarProps> = ({
  url = DEFAULT_AVATAR,
  username,
  className
}) => {
  return (
    <div className={clsx('avatar', className)}>
      {username && <Link className="avatar_link" to={`/users/${username}`} />}
      <img className="avatar_img" src={url} alt="avatar" />
    </div>
  )
}

export default memo(Avatar)
