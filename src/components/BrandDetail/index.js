import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DetailContainer from 'components/DetailContainer'
import ProductsPaginatedList from 'components/ProductsPaginatedList'
import { SuccessButton } from 'components/Button'
import ProductFormWrapper from 'components/ProductFormWrapper'
import { deleteBrand, activateBrand } from 'actions/brands'
import { fetchProducts, deleteProduct, activateProduct } from 'actions/products'
import { fetchInactiveProducts } from 'actions/inactiveProducts'
import { resetSelectedResource } from 'actions/selectedResource'
import PopUp from 'components/PopUp'
import i18n from 'services/i18n'
import theme from 'config/theme'
import Icon, { IconNames } from 'components/Icons'
import { capitalizeFirstLetter } from 'utils/strings'
import StyledTabs from 'components/StyledTabs'
import LazyImage from 'components/LazyImage'
import {
  Row,
  InfoLabel,
  ProductsLabel,
  Separator,
  AddBtn,
  DeleteTitle,
  DeleteLabel,
  IconWrapper
} from './styled'

class BrandDetail extends React.Component {
  state = {
    active: 0,
    isProductToEdit: null,
    isProductToDelete: null,
    isProductToActivate: null,
    isBrandToDelete: null,
    isBrandToActivate: null
  }

  componentDidUpdate(prevProps) {
    if (prevProps.brand !== this.props.brand && this.props.brand) {
      this.props.fetchProducts(this.props.brand.id, true)
      this.props.fetchInactiveProducts(this.props.brand.id, true)
    }
  }

  isActiveEnabled = () => this.state.active === 0

  handleTabChange = (event, value) => {
    this.setState({ active: value })
  }

  setProductToEdit = product => this.setState({ isProductToEdit: product })

  setProductToDelete = product => this.setState({ isProductToDelete: product })

  setProductToActivate = product => this.setState({ isProductToActivate: product })

  toggleBrandToDelete = () => this.setState({ isBrandToDelete: !this.state.isBrandToDelete })

  toggleBrandToActivate = () => this.setState({ isBrandToActivate: !this.state.isBrandToActivate })

  toggleProductToActivate = () =>
    this.setState({ isProductToActivate: !this.state.isProductToActivate })

  renderDeleteForm = () => (
    <PopUp onClose={this.closeForm}>
      <Row justify={'center'} margin={'0px 0px 10px 0px'}>
        <DeleteTitle>{this.getFormTitle()}</DeleteTitle>
      </Row>
      <Row justify={'center'} margin={'0px 0px 20px 0px'}>
        <DeleteLabel>{this.getFormLabel()}</DeleteLabel>
      </Row>
      <SuccessButton
        type={'button'}
        onClick={this.handleDelete}
        loading={this.props.brands.isSubmitting || this.props.products.isSubmitting}
      >
        {capitalizeFirstLetter(i18n('DELETE'))}
      </SuccessButton>
    </PopUp>
  )

  renderActivateForm = () => (
    <PopUp
      onClose={
        this.state.isBrandToActivate ? this.toggleBrandToActivate : this.toggleProductToActivate
      }
    >
      <Row justify={'center'} margin={'0px 0px 10px 0px'}>
        <DeleteTitle>
          {this.state.isBrandToActivate ? i18n('ENABLE_BRAND') : i18n('ENABLE_PRODUCT')}
        </DeleteTitle>
      </Row>
      <Row justify={'center'} margin={'0px 0px 20px 0px'}>
        <DeleteLabel>{`${
          this.state.isBrandToActivate
            ? i18n('SURE_TO_ENABLE_BRAND')
            : i18n('SURE_TO_ENABLE_PRODUCT')
        } "${
          this.state.isBrandToActivate
            ? this.props.selectedResource.name
            : this.state.isProductToActivate.name
        }"?`}</DeleteLabel>
      </Row>
      <SuccessButton
        type={'button'}
        onClick={this.state.isBrandToActivate ? this.handleActivate : this.handleActivateProduct}
        loading={
          this.state.isBrandToActivate
            ? this.props.brands.isSubmitting
            : this.props.products.isSubmitting
        }
      >
        {capitalizeFirstLetter(i18n('ENABLE'))}
      </SuccessButton>
    </PopUp>
  )

  closeForm = () => {
    if (this.state.isProductToDelete) {
      this.setProductToDelete(null)
    } else {
      this.toggleBrandToDelete()
    }
  }

  getFormTitle = () =>
    `${i18n('DELETE').toUpperCase()} ${
      this.state.isProductToDelete ? i18n('PRODUCT').toUpperCase() : i18n('BRAND').toUpperCase()
    }`

  getFormLabel = () =>
    this.state.isProductToDelete
      ? `${i18n('DELETE_PRODUCT')} "${this.state.isProductToDelete.name}"?`
      : `${i18n('DELETE_BRAND')} "${this.props.selectedResource.name}"?`

