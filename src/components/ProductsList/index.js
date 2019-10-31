import React from 'react'
import Product from 'components/Product'
import NoContent from 'components/NoContent'
import { IconNames } from 'components/Icons'
import i18n from 'services/i18n'
import theme from 'config/theme'
import PageLoader from 'components/PageLoader'
import styled from 'styled-components'

export const ProductsContainer = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  -ms-overflow-style: none;
  padding-bottom: 32px;

  &::-webkit-scrollbar {
    width: 0;
  }
`

const ProductsList = ({
  products,
  editMode,
  onEditClick,
  onDeleteClick,
  onProductCLick,
  isLoading
}) => (
  <ProductsContainer>
    {isLoading ? (
      <PageLoader />
    ) : products && products.length ? (
      products.map((item, i) => (
        <Product
          key={i}
          {...item}
          onClick={() => onProductCLick(item)}
          onDeleteClick={() => onDeleteClick && onDeleteClick(item)}
          onEditClick={() => onEditClick && onEditClick(item)}
          editMode={editMode}
        />
      ))
    ) : (
      <NoContent
        content={i18n('NO_PRODUCTS_AVAIABLE')}
        icon={IconNames.Alert}
        color={theme.colors.red}
      />
    )}
  </ProductsContainer>
)

export default ProductsList
