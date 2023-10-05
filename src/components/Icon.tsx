import React, { useContext } from 'react'

import { ThemeContext, ColorName } from './common/theme'
import { IconSelect, IconName, iconNames as _iconNames } from '../assets/icons/GeneratedIcons'

export type IconNames = IconName
export const iconNames = _iconNames

type Props = {
  name: IconName
  color?: ColorName
  size?: string
  onClick?: (ev: React.MouseEvent) => void
  style?: {}
  className?: string
}
export const Icon = ({
  name,
  color = 'white',
  size = '1em',
  onClick,
  style = {},
  className,
}: Props) => {
  const theme = useContext(ThemeContext)
  return (
    <IconSelect
      name={name}
      iconProps={{
        color: theme[color],
        style: { width: size, height: size, ...style },
        className,
        onClick: onClick || undefined,
      }}
    />
  )
}
