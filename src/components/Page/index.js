import React from 'react'
import styled from 'styled-components'
import Header from 'components/Header'
import PageBlock from 'components/PageBlock'

import { PageContainer, PageWrapper } from './styled'

const Page = ({ children, ...otherProps }) => (
  <PageContainer {...otherProps}>
    {otherProps.withHeader && <Header />}
    <PageWrapper {...otherProps}>
      <PageBlock {...otherProps}>{children}</PageBlock>
    </PageWrapper>
  </PageContainer>
)

export const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  max-height: 100%;
`

export const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  max-height: 100%;
  overflow: auto;
`

export const ListWrapper = styled.div`
  flex: 0.25;
  display: flex;
  background-color: ${({ theme }) => theme.colors.ghost};
  overflow-y: scroll;
  border-bottom-left-radius: 10px;
  border-right: 1px solid ${({ theme }) => theme.colors.ghost};

  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    width: 0;
  }

  & > div {
    width: 100%;
  }
`

export const ListWrapperFixed = styled.div`
  flex: 0.25;
  height: ${({ withInput }) => (withInput ? '94.7%' : '100%')};
  max-height: ${({ withInput }) => (withInput ? '94.7%' : '100%')};
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.colors.ghost};
  border-bottom-left-radius: 10px;
  border-right: 1px solid ${({ theme }) => theme.colors.ghost};

  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0;
  }
`

export const DetailWrapper = styled.div`
  flex: 0.75;
  display: flex;
  border-bottom-right-radius: 10px;
`

export default Page
