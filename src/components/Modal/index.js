import React from 'react'
import AnimationWrapper from 'components/AnimationWrapper'
import Page from 'components/Page'
import theme from 'config/theme'
import styled from 'styled-components'

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.transparentBlack};
  z-index: 99;
`

const Modal = ({ children }) => (
  <Container>
    <Page backgroundColor={theme.colors.transparentBlack} overflow={'auto'} narrow>
      <AnimationWrapper>{children}</AnimationWrapper>
    </Page>
  </Container>
)

export default Modal
