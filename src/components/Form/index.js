import mediaQueries from 'config/media-queries'
import styled from 'styled-components'

export const FormContainer = styled.form`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: ${({ align }) => align || 'center'};
  padding: 40px 100px;
  background-color: ${({ theme }) => theme.colors.white};
  transition: all 0.2s ease;
  border-radius: 4px;

  ${mediaQueries.laptop`
    padding: 20px 50px;
  `}
`

export const Column = styled.div`
  width: ${({ width }) => width || '100'}%;
  display: flex;
  flex-direction: column;
  margin: ${({ margin }) => margin || 0};
  justify-content: ${({ justify }) => justify || 'center'};
  align-items: ${({ align }) => align || 'flex-start'};
`

export const Row = styled.div`
  width: ${({ width }) => width || '100'}%;
  display: flex;
  justify-content: ${({ justify }) => justify || 'flex-start'};
  align-items: ${({ align }) => align || 'center'};
  ${({ margin }) => (margin ? `margin: ${margin}` : `margin-bottom: 10px`)};
`

export const ErrorLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.red};
  font-weight: 500;
  font-size: 12px;
  margin: 10px 0 5px 0;
  cursor: pointer;

  ${mediaQueries.laptop`
    margin: 7px 0 0 0;
  `}
`

export const CrossImage = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 25px;
  right: 30px;
  cursor: pointer;
`

export const Title = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.blue};
  font-size: 26px;
  font-weight: 700;
`

export const SubTitle = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.black};
  font-size: 20px;
  font-weight: 400;
`

export const InputLabel = styled.label`
  display: block;
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.blue};
  font-size: 26px;
  font-weight: 500;
  padding: 10px 0;

  ${mediaQueries.laptop`
    font-size: 24px;
  `}
`
