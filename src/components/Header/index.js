import React from 'react'
import HeaderMenu from './HeaderMenu'
import { getPage } from 'utils/url'
import { withRouter } from 'react-router-dom'
import DanoneLogo from 'assets/icons/danone_logo.png'
import { clearLocalUserInfo } from 'utils/session'
import Icon, { IconNames } from 'components/Icons'
import theme from 'config/theme'
import { Container, ContentWrapper, InfoContainer, HeaderImg, LogOutButton } from './styled'

const Header = ({ location, history }) => {
  const currentPage = getPage(location.pathname)

  return (
    <Container>
      <ContentWrapper>
        <HeaderImg src={DanoneLogo} />
        <InfoContainer>
          <HeaderMenu active={currentPage} />
        </InfoContainer>
        <LogOutButton
          onClick={() => {
            clearLocalUserInfo()
            history.push(`/`)
          }}
        >
          <Icon size={30} name={IconNames['LogOut']} color={theme.colors.blue} />
        </LogOutButton>
      </ContentWrapper>
    </Container>
  )
}

export default withRouter(Header)
