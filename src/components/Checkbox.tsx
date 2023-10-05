import React, { useContext } from 'react'
import styled from 'styled-components'

import { ThemeContext } from './common/theme'
import { Button } from './Button'
import { Subtitle } from './Typography'

type Props = {
  value: boolean
  leftText?: string
  rightText?: string
  textMarginPx?: number
  onChange?: (v: boolean) => void
  style?: {}
  className?: string
}

export const Checkbox = ({
  value,
  leftText,
  rightText,
  textMarginPx = 12,
  onChange,
  style,
  className,
}: Props) => {
  const theme = useContext(ThemeContext)
  return (
    <Container className={className}>
      {leftText && (
        <Subtitle color="black" text={leftText} style={{ marginRight: `${textMarginPx}px` }} />
      )}
      <StyledButton
        onClick={(ev) => {
          ev.preventDefault()
          if (onChange) onChange(!value)
        }}
        radius={4}
        size="icon"
        color="primary"
        style={style}
        outline={!value}
        outlineSize="0.5px"
        outlineColor={theme['primary100']}
        iconLeft={value ? 'ok' : undefined}
      />
      {rightText && (
        <Subtitle color="black" text={rightText} style={{ marginLeft: `${textMarginPx}px` }} />
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
`

const StyledButton = styled(Button)<{ outlineColor: string }>`
  height: 24px;
  width: 24px;
`
