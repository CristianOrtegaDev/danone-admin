import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PopUp from 'components/PopUp'
import ProductsList from 'components/ProductsList'
import Input from 'components/Input'
import debounce from 'utils/debounce'
import i18n from 'services/i18n'
import NoContent from 'components/NoContent'
import { searchProducts } from 'actions/products'
import CircularProgress from '@material-ui/core/CircularProgress'
import { submitRecommendedProduct } from 'actions/recommendedProducts'
import {
  Wrapper,
  Title,
  InputWrapper,
  ListWrapper,
  Separator,
  LoaderWrapper,
  EmptySearchWrapper,
  ListLoaderWrapper
} from './styled'

class AddRecomendation extends React.Component {
  state = {
    searchTerm: ''
  }

  handleDebounceFilter = debounce(searchTerm => {
    this.setState({ searchTerm })
    this.props.searchProducts(searchTerm)
  }, 300)

  isSearchTermValid = searchTerm => searchTerm.length >= 3

  onProductCLick = async product => {
    await this.props.submitRecommendedProduct(product)
    if (!this.props.recommendedProducts.error) this.props.onClose(true)
  }

  renderContent = () =>
    this.isSearchTermValid(this.state.searchTerm) ? (
      <ListWrapper>
        <ProductsList
          products={this.props.products.values}
          onProductCLick={this.onProductCLick}
          editMode={false}
        />
      </ListWrapper>
    ) : (
      <EmptySearchWrapper>
        <NoContent content={'Ingrese 3 caracteres para comenzar con la busqueda de productos'} />
      </EmptySearchWrapper>
    )

  renderLoader = () => (
    <ListLoaderWrapper>
      <CircularProgress />
    </ListLoaderWrapper>
  )
  render() {
    return (
      <PopUp onClose={this.props.onClose}>
        <Wrapper>
          <Title>{i18n('SELECT_RECOMMENDATION')}</Title>
          <InputWrapper>
            <Input
              placeholder={i18n('FILTER_BY')(i18n('NAME'))}
              onChange={({ target: { value } }) => {
                this.isSearchTermValid(value)
                  ? this.handleDebounceFilter(value)
                  : this.setState({ searchTerm: value })
              }}
              autoFocus
            />
          </InputWrapper>
          <Separator />
          {this.props.products.isFetching ? this.renderLoader() : this.renderContent()}
        </Wrapper>
        {this.props.recommendedProducts.isSubmitting && (
          <LoaderWrapper>
            <CircularProgress />
          </LoaderWrapper>
        )}
      </PopUp>
    )
  }
}

const mapStateToProps = ({ recommendedProducts, products }) => ({
  recommendedProducts,
  products
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      submitRecommendedProduct,
      searchProducts
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRecomendation)
