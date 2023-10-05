import React, { useContext } from 'react'
import styled from 'styled-components'
import { ColorName, ThemeContext } from './common/theme'

type Props = {
  type?: TypographyType
  text?: string
  color?: ColorName
  style?: {}
  [key: string]: any
}
export const Typography: React.FC<Props> = ({
  type = 'title',
  text,
  color = 'primary100',
  style,
  children,
  ...other
}) => {
  const theme = useContext(ThemeContext)
  return (
    <StyledTypography type={type} color={theme[color]} style={style} {...other}>
      {text}
      {children}
    </StyledTypography>
  )
}

type HOCProps = Omit<Props, 'type'>
export const Title: React.FC<HOCProps> = (props) => (
  <Typography as="div" {...props} type="title">
    {props.children}
  </Typography>
)
export const Subtitle: React.FC<HOCProps> = (props) => (
  <Typography as="div" color="gray100" {...props} type="subtitle">
    {props.children}
  </Typography>
)
export const HeaderTitle: React.FC<HOCProps> = (props) => (
  <Typography as="div" {...props} type="headerTitle">
    {props.children}
  </Typography>
)
export const SectionTitle: React.FC<HOCProps> = (props) => (
  <Typography as="div" {...props} type="sectionTitle">
    {props.children}
  </Typography>
)
export const Label: React.FC<HOCProps & { htmlFor?: string }> = (props) => (
  <Typography as="label" {...props} type="label">
    {props.children}
  </Typography>
)
export const Description: React.FC<HOCProps> = (props) => (
  <Typography {...props} type="label">
    {props.children}
  </Typography>
)

export type TypographyType =
  | 'title'
  | 'subtitle'
  | 'headerTitle'
  | 'sectionTitle'
  | 'label'
  | 'description'

const attrs: {
  [key in TypographyType]: {
    sizePx: number
    weight: number
    lineHeightPx?: number
  }
} = {
  title: { sizePx: 30, weight: 800 },
  subtitle: { sizePx: 13, weight: 600, lineHeightPx: 24 },
  headerTitle: { sizePx: 36, weight: 800, lineHeightPx: 48 },
  sectionTitle: { sizePx: 15, weight: 800 },
  label: { sizePx: 13, weight: 600 },
  description: { sizePx: 12, weight: 400 },
}

type StyledProps = { color: string; type: TypographyType }
const StyledTypography = styled.div<StyledProps>`
  display: inline-block;
  font-family: 'Open Sans', sans-serif;
  font-size: ${(props) => attrs[props.type].sizePx}px;
  font-weight: ${(props) => attrs[props.type].weight};
  line-height: ${(props) =>
    attrs[props.type].lineHeightPx ? attrs[props.type].lineHeightPx + 'px' : 'normal'};
  color: ${(props) => props.color};
`
