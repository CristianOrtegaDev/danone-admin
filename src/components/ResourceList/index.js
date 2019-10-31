import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import CircularProgress from '@material-ui/core/CircularProgress'
import { InfiniteLoaderWrapper, NoContentContainer, ScrollWrapper } from './styled'

const ResourcesList = ({
  dataLength,
  fetchMoreContent,
  hasMore,
  noMoreContentMsg,
  scrollableTarget,
  children
}) => (
  <InfiniteScroll
    scrollableTarget={scrollableTarget || 'scrollContainer'}
    dataLength={dataLength}
    next={fetchMoreContent}
    hasMore={hasMore}
    loader={
      <InfiniteLoaderWrapper>
        <CircularProgress size={30} />
      </InfiniteLoaderWrapper>
    }
    endMessage={
      <NoContentContainer style={{ textAlign: 'center' }}>{noMoreContentMsg}</NoContentContainer>
    }
  >
    <ScrollWrapper>{children}</ScrollWrapper>
  </InfiniteScroll>
)

export default ResourcesList
