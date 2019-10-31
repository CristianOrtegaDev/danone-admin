import React from 'react'
import theme from 'config/theme'
import Icon, { IconNames } from 'components/Icons'
import styled from 'styled-components'

const Container = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid ${({ theme, color }) => color || theme.colors.blue};
  border-radius: 10px;
`

const Content = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme, color }) => color || theme.colors.blue};
  font-size: 18px;
  margin-top: 15px;
`

const NoContent = ({ content, icon, color }) => (
  <Container color={color}>
    <Icon name={icon || IconNames.Question} size={40} color={color || theme.colors.blue} />
    <Content color={color}>{content}</Content>
  </Container>
)

export default NoContent
