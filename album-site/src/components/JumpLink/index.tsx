import React, { FC, memo } from 'react'
import { Link, LinkProps } from 'react-router-dom'

function isInnerLink(url: string): boolean {
  if (!url || url.length < 2) return true
  const si = url.indexOf(':')
  const ei = url.lastIndexOf(':')
  return !(si === ei && si !== -1)
}

const JumpLink: FC<Partial<LinkProps> & { url: string }> = ({ url, ...rest }) =>
  isInnerLink(url) ? (
    <Link to={url} {...rest} />
  ) : (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a {...rest} href={url} target="_blank" rel="noopener noreferrer" />
  )

export default memo(JumpLink)
