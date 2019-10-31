import React from 'react'
import Product from 'components/Product'
import ResourceList from 'components/ResourceList'
import PageLoader from 'components/PageLoader'
import styled from 'styled-components'

const ListWrapper = styled.div`
  width: 100%;
  padding-right: 13px;
  flex: 1;
  overflow-y: scroll;

  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 0;
  }
`

const ProductsContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-bottom: 32px;
`

const ProductsPaginatedList = ({
  products,
  editMode,
  onActivate,
  onEditClick,
  onDeleteClick,
  onProductCLick,
  fetchMoreContent,
  noMoreContentMsg,
  isLoading,
  active,
  hasMore
}) =>
  isLoading && !products ? (
    <PageLoader />
  ) : products ? (
    <ListWrapper id={'scrollContainer'}>
      <ResourceList
        dataLength={products.length}
        fetchMoreContent={fetchMoreContent}
        noMoreContentMsg={noMoreContentMsg}
        hasMore={hasMore}
      >
        {products.map((item, i) => (
          <Product
            key={i}
            {...item}
            onClick={() => onProductCLick && onProductCLick(item)}
            onDeleteClick={() => onDeleteClick && onDeleteClick(item)}
            onActiveClick={() => onActivate && onActivate(item)}
            onEditClick={() => onEditClick && onEditClick(item)}
            editMode={editMode}
            active={active}
          />
        ))}
      </ResourceList>
    </ListWrapper>
  ) : (
    <ProductsContainer>
      <PageLoader />
    </ProductsContainer>
  )

export default ProductsPaginatedList
