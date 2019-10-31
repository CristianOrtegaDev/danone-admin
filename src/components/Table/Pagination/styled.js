import styled from 'styled-components'

export const PaginationButton = styled.button`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ active, theme }) => (active ? theme.colors.white : theme.colors.grayDark)};
  background: ${({ active, theme }) => (active ? theme.colors.blue : 'transparent')};
  border: 1px solid ${({ active, theme }) => (active ? theme.colors.blue : theme.colors.ghost)};
  ${({ disabled }) => (disabled ? 'opacity: 0.3;' : 'cursor: pointer;')}

  border-radius: 3px;
  margin: 4px;
  height: 25px;
  width: 25px;
`

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
