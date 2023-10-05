import React, { useContext } from 'react'
import styled from 'styled-components'

import { ThemeContext } from './common/theme'
import { Tab, Tabs as RTTabs, TabList, TabPanel } from 'react-tabs'
import './css/tabs.css'

type Props = {
  currentTab: string
  tabs: { key: string; label: string; child: React.ReactNode; disabled?: boolean }[]
  onTabChange?: (tabId: string) => void
  className?: string
  children?: JSX.Element | JSX.Element[]
}

export const Tabs: React.FC<Props> = ({
  currentTab,
  tabs,
  onTabChange = () => {},
  className,
  children,
}) => {
  const theme = useContext(ThemeContext)

  return (
    <RTTabs
      selectedIndex={tabs.findIndex(({ key }) => key === currentTab)}
      onSelect={(tabIndex) => onTabChange(tabs[tabIndex].key)}
    >
      <TabList
        style={{
          border: 'none',
          outline: 'none',
          display: 'flex',
          margin: 0,
        }}
      >
        {tabs.map(({ key, label, disabled = false }) => (
          <Tab key={key} disabled={disabled}>
            {label}
          </Tab>
        ))}
      </TabList>

      {tabs.map(({ key, child }) => (
        <TabPanel
          key={key}
          style={{
            backgroundColor: theme['white'],
          }}
        >
          <ChildContainer background={theme['white']}>{child}</ChildContainer>
        </TabPanel>
      ))}
    </RTTabs>
  )
}

const ChildContainer = styled.div<{ background: string }>`
  background-color: ${(props) => props.background};
  border-radius: 11px;
  padding: 11px;
`
