import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import theme from 'config/theme'
import styled from 'styled-components'
import mediaQueries from 'config/media-queries'

export const StyledButton = styled.button`
  background-color: ${({ theme, background }) => background || theme.colors.blue};
  cursor: ${({ disabled }) => (disabled ? 'inherit' : 'pointer')};
  color: ${({ theme, color }) => color || theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.roboto};
  border: none;
  min-width: ${({ small }) => (small ? '90' : '150')}px;
  height: ${({ small }) => (small ? '40px' : 'auto')};
  font-size: ${({ small }) => (small ? '14' : '18')}px;
  font-weight: 500;
  padding: ${({ small }) => (small ? '5px 15px' : '15px 32px')};
  border-radius: 25px;
  outline: none;

  ${mediaQueries.laptop`
    height: ${({ small }) => (small ? '28px' : 'auto')};
    font-size: ${({ small }) => (small ? '12' : '14')}px;
  `}
`

const Button = ({ onClick, children, loading, background, color, ...otherProps }) => (
  <StyledButton
    disabled={loading}
    onClick={onClick}
    background={background}
    color={color}
    {...otherProps}
  >
    {loading ? <CircularProgress color={color} size={20} /> : children}
  </StyledButton>
)

export const CancelButton = ({ children, onClick, loading, ...otherProps }) => (
  <Button
    onClick={onClick}
    background={theme.colors.red}
    color={theme.colors.white}
    loading={loading}
    {...otherProps}
  >
    {children}
  </Button>
)

export const SuccessButton = ({ children, onClick, loading, ...otherProps }) => (
  <Button
    onClick={onClick}
    background={theme.colors.blue}
    color={theme.colors.white}
    loading={loading}
    {...otherProps}
  >
    {children}
  </Button>
)

export const ConfirmationButton = ({ children, onClick, loading, ...otherProps }) => (
  <Button
    onClick={onClick}
    background={theme.colors.green}
    color={theme.colors.white}
    loading={loading}
    {...otherProps}
  >
    {children}
  </Button>
)

export default Button
