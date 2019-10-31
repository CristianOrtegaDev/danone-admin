import styled, { css } from 'styled-components'
import mediaQueries from 'config/media-queries'

export const Row = styled.div`
  width: ${({ width }) => width || '100%'};
  display: flex;
  align-items: center;
  justify-content: ${({ justify }) => justify || 'flex-start'};
  align-items: ${({ align }) => align || 'center'};
  margin: ${({ margin }) => (margin !== undefined ? margin : '10px 0')};

  ${mediaQueries.laptop`
    margin: 4px 0;
  `}
`

export const InfoLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.black};
  font-size: 18px;
  font-weight: 700;
  white-space: nowrap;

  ${mediaQueries.laptop`
    font-size: 16px;
  `}
`

export const InfoContent = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.black};
  font-size: 18px;
  font-weight: 400;
  margin-left: 5px;

  ${({ margin }) =>
    margin &&
    css`
      margin: ${margin};
    `}

  ${mediaQueries.laptop`
    font-size: 16px;
  `}
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${({ justify }) => justify || 'center'};
  align-items: ${({ align }) => align || 'flex-start'};
`

export const ProductsLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.blue};
  font-size: 18px;
  font-weight: 700;
  margin: 6px 0;

  ${mediaQueries.laptop`
    font-size: 16px;
    margin: 4px 0;
  `}
`

export const Separator = styled.div`
  width: 100%;
  margin-bottom: 5px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.blue};

  ${mediaQueries.laptop`
    margin-bottom: 5px;
  `}
`

export const ExtendedTableContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80%;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.white};
  padding: 15px 30px;

  ${mediaQueries.laptop`
    padding: 25px 30px;
  `}
`

export const ExpandedLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.orange};
  font-weight: 500;
  cursor: pointer;
`
