import styled from 'styled-components'
import mediaQueries from 'config/media-queries'

export const StyledLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.blue};
  font-size: ${({ size }) => size || '18'}px;
  font-weight: 700;
  margin: 6px 0;

  ${mediaQueries.laptop`
    font-size: 16px;
    margin: 4px 0;
  `}
`

export const Row = styled.div`
  display: flex;
  margin: 10px 0;
  justify-content: ${({ justify }) => justify || 'flex-start'};
  align-items: center;
`

export const StyledContent = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.black};
  font-size: 14px;
  font-weight: 500;
  margin: 6px 10px;

  ${mediaQueries.laptop`
    font-size: 16px;
    margin: 4px 10px;
  `}
`

export const DeleteTitle = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.blue};
  font-size: 26px;
  font-weight: 700;
`

export const DeleteLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.black};
  font-size: 18px;
  font-weight: 400;
  margin: 10px 0;
`
