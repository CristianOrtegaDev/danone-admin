import styled from 'styled-components'

export const StyledIcon = styled.svg`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  fill: ${props => props.iconColor || 'inherit'};

  @media (max-resolution: 124dpi) {
    stroke-width: 1.2px;
  }

  /* Bugfix: prevents icons from being cut off on Firefox by enabling hardware rendering */
  -moz-transform: translateZ(0);
`

export const IconGrid = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`

export const IconContainer = styled.div`
  display: inline-flex;
  height: 100px;
  min-width: 100px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 3px;
  font-family: ${({ theme }) => theme.fonts.semiBold};
`

export const IconName = styled.h5`
  margin: 0;
  margin-top: 5px;
`
