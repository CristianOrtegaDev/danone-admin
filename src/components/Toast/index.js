import React from 'react'
import theme from 'config/theme'
import styled from 'styled-components'
import Icon, { IconNames } from 'components/Icons'

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 15px;
  border-radius: 3px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  z-index: 999;
`

const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const Text = styled.label`
  width: ${({ bold }) => (bold ? '20%' : '80%')};
  font-size: 16px;
  margin-left: 10px;
  font-weight: ${({ bold }) => (bold ? 700 : 400)};
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme, color }) => color || theme.colors.white};
`

const Toast = props => (
  <Container backgroundColor={props.backgroundColor}>
    <ContentWrapper>
      <Icon name={props.icon} color={props.color} size={30} />
      <Text color={props.color} bold>
        {props.boldContent}
      </Text>
      <Text color={props.contentColor}>{props.content}</Text>
    </ContentWrapper>
    <Icon name={IconNames.Close} color={props.color} size={18} />
  </Container>
)

export const ErrorToast = ({ boldContent, content }) => (
  <Toast
    boldContent={boldContent}
    content={content}
    backgroundColor={theme.colors.red}
    color={theme.colors.white}
    contentColor={theme.colors.white}
    icon={IconNames.Alert}
  />
)

export const AlertToast = ({ boldContent, content }) => (
  <Toast
    boldContent={boldContent}
    content={content}
    backgroundColor={theme.colors.yellowLight}
    color={theme.colors.black}
    contentColor={theme.colors.black}
    icon={IconNames.AlertOutline}
  />
)

export const MessageToast = ({ boldContent, content }) => (
  <Toast
    boldContent={boldContent}
    content={content}
    backgroundColor={theme.colors.blue}
    color={theme.colors.white}
    contentColor={theme.colors.white}
    icon={IconNames.Message}
  />
)

export default Toast
