import React from 'react'
import { withRouter } from 'react-router-dom'
import { isSuperUserLoggedIn } from 'utils/session'
import MENU_HEADER_LINKS from 'config/headerMenuLinks'
import SUPER_USER_MENU_HEADER_LINKS from 'config/superUserMenuLinks'
import { HeaderMenuWrapper, MenuItem, MenuLabel } from './styled'

const HeaderMenu = ({ active, history }) => {
  const onLinkClick = link => history.push(`/${link}`)

  const isActive = link => link === active

  return (
    <HeaderMenuWrapper>
      {MENU_HEADER_LINKS.map((item, index) => (
        <MenuItem active={isActive(item.link)} key={index} onClick={() => onLinkClick(item.link)}>
          <MenuLabel active={isActive(item.link)}>{item.label}</MenuLabel>
        </MenuItem>
      ))}

      {isSuperUserLoggedIn() &&
        SUPER_USER_MENU_HEADER_LINKS.map((item, index) => (
          <MenuItem active={isActive(item.link)} key={index} onClick={() => onLinkClick(item.link)}>
            <MenuLabel active={isActive(item.link)}>{item.label}</MenuLabel>
          </MenuItem>
        ))}
    </HeaderMenuWrapper>
  )
}

export default withRouter(HeaderMenu)
