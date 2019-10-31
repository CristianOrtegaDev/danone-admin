import styled from 'styled-components'
import mediaQueries from 'config/media-queries'

export const Container = styled.div`
  flex: 0.075;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
`

export const ContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray};
`

export const InfoContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const HeaderTitle = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.blue};
  font-weight: 500;
  font-size: 30px;
  padding: 9px 23px;
`

export const HeaderIcon = styled.img`
  display: none;
  width: 25px;
  height: 20px;
  margin-left: 16px;
  cursor: pointer;

  ${mediaQueries.tablet`
    display: block;
  `};
`

export const HeaderImg = styled.img`
  width: 65px;
  margin: 0 30px;

  ${mediaQueries.laptop`
    width: 45px;
  `}
`

export const LogOutButton = styled.div`
  padding: 10px;
  margin-right: 30px;
  cursor: pointer;
`
