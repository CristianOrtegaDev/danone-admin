import React from 'react'
import styled, { css } from 'styled-components'
import mediaQueries from 'config/media-queries'

export const Container = styled.div`
  width: 100%;
  display: flex;
  cursor: pointer;
  border-left: 5px solid ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.ghost};
  transition: all 0.15s ease;

  ${({ selected }) =>
    selected &&
    css`
      border-left: 5px solid ${({ theme }) => theme.colors.blue};
    `}

  &:hover {
    border-left: 5px solid ${({ theme }) => theme.colors.blue};
  }
`

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 30px 15px;
`

export const Name = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;

  ${mediaQueries.laptop`
    font-size: 14px;
  `}
`

const Administrator = ({ username, onClick, selected }) => (
  <Container onClick={onClick} selected={selected}>
    <Wrapper>
      <Name>{username}</Name>
    </Wrapper>
  </Container>
)

export default Administrator
