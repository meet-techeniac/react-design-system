import React, { useContext } from 'react'
import styled from 'styled-components'

import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import './css/datepicker.css'

import { ThemeContext } from './common/theme'
import { InputProps, dashesToText } from './Input'
import { Description, Label } from './Typography'

type Props = Omit<InputProps, 'onChange'> &
  Omit<ReactDatePickerProps, 'onChange'> & { onChange?: (date: Date) => void }
export const DateTimePicker = ({
  name,
  type = 'text',
  size = 'small',
  label = dashesToText(name),
  placeholder = label,
  outlineColor = 'primary100',
  description,
  errorText = description,
  valid = true,
  disabled = false,
  onFocus = () => {},
  onBlur = () => {},
  onChange = () => {},
  style,
  className,
  ...others
}: Props) => {
  const theme = useContext(ThemeContext)

  return (
    <Container style={style} className={className}>
      {label !== '' && (
        <Label htmlFor={name} text={label} color="black" style={{ paddingBottom: '5px' }} />
      )}
      <DatePickerWrapper focuscolor={theme[outlineColor]} textColor={theme['black']} blurredColor={theme['gray100']} errorColor={valid ? undefined : theme['danger100']}
          disabled={disabled}>
        <StyledDatePicker
          // focuscolor={theme[outlineColor]}
          // textColor={theme['black']}
          // blurredColor={theme['gray100']}
          // errorColor={valid ? undefined : theme['danger100']}
          // disabled={disabled}
          timeFormat="p"
          timeIntervals={15}
          dateFormat={others.showTimeSelect || others.showTimeSelectOnly ? 'Pp' : 'P'}
          onChange={onChange}
          {...others}
        />
      </DatePickerWrapper>
      {description && <StyledDescription color="gray100" text={description} />}
      {!valid && <StyledDescription color="danger100" text={errorText} />}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  > * {
    width: 100%;
  }
`

const StyledDescription = styled(Description)`
  margin-top: 5px;
  font-weight: 400;
  font-size: 12px;
`

type StyledProps = {
  textColor: string
  blurredColor: string
  focuscolor: string
  errorColor?: string
  disabled?: boolean
}
// This style injects CSS variables, to be used in datepicker.css
const StyledDatePicker = styled(DatePicker)<StyledProps>`
  --primary-color: ${(props) => props.focuscolor};
  --color: ${(props) => (props.disabled ? props.blurredColor : props.textColor)};
  --border-color: ${(props) => props.errorColor || props.blurredColor};
  --focus-border-color: ${(props) => props.errorColor || props.focuscolor};
  --placeholder-color: ${(props) => props.blurredColor};
`
const DatePickerWrapper = styled.div<StyledProps>`
--primary-color: ${(props) => props.focuscolor};
--color: ${(props) => (props.disabled ? props.blurredColor : props.textColor)};
--border-color: ${(props) => props.errorColor || props.blurredColor};
--focus-border-color: ${(props) => props.errorColor || props.focuscolor};
--placeholder-color: ${(props) => props.blurredColor};
`;