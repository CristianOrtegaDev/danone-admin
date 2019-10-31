import styled from 'styled-components'

export const TableContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
`

export const PaginationButton = styled.button`
  border-radius: 10px;
  background: ${({ disabled, theme }) => (disabled ? theme.colors.gray : theme.colors.blue)};
  color: ${({ theme }) => theme.colors.white};
  padding: 15px;
  border: none;
  outline: none;
  cursor: ${({ disabled }) => (disabled ? 'inherit' : 'pointer')};
`

export const IconWrapper = styled.div`
  cursor: pointer;
`
