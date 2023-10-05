import React, { useContext } from 'react'
import styled from 'styled-components'

import { ThemeContext, ColorName } from './common/theme'
import { Icon } from './Icon'

type Props = {
  currentPage?: number
  totalPages?: number
  numbersForSide?: number
  onPageSelect?: (page: number) => void
  selectedColor?: ColorName
  style?: {}
}

export const Paginator = ({
  currentPage = 0,
  totalPages = 1,
  numbersForSide = 2,
  onPageSelect = () => {},
  selectedColor = 'primary100',
  style,
}: Props) => {
  const theme = useContext(ThemeContext)

  let leftSide = numbersForSide
  let rightSide = numbersForSide

  if (currentPage < numbersForSide) {
    // Beginning
    leftSide = currentPage
  }
  if (currentPage > totalPages - 1 - numbersForSide) {
    // End
    rightSide = totalPages - 1 - currentPage
  }

  const leftNumbers = Array.from(Array(leftSide).keys()).map((i) => currentPage - leftSide + i + 1)
  const rightNumbers = Array.from(Array(rightSide).keys()).map((i) => currentPage + 1 + i + 1)

  return (
    <Container style={style}>
      {currentPage !== 0 ? (
        <>
          <Button onClick={() => onPageSelect(0)}>
            <Icon name="arrow-left-duble" size="24px" color="gray50" />
          </Button>
          <Button onClick={() => onPageSelect(currentPage - 1)}>
            <Icon name="arrow-left" size="24px" color="gray50" />
          </Button>
        </>
      ) : (
        <div style={{ width: '48px', height: '24px' }} />
      )}
      {leftNumbers.map((num) => (
        <PaginatorNumber
          key={num}
          textColor={theme['gray100']}
          background="transparent"
          onClick={() => onPageSelect(num - 1)}
        >
          {num}
        </PaginatorNumber>
      ))}
      <PaginatorNumber textColor={theme['white']} background={theme[selectedColor]}>
        {currentPage + 1}
      </PaginatorNumber>
      {rightNumbers.map((num) => (
        <PaginatorNumber
          key={num}
          textColor={theme['gray100']}
          background="transparent"
          onClick={() => onPageSelect(num - 1)}
        >
          {num}
        </PaginatorNumber>
      ))}

      {currentPage !== totalPages - 1 ? (
        <>
          <Button onClick={() => onPageSelect(currentPage + 1)}>
            <Icon name="arrow-right" size="24px" color="gray50" />
          </Button>
          <Button onClick={() => onPageSelect(totalPages - 1)}>
            <Icon name="arrow-right-duble" size="24px" color="gray50" />
          </Button>
        </>
      ) : (
        <div style={{ width: '48px', height: '24px' }} />
      )}
    </Container>
  )
}

const Container = styled.div`
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  * {
    margin-left: 11px;
  }
`

const PaginatorNumber = styled.button<{
  textColor: string
  background: string
}>`
  font-family: 'Open Sans', sans-serif;
  font-size: 13px;
  font-weight: 600;
  border: none;
  outline: none;
  color: ${(props) => props.textColor};
  background-color: ${(props) => props.background};
  border-radius: 50%;
  padding: 0;
  height: 24px;
  width: 24px;
`

const Button = styled.button`
  cursor: pointer;
  outline: none;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
`
