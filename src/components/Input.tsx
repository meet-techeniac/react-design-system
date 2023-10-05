import React, { useContext } from 'react'
import styled from 'styled-components'
import { compose } from 'ramda'

import { ThemeContext, ColorName } from './common/theme'

const capitalize = (s: string) => (s.length === 0 ? '' : s.charAt(0).toUpperCase() + s.slice(1))
const splitDashes = (s: string) => s.split(/_|-/)
const join = (s: string[]) => s.join(' ')
export const dashesToText = compose(join, splitDashes, capitalize)

type Size = 'small' | 'large'
export type InputProps = {
  name: string
  type?: 'text' | 'email' | 'password'
  autocomplete?: string
  size?: Size
  label?: string
  placeholder?: string
  description?: string
  errorText?: string
  valid?: boolean
  disabled?: boolean
  outlineColor?: ColorName
  onFocus?: () => void
  onBlur?: () => void
  onChange?: (s: string) => void
  value?: string
  rows?: number
  columns?: number
  rightWidget?: React.ReactNode
  disabledBackgroundColor?: ColorName
  style?: {}
  className?: string
}

const noop = (...s: any[]) => {}
export function Input({
  name,
  type = 'text',
  autocomplete,
  size = 'small',
  label = dashesToText(name),
  placeholder = label,
  outlineColor = 'primary100',
  description,
  errorText = description,
  valid = true,
  disabled = false,
  onFocus = noop,
  onBlur = noop,
  onChange,
  value,
  rows,
  columns,
  rightWidget,
  disabledBackgroundColor = 'gray20',
  style,
  className,
}: InputProps) {
  const theme = useContext(ThemeContext)

  return (
    <Container style={style} className={className}>
      {label !== '' && (
        <Label htmlFor={name} color={theme['black']}>
          {label}
        </Label>
      )}
      {rows || columns ? (
        <StyledTextArea
          {...{ name, type, placeholder, onFocus, onBlur, disabled }}
          autoComplete={autocomplete}
          onChange={onChange && !disabled ? (ev) => onChange(ev.target.value) : noop}
          value={value}
          padding={size}
          focusColor={theme[outlineColor]}
          textColor={theme['black']}
          blurredColor={theme['gray100']}
          errorColor={valid ? undefined : theme['danger100']}
          backgroundColor={theme['white']}
          disabledBackgroundColor={theme[disabledBackgroundColor]}
          rows={rows}
          cols={columns}
        />
      ) : (
        <StyledInputContainer
          padding={size}
          focusColor={theme[outlineColor]}
          textColor={theme['black']}
          blurredColor={theme['gray100']}
          errorColor={valid ? undefined : theme['danger100']}
          disabled={disabled}
          backgroundColor={theme['white']}
          disabledBackgroundColor={theme[disabledBackgroundColor]}
        >
          <StyledInput
            {...{ name, type, placeholder, onFocus, onBlur, disabled }}
            size={1}
            autoComplete={autocomplete}
            onChange={onChange && !disabled ? (ev) => onChange(ev.target.value) : noop}
            value={value}
            padding={size}
            focusColor={theme[outlineColor]}
            textColor={theme['black']}
            blurredColor={theme['gray100']}
            errorColor={valid ? undefined : theme['danger100']}
            backgroundColor={theme['white']}
            disabledBackgroundColor={theme[disabledBackgroundColor]}
          />
          {rightWidget}
        </StyledInputContainer>
      )}
      {description && <Description color={theme['gray100']}>{description}</Description>}
      {!valid && <Description color={theme['danger100']}>{errorText}</Description>}
    </Container>
  )
}

export const Container = styled.div`
  width: 100%;
  > * {
    width: 100%;
  }
`

type Padding = { [key in Size]: { x: number; y: number } }
const paddings: Padding = {
  small: { x: 8, y: 7 },
  large: { x: 20, y: 19 },
}
type StyledProps = {
  textColor: string
  blurredColor: string
  focusColor: string
  padding: Size
  backgroundColor: string
  disabledBackgroundColor: string
  errorColor?: string
  disabled?: boolean
}
export const StyledInput = styled.input<StyledProps>`
  font-family: 'Open Sans', sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: ${(props) => (props.disabled ? props.blurredColor : props.textColor)};
  background-color: ${(props) =>
    props.disabled ? props.disabledBackgroundColor : props.backgroundColor};
  border: none;
  margin: 0;
  /* box-sizing: border-box; */
  padding: ${(props) => paddings[props.padding].x}px ${(props) => paddings[props.padding].y}px;
  /* border: ${(props) => paddings[props.padding].x}px ${(props) =>
  paddings[props.padding].y}px solid
    ${(props) => (props.disabled ? props.disabledBackgroundColor : props.backgroundColor)}; */
  outline: none;
  flex-grow: 2;
  ::-webkit-input-placeholder {
    color: ${(props) => props.blurredColor};
  }
  ::placeholder {
    color: ${(props) => props.blurredColor};
  }
  :disabled {
    background-color: ${(props) => props.disabledBackgroundColor};
  }
`

export const StyledInputContainer = styled.div<StyledProps>`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  border: 0.5px solid ${(props) => props.errorColor || props.blurredColor};
  margin: 0;
  width: 100%;
  max-width: 100%;
  /* //calc(100% - ${(props) => paddings[props.padding].x * 2}px); */
  border-radius: 2px;
  outline: none;
  background-color: ${(props) =>
    props.disabled ? props.disabledBackgroundColor : props.backgroundColor};
  :focus {
    border: 0.5px solid ${(props) => props.errorColor || props.focusColor};
  }
`

const StyledTextArea = styled.textarea<StyledProps>`
  font-family: 'Open Sans', sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: ${(props) => (props.disabled ? props.blurredColor : props.textColor)};
  border: 0.5px solid ${(props) => props.errorColor || props.blurredColor};
  margin: 0;
  padding-left: ${(props) => paddings[props.padding].x}px;
  padding-right: ${(props) => paddings[props.padding].x}px;
  padding-top: ${(props) => paddings[props.padding].y}px;
  padding-bottom: ${(props) => paddings[props.padding].y}px;
  width: calc(100% - ${(props) => paddings[props.padding].x * 2}px);
  border-radius: 2px;
  outline: none;
  background-color: ${(props) =>
    props.disabled ? props.disabledBackgroundColor : props.backgroundColor};
  :focus {
    border: 0.5px solid ${(props) => props.errorColor || props.focusColor};
  }
  :disabled {
    background-color: ${(props) => props.disabledBackgroundColor};
  }
  ::-webkit-input-placeholder {
    /* Edge */
    color: ${(props) => props.blurredColor};
  }
  ::placeholder {
    color: ${(props) => props.blurredColor};
  }
`

type StyledLabelProps = { color: string }
export const Label = styled.label<StyledLabelProps>`
  font-family: 'Open Sans', sans-serif;
  font-size: 13px;
  font-weight: 600;
  color: ${(props) => props.color};
  margin: 0;
  padding: 0;
  margin-bottom: 5px;
  display: inline-block;
`

export const Description = styled.span<StyledLabelProps>`
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: ${(props) => props.color};
  margin: 0;
  padding: 0;
  margin-top: 5px;
  display: inline-block;
`
