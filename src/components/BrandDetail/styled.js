import styled from 'styled-components'
import mediaQueries from 'config/media-queries'

export const ProductsLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.blue};
  font-size: 18px;
  font-weight: 700;
  margin: 10px 0;

  ${mediaQueries.laptop`
    font-size: 16px;
    margin: 5px 0;
  `}
`

export const Separator = styled.div`
  width: 100%;
  margin-bottom: ${({ padding }) => (padding ? 0 : '10px')};
  border-bottom: 1px solid ${({ theme }) => theme.colors.blue};
  padding: ${({ padding }) => padding || 0};

  ${mediaQueries.laptop`
    margin-bottom: ${({ padding }) => (padding ? 0 : '5px')};
  `}
`

export const InfoLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.black};
  font-size: 26px;
  font-weight: 700;

  ${mediaQueries.laptop`
    font-size: 22px;
  `}
`

export const Row = styled.div`
  width: ${({ width }) => width || '100%'};
  display: flex;
  align-items: center;
  justify-content: ${({ justify }) => justify || 'flex-start'};
  align-items: ${({ align }) => align || 'center'};
  margin: ${({ margin }) => (margin !== undefined ? margin : '10px 0')};

  ${mediaQueries.laptop`
    margin: 0;
  `}
`

export const ProductsWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: red;
`

export const AddBtn = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 5px;
  right: 5px;
  font-size: 45px;
  padding-bottom: 10px;
  background-color: ${({ theme }) => theme.colors.blue};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
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

export const IconWrapper = styled.div`
  margin: ${({ margin }) => margin || '0'};
  cursor: pointer;
`
