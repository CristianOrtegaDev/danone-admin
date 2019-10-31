import styled from 'styled-components'
import mediaQueries from 'config/media-queries'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border: 1px solid #e7ecee;
  border-radius: 4px;
  margin-bottom: 10px;
  transition: all 0.2s ease;

  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.blue};
  }
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${({ justify }) => justify || 'center'};
  align-items: ${({ align }) => align || 'flex-start'};
  padding: ${({ padding }) => padding || '0px'};
`

export const Row = styled.div`
  display: flex;
  align-items: center;
`

export const Name = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.black};
  font-size: 18px;
  font-weight: 400;
  margin-bottom: ${({ withMargin }) => (withMargin ? 10 : 0)}px;

  ${mediaQueries.laptop`
    font-size: 16px;
  `}
`

export const Price = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.blue};
  font-size: 22px;
  font-weight: 700;

  ${mediaQueries.laptop`
    font-size: 18px;
  `}
`

export const Image = styled.img`
  width: 80px;
  margin-right: 15px;
  align-self: center;

  ${mediaQueries.laptop`
    width: 50px;
  `}
`

export const AmountWrapper = styled.div`
  display: flex;
  justify-content: center;
  min-width: 75px;
  padding: 15px 20px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.gray};

  ${mediaQueries.laptop`
    min-width: 60px;
    padding: 10px 0px;
  `}
`

export const IconWrapper = styled.div`
  margin-bottom: ${({ margin }) => margin || 0}px;
  cursor: pointer;
`

export const NoImageWrapper = styled.div`
  margin-right: 10px;
`
