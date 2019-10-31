import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Section from 'components/Section'
import { fetchRecommendedProducts, deleteRecommendedProduct } from 'actions/recommendedProducts'
import Page, { ContentContainer } from 'components/Page'
import NoContent from 'components/NoContent'
import ProductsDraggableTable from 'components/ProductsDraggableTable'
import AddRecomendation from 'components/AddRecomendation'
import DeleteRecomendationForm from 'components/DeleteRecomendationForm'
import { capitalizeFirstLetter } from 'utils/strings'
import PageLoader from 'components/PageLoader'
import i18n from 'services/i18n'
import { toast } from 'react-toastify'
import { ErrorToast } from 'components/Toast'

class Recommendations extends React.Component {
  state = {
    productToDelete: false,
    isAddRecomendationOpen: false
  }

  componentDidMount() {
    this.props.fetchRecommendedProducts()
  }

  componentDidUpdate = prevProps => {
    if (
      this.props.recommendedProducts.error &&
      prevProps.recommendedProducts.error !== this.props.recommendedProducts.error
    ) {
      toast(
        <ErrorToast
          boldContent={i18n('ERRORS').WE_ARE_SORRY}
          content={this.props.recommendedProducts.error}
        />
      )
    }
  }

  handleDeleteRecomendation = async () => {
    await this.props.deleteRecommendedProduct(this.state.productToDelete.id)
    this.closePopUps(true)
  }

  closePopUps = reset => {
    if (reset) this.props.fetchRecommendedProducts()
    this.setState({ productToDelete: false, isAddRecomendationOpen: false })
  }

  checkPageContent = () =>
    this.isContentAvaiable() ? (
      <ProductsDraggableTable
        products={this.props.recommendedProducts.values}
        onDelete={id => this.setState({ productToDelete: id })}
        reset={this.props.fetchRecommendedProducts}
      />
    ) : (
      <NoContent content={i18n('NO_PRODUCTS_AVAIABLE')} />
    )

  isLoading = () => this.props.recommendedProducts.isFetching && !this.isContentAvaiable()

  isContentAvaiable = () =>
    this.props.recommendedProducts.values && this.props.recommendedProducts.values.length

  render() {
    return (
      <Page withHeader>
        <Section
          title={capitalizeFirstLetter(i18n('RECOMMENDATIONS'))}
          btnContent={`${capitalizeFirstLetter(i18n('NEW').FEMALE)} ${i18n('RECOMMENDATION')}`}
          onBtnClick={() => this.setState({ isAddRecomendationOpen: true })}
        >
          <ContentContainer>
            {this.isLoading() ? <PageLoader /> : this.checkPageContent()}
          </ContentContainer>
        </Section>
        {this.state.productToDelete && (
          <DeleteRecomendationForm
            recommendation={this.state.productToDelete}
            onDelete={this.handleDeleteRecomendation}
            onCancel={this.closePopUps}
            onClose={this.closePopUps}
            loading={this.props.recommendedProducts.isSubmitting}
          />
        )}
        {this.state.isAddRecomendationOpen && <AddRecomendation onClose={this.closePopUps} />}
      </Page>
    )
  }
}

const mapStateToProps = ({ recommendedProducts }) => ({
  recommendedProducts
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchRecommendedProducts,
      deleteRecommendedProduct
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recommendations)
