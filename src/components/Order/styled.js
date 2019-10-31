import styled, { css } from 'styled-components'
import mediaQueries from 'config/media-queries'

export const Container = styled.div`
  width: 100%;
  display: flex;
  cursor: pointer;
  border-left: 5px solid ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.ghost};
  transition: all 0.15s ease;

  ${({ selected }) =>
    selected &&
    css`
      border-left: 5px solid ${({ theme }) => theme.colors.blue};
    `}

  &:hover {
    border-left: 5px solid ${({ theme }) => theme.colors.blue};
  }
`

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 10px 15px;
`

export const Icon = styled.img`
  height: 30px;
  padding-right: 15px;

  ${mediaQueries.laptop`
    height: 26px;
  `}
`

export const InfoWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`

export const Name = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme, type }) => (type ? theme.colors.blueGreen : theme.colors.orange)};
  cursor: pointer;

  ${mediaQueries.laptop`
    font-size: 14px;
  `}
`

export const DeliverInfoWrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`

export const DeliverLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.dustyGray};
  cursor: pointer;

  ${mediaQueries.laptop`
    font-size: 14px;
  `}
`

export const DeliverDate = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.black};
  font-weight: 500;
  padding-left: 5px;
  cursor: pointer;

  ${mediaQueries.laptop`
    font-size: 14px;
  `}
`

export const DeliverPrice = styled(DeliverDate)`
  font-size: 16px;
  cursor: pointer;
`
