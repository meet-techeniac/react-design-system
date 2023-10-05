import React, { useContext } from 'react'
import { compose } from 'ramda'

import { ThemeContext } from './common/theme'
import {
  Container,
  Description,
  StyledInputContainer,
  StyledInput,
  Label,
  InputProps,
} from './Input'

const capitalize = (s: string) => (s.length === 0 ? '' : s.charAt(0).toUpperCase() + s.slice(1))
const splitDashes = (s: string) => s.split(/_|-/)
const join = (s: string[]) => s.join(' ')
export const dashesToText = compose(join, splitDashes, capitalize)

export type NumericInputProps = Omit<
  InputProps,
  'type' | 'rows' | 'columns' | 'value' | 'onChange'
> & { step?: number; value?: number; onChange?: (value: number) => void }

const noop = (...s: any[]) => {}
export function NumericInput({
  name,
  step,
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
  rightWidget,
  disabledBackgroundColor = 'gray20',
  style,
  className,
}: NumericInputProps) {
  const theme = useContext(ThemeContext)

  return (
    <Container style={style} className={className}>
      {label !== '' && (
        <Label htmlFor={name} color={theme['black']}>
          {label}
        </Label>
      )}
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
          {...{ name, step, placeholder, onFocus, onBlur, disabled }}
          size={1}
          type="number"
          autoComplete={autocomplete}
          onChange={onChange && !disabled ? (ev) => onChange(parseFloat(ev.target.value)) : noop}
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
      {description && <Description color={theme['gray100']}>{description}</Description>}
      {!valid && <Description color={theme['danger100']}>{errorText}</Description>}
    </Container>
  )
}
