import React from 'react'
import LazyImage from 'components/LazyImage'
import styled, { css } from 'styled-components'
import mediaQueries from 'config/media-queries'

export const BrandContainer = styled.div`
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

export const BrandWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 20px 15px;

  ${mediaQueries.laptop`
    padding: 10px;
  `}
`

export const StyledLabel = styled.label`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.roboto};
`

const ListElement = ({ id, label, image, selected, onClick }) => (
  <BrandContainer key={id} selected={selected} onClick={onClick}>
    <BrandWrapper>
      <LazyImage src={image} size={50} />
      <StyledLabel>{label}</StyledLabel>
    </BrandWrapper>
  </BrandContainer>
)

export default ListElement
