import React from 'react'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import compose from 'recompose/compose'
import { withStyles } from '@material-ui/core/styles'
import withWidth from '@material-ui/core/withWidth'
import themeStyles from './tabs.theme.style'
import styled from 'styled-components'

const HeaderWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.ghost};
`

const LabelTab = styled.span`
  display: block;
  color: black;
  padding: 15px 0;
  font-size: 16px;
  text-transform: initial !important;
`

class StyledTabs extends React.Component {
  renderTabElement = (resourceName, resourceLength, index) => {
    const { classes } = this.props
    return (
      <Tab
        key={index}
        classes={{ root: classes.tabRoot }}
        label={
          <LabelTab>{`${resourceName} ${resourceLength !== undefined &&
            `(${resourceLength})`}`}</LabelTab>
        }
      />
    )
  }

  render() {
    const { value, handleTabChange, tabs, classes } = this.props
    return (
      <HeaderWrapper>
        <Tabs value={value} onChange={handleTabChange} classes={{ indicator: classes.colorTab }}>
          {tabs.map((tab, i) => this.renderTabElement(tab.label, tab.value, i))}
        </Tabs>
      </HeaderWrapper>
    )
  }
}

export default compose(
  withWidth(),
  withStyles(themeStyles, { withTheme: true })
)(StyledTabs)
