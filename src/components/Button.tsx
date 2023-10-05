import React, { useContext } from 'react'
import styled from 'styled-components'
import 'microtip/microtip.css'

import { ThemeContext, ColorName } from './common/theme'
import { Icon, IconNames } from './Icon'

export type ButtonColorNames = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'gray'
const buttonColors: { [key in ButtonColorNames]: { full: ColorName; disabled: ColorName } } = {
  primary: { full: 'primary100', disabled: 'primary50' },
  secondary: { full: 'secondary100', disabled: 'secondary50' },
  success: { full: 'success100', disabled: 'success50' },
  warning: { full: 'warning100', disabled: 'warning50' },
  danger: { full: 'danger100', disabled: 'danger50' },
  gray: { full: 'gray100', disabled: 'gray50' },
}

type Size = 'icon' | 'small' | 'medium' | 'large'
type Props = {
  text?: string
  onClick?: (ev: React.MouseEvent) => void
  size?: Size
  radius?: number
  color?: ButtonColorNames
  outline?: boolean
  outlineSize?: string
  disabled?: boolean
  iconLeft?: IconNames
  iconRight?: IconNames
  loading?: boolean
  type?: 'button' | 'reset' | 'submit'
  tooltip?: string
  tooltipPosition?:
    | 'top'
    | 'top-left'
    | 'top-right'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right'
    | 'left'
    | 'right'
  tooltipSize?: 'small' | 'medium' | 'large' | 'fit'
  style?: {}
  className?: string
}

export const Button = ({
  text,
  onClick = () => {},
  size = 'medium',
  radius = 0,
  color = 'primary',
  outline = false,
  outlineSize = '3px',
  disabled = false,
  loading = false,
  iconLeft,
  iconRight,
  type,
  tooltip,
  tooltipPosition = 'top',
  tooltipSize,
  style,
  className,
}: Props) => {
  const theme = useContext(ThemeContext)
  const { full, disabled: disabledColor } = buttonColors[color]
  const leftIcon = loading ? 'loader' : iconLeft
  const rightIcon = loading ? undefined : iconRight
  const iconSize = size === 'icon' ? '.9em' : '1.2em'

  return (
    <StyledButton
      color={theme[loading ? 'gray100' : disabled ? disabledColor : full]}
      {...{ size, radius, outline, outlineSize, disabled, type }}
      onClick={disabled ? (ev) => {} : onClick}
      style={style}
      className={className}
      aria-label={tooltip}
      data-microtip-position={tooltip ? tooltipPosition : undefined}
      data-microtip-size={tooltip ? tooltipSize : undefined}
      role={tooltip ? 'tooltip' : undefined}
    >
      {leftIcon && <Icon name={leftIcon as IconNames} size={iconSize} style={{ margin: 0 }} />}
      <span
        style={{
          marginLeft: leftIcon && text ? '7px' : 0,
          marginRight: rightIcon && text ? '7px' : 0,
          transition: 'margin 0.5s ease',
        }}
      >
        {text}
      </span>
      {rightIcon && <Icon name={rightIcon} size={iconSize} style={{ margin: 0 }} />}
    </StyledButton>
  )
}

type Padding = { [key in Size]: { x: number; y: number } }
const paddings: Padding = {
  icon: { x: 0, y: 0 },
  small: { x: 8, y: 7 },
  medium: { x: 10, y: 14 },
  large: { x: 20, y: 19 },
}
type StyledProps = {
  color: string
  size: Size
  radius: number
  outline: boolean
  outlineSize: string
  disabled: boolean
}
const StyledButton = styled.button<StyledProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.size !== 'icon' ? '100%' : '24px')};
  height: ${(props) => (props.size !== 'icon' ? 'auto' : '24px')};
  font-family: 'Open Sans', sans-serif;
  font-size: 15px;
  font-weight: 600;
  outline: none;
  cursor: pointer;
  border: ${(props) => (props.outline ? `${props.outlineSize} solid ${props.color};` : 'none')};
  background-color: ${(props) => (props.outline ? 'white' : props.color)};
  color: ${(props) => (props.outline ? props.color : 'white')};
  border-radius: ${(props) => props.radius}px;
  padding-left: ${(props) => paddings[props.size].x}px;
  padding-right: ${(props) => paddings[props.size].x}px;
  padding-top: ${(props) => paddings[props.size].y}px;
  padding-bottom: ${(props) => paddings[props.size].y}px;
  transition: opacity 0.3s ease, color 0.5s ease, background-color 0.2s ease;
  :hover {
    ${(props) => (props.disabled ? '' : 'opacity: 0.8')};
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  }
`
