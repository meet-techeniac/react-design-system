import React, { useContext, useState } from 'react'
import styled from 'styled-components'

import { ThemeContext, ColorName } from './common/theme'
import { IconNames, Icon } from './Icon'

type RowStructure = {
  name: string
  label: string
  icon?: IconNames
  showArrow?: boolean
  children?: RowStructure[]
}
export type SidebarStructure = RowStructure[]

type Props = {
  structure?: SidebarStructure
  pinned?: SidebarStructure
  selected?: string
  color?: ColorName
  selectedColor?: ColorName
  logo?: string
  logoStyles?: {}
  onSelect?: (name: string) => void
  stickBottom?: boolean
  version?: string
  versionColor?: ColorName
  compact?: boolean
  style?: {}
  className?: string
}

export const Sidebar = ({
  structure = [],
  pinned = [],
  selected,
  color = 'primary100',
  selectedColor = 'primary50',
  logo,
  logoStyles,
  onSelect = (s: string) => {},
  stickBottom = false,
  compact = false,
  version,
  versionColor = 'gray100',
  style,
  className,
}: Props) => {
  const theme = useContext(ThemeContext)
  const [openSection, setOpenSection] = useState<string | null>(null)

  return (
    <StyledSidebar color={theme[color]} style={style} className={className}>
      <div style={{ width: '100%', overflow: 'auto' }}>
        {logo && <Logo src={logo} alt="Logo" style={logoStyles} />}
        {structure.map((row) => (
          <Row
            key={row.name}
            {...row}
            compact={compact}
            size="standard"
            color={theme['white']}
            open={openSection === row.name}
            onSelect={onSelect}
            onOpen={() => setOpenSection((os) => (os === row.name ? null : row.name))}
            backgroundColor={
              selected === row.name || row.children?.map((c) => c.name).includes(selected || '')
                ? theme[selectedColor]
                : theme[color]
            }
            selected={selected}
          />
        ))}
      </div>
      {stickBottom && <div style={{ flexGrow: 1 }} />}
      <BottomContainer color={theme[color]} stick={stickBottom}>
        {pinned.map((row) => (
          <Row
            key={row.name}
            {...row}
            size="standard"
            color={theme['white']}
            onSelect={onSelect}
            selected={selected}
            compact={compact}
            backgroundColor={selected === row.name ? theme[selectedColor] : theme[color]}
          />
        ))}
        {version && (
          <Row
            name="version"
            size="small"
            label={version}
            compact={compact}
            showArrow={false}
            color={theme[versionColor]}
            backgroundColor={theme[color]}
            onSelect={() => {}}
            selected={selected}
          />
        )}
      </BottomContainer>
    </StyledSidebar>
  )
}

const Row = ({
  name,
  icon,
  label,
  open = false,
  children = [],
  showArrow,
  color,
  backgroundColor,
  selected,
  onSelect,
  onOpen = () => {},
  size,
  child = false,
  greyedOut = false,
  padBottom = false,
  compact = false,
}: RowStructure & {
  color: string
  size: 'small' | 'standard'
  backgroundColor: string
  selected?: string
  open?: boolean
  child?: boolean
  greyedOut?: boolean
  padBottom?: boolean
  compact?: boolean
  onSelect: (name: string) => void
  onOpen?: () => void
}) => (
  <div style={{ display: 'flex', flexDirection: 'column' }}>
    <RowStyles
      key={name}
      onClick={(ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        if (children.length > 0) {
          onOpen()
        } else {
          onSelect(name)
        }
      }}
      color={greyedOut ? `${color}BF` : color}
      backgroundColor={backgroundColor}
      size={size}
      child={child}
      padBottom={padBottom}
    >
      <LeftIcon>
        {icon ? (
          <Icon name={icon} size="18px" style={{ margin: 0 }} />
        ) : (
          <div style={{ width: '18px', height: '18px', color: 'transparent' }} />
        )}
      </LeftIcon>
      {!compact && (
        <>
          <div>{label}</div>
          <RightArrow mustRotate={open}>
            {showArrow !== false && <Icon name="angle-right" size="24px" style={{ margin: 0 }} />}
          </RightArrow>
        </>
      )}
    </RowStyles>

    <ChildAnimatedPane open={open} childNumber={children.length}>
      {children.map((child, i) => (
        <Row
          key={child.name}
          {...child}
          {...{ color, size, backgroundColor, onSelect, selected }}
          child
          greyedOut={selected !== child.name}
          padBottom={i === children.length - 1}
        />
      ))}
    </ChildAnimatedPane>
  </div>
)

type StyledProps = {
  color: string
}
const StyledSidebar = styled.div<StyledProps>`
  width: calc(100% - 20px);
  height: 100%;
  background-color: ${(props) => props.color};
  margin: 0;
  border: none;
  padding-left: 10px;
  padding-right: 10px;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: flex-start;
`

type StyledLabelProps = {
  backgroundColor: string
  color: string
  size: 'standard' | 'small'
  child: boolean
  padBottom: boolean
}
const textStyles = {
  standard: { size: 13, weight: 600, mt: 3 },
  small: { size: 10, weight: 400, mt: 0 },
}
const RowStyles = styled.button<StyledLabelProps>`
  font-family: 'Open Sans', sans-serif;
  font-size: ${(props) => textStyles[props.size].size}px;
  font-weight: ${(props) => textStyles[props.size].weight};
  margin-top: ${(props) => (props.child ? 0 : textStyles[props.size].mt)}px;
  padding-left: ${(props) => (props.child ? 20 : 0)}px;
  padding-top: 13px;
  padding-bottom: ${(props) => (props.padBottom ? 23 : 13)}px;
  outline: none;
  border: none;
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  transition: background-color 0.3s ease;
  z-index: ${(props) => (props.child ? 0 : 1)};
  cursor: pointer;
`

const Logo = styled.img`
  width: calc(100% - 20px);
  margin-top: 70px;
  margin-bottom: 80px;
`

const LeftIcon = styled.div`
  margin-right: 15px;
  margin-left: 20px;
  margin-top: 3px;
`

const RightArrow = styled.div<{ mustRotate?: boolean }>`
  margin-left: auto;
  margin-right: 20px;
  margin-top: 3px;
  transform: ${(props) => (props.mustRotate ? 'rotate(90deg)' : 'none')};
  transition: transform 0.1s ease-out;
`

const ChildAnimatedPane = styled.div<{ open: boolean; childNumber: number }>`
  visibility: ${(props) => (props.open ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.open ? '1' : '0')};
  height: ${(props) => (props.open ? 'inherit' : '0')};
  max-height: ${(props) => (props.open ? `${props.childNumber * 50 + 40}px` : '0')};
  transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
  flex: ${(props) => (props.open ? 1 : 0)};
  overflow: hidden;
`

const BottomContainer = styled.div<{ color: string; stick: boolean }>`
  width: 100%;
  padding-bottom: 20px;
  ${(props) =>
    props.stick
      ? `
  position: sticky;
  bottom: 0;
  left: 0;
  z-index: 10;
  `
      : `
  margin-top: auto;
  `}
  background-color: ${(props) => props.color};
`
