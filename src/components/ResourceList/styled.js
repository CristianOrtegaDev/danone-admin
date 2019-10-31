import styled from 'styled-components'

export const ScrollWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background-color: ${({ theme }) => theme.colors.white};

  &::-webkit-scrollbar {
    display: none;
  }
`

export const InfiniteLoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
  padding: 20px 0;
`

export const NoContentContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.blue};
  font-size: 16px;
  padding: 20px 0;
`
