import React from 'react'
import styled from 'styled-components'

const StyledTextArea = styled.textarea`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.alto};
  font-family: ${({ theme }) => theme.fonts.roboto};
  padding: 12px 10px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black};
  cursor: ${({ pointer }) => (pointer ? 'pointer' : 'inherit')};

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

const TextArea = props => <StyledTextArea {...props} />

export default TextArea
