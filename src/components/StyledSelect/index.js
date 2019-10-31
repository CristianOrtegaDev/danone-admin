import React from 'react'
import styled from 'styled-components'
import Select from 'react-select'

const Container = styled.div`
  width: 100%;

  .react-select__control {
    width: 100%;
    padding: 4px 0px 3px 10px;
    color: ${({ theme }) => theme.colors.alto};
    font-family: ${({ theme }) => theme.fonts.roboto};
    box-shadow: none;

    &:active,
    &:hover {
      box-shadow: none;
      border: solid 1px ${({ theme }) => theme.colors.blue} !important;
    }
  }

  .react-select__control--is-focused {
    border: solid 1px ${({ theme }) => theme.colors.blue};
  }

  .react-select__placeholder {
    color: ${({ theme }) => theme.colors.alto};
    font-family: ${({ theme }) => theme.fonts.roboto};
  }
`

const StyledSelect = ({ disabled, ...otherProps }) => (
  <Container>
    <Select isDisabled={disabled} {...otherProps} classNamePrefix="react-select" />
  </Container>
)

export default StyledSelect
