import React, { useContext } from 'react'
import styled from 'styled-components'

import { ThemeContext } from './common/theme'
import { Button } from './Button'
import { Subtitle } from './Typography'

type RadioProps = {
  value: boolean
  leftText?: string
  rightText?: string
  textMarginPx?: number
  disabled?: boolean
  onClick?: () => void
  style?: {}
  className?: string
}

export const Radio = ({
  value,
  leftText,
  rightText,
  textMarginPx = 12,
  disabled = false,
  onClick,
  style,
  className,
}: RadioProps) => {
  const theme = useContext(ThemeContext)
  return (
    <Container className={className}>
      {leftText && (
        <Subtitle
          color={disabled ? 'gray100' : 'black'}
          text={leftText}
          style={{ marginRight: `${textMarginPx}px` }}
        />
      )}
      <StyledButton
        onClick={(ev) => {
          ev.preventDefault()
          if (onClick) onClick()
        }}
        disabled={disabled}
        radius={24}
        size="icon"
        color="primary"
        style={style}
        outline={!value}
        outlineSize="0.5px"
        outlineColor={theme['primary100']}
        iconLeft={value ? 'ok' : undefined}
      />
      {rightText && (
        <Subtitle
          color={disabled ? 'gray100' : 'black'}
          text={rightText}
          style={{ marginLeft: `${textMarginPx}px` }}
        />
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

export const Radios: React.FC<{
  value: string
  choices: { key: string; label: string; disabled?: boolean }[]
  onChange: (value: string) => void
  left?: boolean
  column?: boolean
  disabled?: boolean
  className?: string
}> = ({ value, choices, onChange, left = false, column = false, disabled = false, className }) => {
  return (
    <RadioContainer
      direction={column ? 'column' : 'row'}
      alignRight={column && left}
      className={className}
    >
      {choices.map(({ key, label, disabled: specificDisabled }) => (
        <Radio
          key={key}
          leftText={left ? label : undefined}
          rightText={!left ? label : undefined}
          value={value === key}
          onClick={() => onChange(key)}
          disabled={disabled || specificDisabled}
        />
      ))}
    </RadioContainer>
  )
}

const RadioContainer = styled.div<{ direction: 'row' | 'column'; alignRight: boolean }>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  align-items: ${(props) =>
    props.direction === 'column' && props.alignRight ? 'flex-end' : 'flex-start'};
  justify-content: flex-start;
  > :nth-child(n + 2) {
    margin-top: ${(props) => (props.direction === 'row' ? 'initial' : '20px')};
    margin-left: ${(props) => (props.direction === 'column' ? 'initial' : '30px')};
  }
`
