import React from 'react'
import Info from 'assets/icons/info.png'
import styled from 'styled-components'

const EmptyWrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
`

const EmptyMessage = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.black};
  font-size: 20px;
  font-weight: 500;
  margin-top: 15px;
`

const EmptyImg = styled.img``

const PageEmpty = ({ message, icon }) => (
  <EmptyWrapper>
    <EmptyImg src={icon || Info} />
    <EmptyMessage>{message}</EmptyMessage>
  </EmptyWrapper>
)

export default PageEmpty
