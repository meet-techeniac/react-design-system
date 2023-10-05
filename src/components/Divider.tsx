import React, { useContext } from 'react'
import styled from 'styled-components'

import { ThemeContext, ColorName } from './common/theme'

type Props = {
  color?: ColorName
  height?: string
  style?: {}
  className?: string
}

export const Divider = ({ color = 'white', height = '12px', style, className }: Props) => {
  const theme = useContext(ThemeContext)

  return <StyledDivider color={theme[color]} height={height} style={style} className={className} />
}

type StyledProps = { color: string; height: string }
const StyledDivider = styled.span<StyledProps>`
  margin: 0;
  padding: 0;
  border: none;
  background-color: ${(props) => props.color};
  height: ${(props) => props.height};
`
