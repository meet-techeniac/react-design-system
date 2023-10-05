import React, { useContext } from 'react'

export type Theme = { [key in ColorName]: string }

export type ColorName =
  | 'black'
  | 'white'
  | 'gray100'
  | 'gray50'
  | 'gray20'
  | 'success100'
  | 'success50'
  | 'success20'
  | 'warning100'
  | 'warning50'
  | 'warning20'
  | 'danger100'
  | 'danger50'
  | 'danger20'
  | 'primary100'
  | 'primary50'
  | 'primary20'
  | 'secondary100'
  | 'secondary50'
  | 'secondary20'
  | 'tertiary100'
  | 'tertiary50'
  | 'tertiary20'

export const defaultTheme: Theme = {
  black: '#222222',
  white: '#ffffff',
  primary100: '#23d38a',
  primary50: '#85ebc1',
  primary20: '#d2f7e8',
  secondary100: '#302387',
  secondary50: '#968fc1',
  secondary20: '#d7d4ea',
  tertiary100: '#ff3796',
  tertiary50: '#ff9ccb',
  tertiary20: '#ffd9eb',
  gray100: '#828894',
  gray50: '#e5e7eb',
  gray20: '#f7f7f7',
  success100: '#a1dd70',
  success50: '#d0edb8',
  success20: '#e8f6dd',
  warning100: '#fdd043',
  warning50: '#fee69a',
  warning20: '#fff6da',
  danger100: '#ff5959',
  danger50: '#feaeae',
  danger20: '#fedcdc',
}

export const ThemeContext = React.createContext(defaultTheme)

export const useTheme = () => {
  return useContext(ThemeContext)
}
