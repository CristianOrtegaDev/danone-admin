import styled from 'styled-components'

export const HeaderMenuWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.white};
  border-left: 2px solid ${({ theme }) => theme.colors.gray};
  padding-left: 23px;
`

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 20px;
  border-radius: 20px;
  cursor: pointer;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.blue : theme.colors.transparent};
  transition: all 0.15s ease;

  &:hover > label {
    color: ${({ active, theme }) => !active && theme.colors.blueRibbon};
  }
`

export const MenuLabel = styled.label`
  font-size: 15px;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ active, theme }) => (active ? theme.colors.white : theme.colors.black)};

  &:hover {
    color: ${({ active, theme }) => !active && theme.colors.blueRibbon};
  }
`
