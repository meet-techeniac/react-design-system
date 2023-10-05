import React, { useContext } from 'react'
import styled from 'styled-components'

import { ThemeContext, ColorName } from './common/theme'
import { Icon } from './Icon'
import ReactModal from 'react-modal'

type Props = {
  title?: string
  open?: boolean
  color?: ColorName
  onClose?: () => void
  className?: string,
  children?: JSX.Element | JSX.Element[]

}

ReactModal.setAppElement('#root')

export const Modal: React.FC<Props> = ({
  title,
  open = false,
  color = 'gray50',
  onClose,
  className,
  children,
}) => {
  const theme = useContext(ThemeContext)

  return (
    <ReactModal
      isOpen={open}
      onRequestClose={onClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0,0,0,0.40)',
          zIndex: 10,
        },
        content: {
          padding: 0,
          margin: 0,
          backgroundColor: theme[color],
        },
      }}
      className={className}
    >
      <Header textColor={theme['black']}>
        <span>{title}</span>
        <ExitIcon name="exit" size="24px" color="black" onClick={onClose} />
      </Header>
      {children}
    </ReactModal>
  )
}

const Header = styled.div<{ textColor: string }>`
  display: flex;
  box-sizing: border-box;
  flex-flow: row nowrap;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 34px;
  padding-top: 20px;
  padding-bottom: 20px;
  align-items: center;
  width: 100%;
  font-family: 'Open Sans', sans-serif;
  font-weight: 800;
  font-size: 18px;
  color: ${(props) => props.textColor};
  user-select: none;
`

const ExitIcon = styled(Icon)`
  cursor: pointer;
  user-select: none;
`
