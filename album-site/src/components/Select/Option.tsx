import { FC, memo, ReactNode } from 'react'
import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome'

interface OptionProps extends Partial<Omit<HTMLOptionElement, 'children'>> {
  children?: ReactNode
  label?: string
  icon?: FontAwesomeIconProps['icon']
}

const Option: FC<OptionProps> = () => null

export default memo(Option)
