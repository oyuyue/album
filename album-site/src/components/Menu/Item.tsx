import { FC, HTMLAttributes } from 'react'
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

interface ItemProps extends HTMLAttributes<HTMLLIElement> {
  icon?: FontAwesomeIconProps['icon']
  suffixIcon?: FontAwesomeIconProps['icon']
  variant?: 'divider'
  to?: string
}

const Item: FC<ItemProps> = () => null

export default Item
