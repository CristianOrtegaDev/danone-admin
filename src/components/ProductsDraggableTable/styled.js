import styled from 'styled-components'

export const ProductsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  overflow-y: auto;
  -ms-overflow-style: none;
`

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const ListWrapper = styled.div`
  width: 100%;
  height: 90%;
`

export const HeaderWrapper = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  align-items: center;
  padding: 5px 20px;
  justify-content: space-around;
  background: ${({ theme }) => theme.colors.blue};
  border: 1px solid ${({ theme }) => theme.colors.blue};
  border-radius: 4px;
  margin-bottom: 15px;
`

export const StyledLabel = styled.div`
  width: ${({ width }) => width || 'auto'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.white};
`

export const Separator = styled.div`
  height: 75%;
  border-right: 2px solid ${({ theme }) => theme.colors.white};
`

export const ButtonWrapper = styled.div`
  margin-right: 15px;
`
