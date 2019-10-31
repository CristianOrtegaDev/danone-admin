import React from 'react'
import mediaQueries from 'config/media-queries'
import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  padding: 30px;
  border-bottom-right-radius: 10px;
  box-sizing: border-box;

  ${mediaQueries.laptop`
    padding: 15px;
  `}
`

export const Wrapper = styled.div`
  position: ${({ relative }) => (relative ? 'relative' : 'inherit')};
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px 25px;
  border: 1px solid ${({ theme }) => theme.colors.mercury};
  border-radius: 5px;
  box-sizing: border-box;

  ${mediaQueries.laptop`
    padding: 15px;
  `}
`

const DetailContainer = ({ children, relative }) => (
  <Container>
    <Wrapper relative={relative}>{children}</Wrapper>
  </Container>
)

export default DetailContainer
