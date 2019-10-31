import React from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.alto};
  font-family: ${({ theme }) => theme.fonts.roboto};
  padding: 12px 22px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black};
  cursor: ${({ pointer }) => (pointer ? 'pointer' : 'inherit')};

  ${({ filterList }) => (filterList ? 'border-top-left-radius: 10px;' : 'border-radius: 4px;')}

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.blue};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.alto};
    font-family: ${({ theme }) => theme.fonts.roboto};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.disabledGray};
    border: solid 1px ${({ theme }) => theme.colors.alto};
  }
`

const Input = props => <StyledInput {...props} />

export default Input