  handleDelete = async () => {
    if (this.state.isBrandToDelete) {
      await this.props.deleteBrand(this.props.selectedResource.id)
      if (!this.props.brands.error) {
        this.toggleBrandToDelete()
        this.props.resetSelectedResource()
        this.props.checkContentReload(true)
      }
    } else {
      await this.props.deleteProduct(this.state.isProductToDelete.id)
      if (!this.props.products.error) {
        this.setProductToDelete(null)
        this.props.resetSelectedResource()
        this.props.checkContentReload(true)
      }
    }
  }

  handleActivate = async () => {
    await this.props.activateBrand(this.props.selectedResource.id)
    if (!this.props.brands.error) {
      this.toggleBrandToActivate()
      this.props.resetSelectedResource()
      this.props.checkContentReload(true)
    }
  }

  handleActivateProduct = async () => {
    await this.props.activateProduct(this.state.isProductToActivate.id)
    if (!this.props.products.error) {
      this.setProductToActivate(null)
      this.props.resetSelectedResource()
      this.props.checkContentReload(true)
    }
  }

  handleProductFormClose = reload => {
    this.setProductToEdit(null)
    if (reload) {
      this.props.checkContentReload(reload)
    }
  }

  isLoading = () =>
    (this.props.products.isFetching || this.props.inactiveProducts.isFetching) &&
    !this.isContentAvaiable()

  isContentAvaiable = () =>
    (this.props.products.values.length || this.props.inactiveProducts.values.length) > 0

  getListContent = () =>
    this.isActiveEnabled() ? this.props.products.values : this.props.inactiveProducts.values

  getHasMoreContent = () =>
    this.isActiveEnabled() ? this.props.products.hasMore : this.props.inactiveProducts.hasMore

  render() {
    const { brand, onAddClick, browser, active } = this.props
    return brand ? (
      <Fragment>
        <DetailContainer relative>
          <Row justify={'space-between'}>
            <ProductsLabel>{capitalizeFirstLetter('datos de la marca')}</ProductsLabel>
            <Row width={'auto'}>
              <IconWrapper margin={'0 10px 0 0'} onClick={this.props.onBrandEdit}>
                <Icon
                  size={browser.lessThan.widescreen ? 20 : 30}
                  name={IconNames['Edit']}
                  color={theme.colors.blue}
                />
              </IconWrapper>
              <IconWrapper
                margin={'0 10px 0 0'}
                onClick={active ? this.toggleBrandToDelete : this.toggleBrandToActivate}
              >
                <Icon
                  size={browser.lessThan.widescreen ? 20 : 30}
                  name={IconNames[active ? 'Delete' : 'Plus']}
                  color={active ? theme.colors.blue : theme.colors.green}
                />
              </IconWrapper>
            </Row>
          </Row>
          <Separator />
          <Row justify={'space-between'} margin={0}>
            <InfoLabel>{brand.name}</InfoLabel>
            <LazyImage src={brand.image_url} size={100} />
          </Row>
          <Separator
            padding={this.props.browser.lessThan.widescreen ? '0 0 5px 0' : '0 0 10px 0'}
          />
          <StyledTabs
            value={this.state.active}
            tabs={[
              {
                label: i18n('ACTIVE_PRODUCTS'),
                value: this.props.products.values.length
              },
              {
                label: i18n('INACTIVE_PRODUCTS'),
                value: this.props.inactiveProducts.values.length
              }
            ]}
            handleTabChange={this.handleTabChange}
          />
          {this.isContentAvaiable() && (
            <ProductsPaginatedList
              products={this.getListContent()}
              onEditClick={this.setProductToEdit}
              onDeleteClick={this.setProductToDelete}
              onActivate={this.setProductToActivate}
              isLoading={this.isLoading()}
              fetchMoreContent={() => this.props.fetchProducts(this.props.brand.id)}
              noMoreContentMsg={'No hay mas productos disponibles'}
              hasMore={this.getHasMoreContent()}
              active={this.isActiveEnabled()}
              editMode
            />
          )}
          <AddBtn onClick={onAddClick}>{'+'}</AddBtn>
          {(this.state.isProductToDelete || this.state.isBrandToDelete) && this.renderDeleteForm()}
          {(this.state.isBrandToActivate || this.state.isProductToActivate) &&
            this.renderActivateForm()}
        </DetailContainer>
        {this.state.isProductToEdit && (
          <ProductFormWrapper
            product={this.state.isProductToEdit}
            onClose={this.handleProductFormClose}
          />
        )}
      </Fragment>
    ) : (
      <DetailContainer>
        <label>{`${i18n('SELECT_AN').FEMALE} ${i18n('BRAND')}`}</label>
      </DetailContainer>
    )
  }
}

const mapStateToProps = ({ brands, browser, products, inactiveProducts, selectedResource }) => ({
  brands,
  browser,
  products,
  inactiveProducts,
  selectedResource
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchProducts,
      fetchInactiveProducts,
      deleteProduct,
      activateProduct,
      deleteBrand,
      activateBrand,
      resetSelectedResource
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BrandDetail)
