import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Page, {
  ContentContainer,
  ContentWrapper,
  DetailWrapper,
  ListWrapperFixed
} from 'components/Page'
import { setSelectedResource, resetSelectedResource } from 'actions/selectedResource'
import DiscountDetail from 'components/DiscountDetail'
import ResourceList from 'components/ResourceList'
import { searchProducts } from 'actions/products'
import ListElement from 'components/ListElement'
import PageEmpty from 'components/PageEmpty'
import Section from 'components/Section'
import debounce from 'utils/debounce'
import Input from 'components/Input'
import i18n from 'services/i18n'
import styled from 'styled-components'

const ListContainer = styled.div`
  flex: 0.25;
  height: 100%;
`

class Discounts extends React.Component {
  state = {
    searchTerm: ''
  }

  componentDidMount = () => {
    this.fetchInitialData()
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.searchTerm.length >= 1 && this.state.searchTerm.length === 0) {
      this.fetchInitialData()
    }
  }

  fetchInitialData = () => {
    this.props.searchProducts('a', true)
  }

  componentWillUnmount = () => this.props.resetSelectedResource()

  isLoading = () => this.props.products.isFetching

  isContentAvaiable = () => this.props.products.values.length

  checkPageContent = () =>
    this.isContentAvaiable() ? (
      this.renderContent()
    ) : (
      <PageEmpty message={i18n('NO_PRODUCTS_AVAIABLE')} />
    )

  handleDebounceFilter = debounce(searchTerm => {
    this.setState({ searchTerm })
    this.props.searchProducts(searchTerm)
  }, 300)

  isSearchTermValid = searchTerm => searchTerm.length >= 3

  renderContent = () => (
    <ContentWrapper>
      {this.renderList()}
      {this.renderDetail()}
    </ContentWrapper>
  )

  renderList = () => (
    <ListContainer>
      <Input
        placeholder={i18n('FILTER_BY')(i18n('NAME'))}
        onChange={({ target: { value } }) => {
          this.isSearchTermValid(value)
            ? this.handleDebounceFilter(value)
            : this.setState({ searchTerm: value })
        }}
        filterList
        autoFocus
      />
      <ListWrapperFixed id={'scrollContainer'} withInput>
        <ResourceList
          dataLength={this.props.products.values.length}
          fetchMoreContent={this.handleMoreContentFetching}
          noMoreContentMsg={i18n('NO_MORE_PRODUCTS')}
          hasMore={this.props.products.hasMore}
        >
          {this.renderProducts(this.props.products.values)}
        </ResourceList>
      </ListWrapperFixed>
    </ListContainer>
  )

  renderDetail = () => (
    <DetailWrapper>
      <DiscountDetail
        product={this.props.selectedResource}
        onSubmitSuccess={this.fetchInitialData}
      />
    </DetailWrapper>
  )

  handleMoreContentFetching = () => {
    this.props.searchProducts('a')
  }

  renderProducts = products =>
    products.map((prod, i) => (
      <ListElement
        key={i}
        id={prod.id}
        label={prod.name}
        image={prod.image_url}
        selected={this.props.selectedResource && this.props.selectedResource.id === prod.id}
        onClick={() => this.props.setSelectedResource(prod)}
      />
    ))

  render() {
    return (
      <Page withHeader>
        <Section title={i18n('DISCOUNTS')}>
          <ContentContainer>{this.renderContent()}</ContentContainer>
        </Section>
      </Page>
    )
  }
}

const mapStateToProps = ({ products, selectedResource }) => ({
  products,
  selectedResource
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      searchProducts,
      setSelectedResource,
      resetSelectedResource
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Discounts)
