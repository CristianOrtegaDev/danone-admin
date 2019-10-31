import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import styled from 'styled-components'

const EmptyWrapper = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white};
`

const LoaderWrapper = styled(EmptyWrapper)`
  padding: 40px 0;
  border-radius: 10px;
`

const PageLoader = ({ customHeight }) => (
  <LoaderWrapper customHeight={customHeight}>
    <CircularProgress />
  </LoaderWrapper>
)

export default PageLoader
