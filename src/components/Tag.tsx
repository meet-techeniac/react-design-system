import React, { useContext } from 'react'
import styled from 'styled-components'

import { ThemeContext, ColorName } from './common/theme'
import { Icon, IconNames } from './Icon'

type Props = {
  text: string
  color?: ColorName
  iconRight?: IconNames
  style?: {}
}

export const Tag = ({ text, color = 'primary100', iconRight, style }: Props) => {
  const theme = useContext(ThemeContext)

  return (
    <StyledTag color={theme[color]} style={style}>
      <span
        style={{
          margin: 0,
          marginRight: iconRight && text ? '7px' : 0,
          padding: 0,
        }}
      >
        {text}
      </span>
      {iconRight && <Icon name={iconRight} />}
    </StyledTag>
  )
}

type StyledProps = { color: string }
const StyledTag = styled.span<StyledProps>`
  display: inline-block;
  font-family: 'Open Sans', sans-serif;
  font-size: 10px;
  font-weight: 600;
  border: none;
  background-color: ${(props) => props.color};
  color: white;
  white-space: nowrap;
  border-radius: 20px;
  padding-left: 6px;
  padding-right: 6px;
  padding-top: 2px;
  padding-bottom: 2px;
  text-align: center;
`
