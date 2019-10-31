import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Page, {
  ContentContainer,
  ContentWrapper,
  ListWrapperFixed,
  DetailWrapper
} from 'components/Page'
import { setSelectedResource, resetSelectedResource } from 'actions/selectedResource'
import { fetchBrands } from 'actions/brands'
import { fetchInactiveBrands } from 'actions/inactiveBrands'
import { resetProducts } from 'actions/products'
import { resetInactiveProducts } from 'actions/inactiveProducts'
import { capitalizeFirstLetter } from 'utils/strings'
import { ErrorToast } from 'components/Toast'
import { toast } from 'react-toastify'
import BrandDetail from 'components/BrandDetail'
import ProductForm from 'components/ProductForm'
import BrandForm from 'components/BrandForm'
import ResourceList from 'components/ResourceList'
import PageLoader from 'components/PageLoader'
import PageEmpty from 'components/PageEmpty'
import ListElement from 'components/ListElement'
import StyledTabs from 'components/StyledTabs'
import Section from 'components/Section'
import i18n from 'services/i18n'

class Brands extends React.Component {
  state = {
    active: 0,
    isBrandFormActive: false,
    isProductFormActive: false,
    brandToEdit: null
  }

  componentDidMount = () => {
    this.fetchInitialData()
  }

  componentDidUpdate = prevProps => {
    if (prevProps.brands.error !== this.props.brands.error && this.props.brands.error) {
      toast(
        <ErrorToast boldContent={i18n('ERRORS').WE_ARE_SORRY} content={this.props.brands.error} />
      )
    }
    if (prevProps.products.error !== this.props.products.error && this.props.products.error) {
      toast(
        <ErrorToast boldContent={i18n('ERRORS').WE_ARE_SORRY} content={this.props.products.error} />
      )
    }
    if (
      prevProps.productData.error !== this.props.productData.error &&
      this.props.productData.error
    ) {
      toast(
        <ErrorToast
          boldContent={i18n('ERRORS').WE_ARE_SORRY}
          content={this.props.productData.error}
        />
      )
    }
  }

  componentWillUnmount = () => this.props.resetSelectedResource()

  fetchInitialData = () => {
    this.props.fetchBrands(true)
    this.props.fetchInactiveBrands(true)
  }

  isActiveEnabled = () => this.state.active === 0

  handleTabChange = (event, value) => {
    this.props.resetSelectedResource()
    this.resetAllProducts()
    this.setState({ active: value })
  }

  resetAllProducts = () => {
    this.props.resetProducts()
    this.props.resetInactiveProducts()
  }

  toggleBrandForm = reload => {
    this.setState({ isBrandFormActive: !this.state.isBrandFormActive })
    this.checkContentReload(reload)
    if (reload) this.props.resetSelectedResource()
  }

  toggleProductsForm = reload => {
    this.setState({ isProductFormActive: !this.state.isProductFormActive })
    this.checkContentReload(reload)
  }

  handleOnBrandFormClose = reload => {
    this.toggleBrandForm(reload)
    this.setState({ brandToEdit: null })
  }

  checkContentReload = reload => {
    if (reload === true) {
      this.fetchInitialData()
      this.resetAllProducts()
      this.props.resetSelectedResource()
    }
  }

  isLoading = () =>
    (this.props.brands.isFetching || this.props.inactiveBrands.isFetching) &&
    !this.isContentAvaiable()

  isContentAvaiable = () =>
    this.props.brands.values.length || this.props.inactiveBrands.values.length

  checkPageContent = () =>
    this.isContentAvaiable() ? (
      this.renderContent()
    ) : (
      <PageEmpty message={i18n('NO_BRANDS_AVAIABLE')} />
    )

  renderContent = () => (
    <ContentWrapper>
      <ListWrapperFixed id={'scrollContainerBrands'}>
        <ResourceList
          scrollableTarget={'scrollContainerBrands'}
          dataLength={
            this.isActiveEnabled()
              ? this.props.brands.values.length
              : this.props.inactiveBrands.values.length
          }
          fetchMoreContent={this.handleMoreContentFetching}
          noMoreContentMsg={i18n('NO_MORE_BRANDS')}
          hasMore={
            this.isActiveEnabled() ? this.props.brands.hasMore : this.props.inactiveBrands.hasMore
          }
        >
          {this.renderBrands(
            this.isActiveEnabled() ? this.props.brands.values : this.props.inactiveBrands.values
          )}
        </ResourceList>
      </ListWrapperFixed>
      <DetailWrapper>
        <BrandDetail
          brand={this.props.selectedResource}
          onBrandEdit={this.handleOnEdit}
          checkContentReload={this.checkContentReload}
          onAddClick={this.toggleProductsForm}
          active={this.isActiveEnabled()}
        />
      </DetailWrapper>
    </ContentWrapper>
  )

  handleMoreContentFetching = () => {
    if (this.isActiveEnabled()) {
      this.props.fetchBrands()
    } else {
      this.props.fetchInactiveBrands()
    }
  }

  renderBrands = brands =>
    brands.map((brand, i) => (
      <ListElement
        id={i}
        key={i}
        label={brand.name}
        image={brand.image_url}
        selected={this.props.selectedResource && this.props.selectedResource.id === brand.id}
        onClick={() => {
          this.props.setSelectedResource(brand)
          this.resetAllProducts()
        }}
      />
    ))

  handleOnEdit = () => {
    this.setState({ brandToEdit: this.props.selectedResource })
    this.toggleBrandForm()
  }

  render() {
    return (
      <Page withHeader>
        <Section
          title={capitalizeFirstLetter(i18n('BRANDS'))}
          btnContent={`${capitalizeFirstLetter(i18n('NEW').FEMALE)} ${i18n('BRAND')}`}
          onBtnClick={this.toggleBrandForm}
        >
          <ContentContainer>
            <StyledTabs
              value={this.state.active}
              tabs={[
                {
                  label: i18n('ACTIVE'),
                  value: this.props.brands.values.length
                },
                {
                  label: i18n('INACTIVE'),
                  value: this.props.inactiveBrands.values.length
                }
              ]}
              handleTabChange={this.handleTabChange}
            />
            {this.isLoading() ? <PageLoader /> : this.checkPageContent()}
          </ContentContainer>
        </Section>
        {this.state.isBrandFormActive && (
          <BrandForm brand={this.state.brandToEdit} onClose={this.handleOnBrandFormClose} />
        )}
        {this.state.isProductFormActive && <ProductForm onClose={this.toggleProductsForm} />}
      </Page>
    )
  }
}

const mapStateToProps = ({ brands, inactiveBrands, products, selectedResource, productData }) => ({
  brands,
  inactiveBrands,
  products,
  selectedResource,
  productData
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchBrands,
      fetchInactiveBrands,
      setSelectedResource,
      resetSelectedResource,
      resetProducts,
      resetInactiveProducts
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Brands)
