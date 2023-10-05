import React, { useContext } from 'react'
import styled from 'styled-components'

import { ThemeContext } from './common/theme'
import { Icon } from './Icon'

export type Direction = 'asc' | 'desc'
export type Ordering<T> = { key: keyof T; direction: Direction }
export type Column<T> = {
  key: keyof T
  name: string
  orderable: boolean
  render?: (record: T) => React.ReactNode
}
type Props<T> = {
  columns: Column<T>[]
  records: T[]
  order: Ordering<T>
  onOrder?: (ordering: Ordering<T>) => void
  style?: {}
}

const nextDirection = (current: Direction | null) => {
  switch (current) {
    case 'asc':
      return 'desc'
    case 'desc':
      return 'asc'
    case null:
      return 'asc'
  }
}

export function Table<T extends { [key: string]: any }>({
  columns,
  records,
  order,
  onOrder,
  style,
}: Props<T>) {
  const theme = useContext(ThemeContext)

  return (
    <StyledTable cellSpacing={0} style={style}>
      <thead>
        <tr>
          {columns.map(({ key, name, orderable }) => (
            <StyledTh
              color={theme['black']}
              key={name}
              onClick={() =>
                orderable &&
                onOrder &&
                onOrder({
                  key,
                  direction: nextDirection(order.key === key ? order.direction : null),
                })
              }
            >
              <ThContainer>
                <span style={{ marginRight: '6px' }}>{name}</span>
                {order.key === key ? (
                  <Icon
                    color="black"
                    size="18px"
                    name={order.direction === 'asc' ? 'angle-down' : 'angle-up'}
                  />
                ) : (
                  <div style={{ width: '18px', height: '18px' }} />
                )}
              </ThContainer>
            </StyledTh>
          ))}
        </tr>
      </thead>
      <StyledBody color1={theme['white']} color2={theme['gray20']}>
        {records.map((record, i) => (
          <StyledTr key={i} color={i % 2 === 0 ? theme['white'] : theme['gray20']}>
            {columns.map((column) => (
              <StyledTd key={column.name} color={theme['black']}>
                {column.render ? column.render(record) : record[column.key]}
              </StyledTd>
            ))}
          </StyledTr>
        ))}
      </StyledBody>
    </StyledTable>
  )
}

type StyledProps = {}
const StyledTable = styled.table<StyledProps>`
  width: 100%;
`

const StyledTh = styled.th<{ color: string }>`
  font-family: 'Open Sans', sans-serif;
  font-size: 13px;
  font-weight: 800;
  line-height: 24px;
  color: ${(props) => props.color};
  text-align: left;
  padding-top: 14px;
  padding-bottom: 14px;
  padding-left: 20px;
`

const StyledBody = styled.tbody<{ color1: string; color2: string }>``

const StyledTr = styled.tr<{ color: string }>`
  background-color: ${(props) => props.color};
`

const StyledTd = styled.td<{ color: string }>`
  font-family: 'Open Sans', sans-serif;
  font-size: 13px;
  line-height: 18px;
  font-weight: 400;
  color: ${(props) => props.color};
  padding-top: 14px;
  padding-bottom: 14px;
  padding-left: 20px;
`

const ThContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`
