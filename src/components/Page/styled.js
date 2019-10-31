import styled from 'styled-components'
import mediaQueries from 'config/media-queries'

export const PageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  background-color: ${({ theme, backgroundColor }) => backgroundColor || theme.colors.gray};
`
export const PageWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;

  ${mediaQueries.tablet`
    padding: 0 16px;
  `};
`

export default PageWrapper
