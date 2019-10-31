import styled from 'styled-components'

export const Container = styled.div`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Image = styled.img`
  max-width: ${({ size }) => size}px;
  display: ${({ loaded }) => (loaded ? 'inherit' : 'none')};
  margin-right: ${({ withOutMargin }) => (withOutMargin ? 0 : 10)}px;
  align-self: center;
`

export const IconWrapper = styled.div`
  margin-right: 12px;
`
