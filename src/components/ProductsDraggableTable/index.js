import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ProductDraggable from 'components/ProductDraggable'
import { swapArrayElements } from 'utils/arrays'
import i18n from 'services/i18n'
import { capitalizeFirstLetter } from 'utils/strings'
import { Row, Title, SubTitle } from 'components/Form'
import { SuccessButton, CancelButton } from 'components/Button'
import { editRecommendedProduct } from 'actions/recommendedProducts'
import PopUp from 'components/PopUp'
import {
  Container,
  HeaderWrapper,
  StyledLabel,
  Separator,
  ListWrapper,
  ProductsContainer,
  ButtonWrapper
} from './styled'

class ProductsDraggableTable extends React.Component {
  state = {
    innerProducts: [...this.props.products],
    productToEdit: null
  }

  componentDidMount() {
    this.setInitialValues()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.products !== this.props.products) {
      this.setInitialValues()
    }
  }

  handleMoveCard = (dragIndex, hoverIndex) =>
    this.setState({
      innerProducts: swapArrayElements(this.state.innerProducts, dragIndex, hoverIndex)
    })

  handleDragEnd = (product, finalPos) => {
    if (this.productHasChangePosition(product, finalPos)) {
      this.setState({ productToEdit: product, finalPos })
    }
  }

  productHasChangePosition = (product, finalPos) =>
    this.props.products.indexOf(product) !== finalPos

  setInitialValues = () =>
    this.setState({ innerProducts: [...this.props.products], productToEdit: null, finalPos: null })

  renderForm = () => (
    <PopUp onClose={this.handleFormClose}>
      <Row justify={'center'} margin={'0px 0px 10px 0px'}>
        <Title>{this.getFormTitle()}</Title>
      </Row>
      <Row justify={'center'} margin={'0px 0px 20px 0px'}>
        <SubTitle>{this.getFormSubTitle()}</SubTitle>
      </Row>
      <Row justify={'center'} margin={'0px 20px 0px 0px'}>
        <ButtonWrapper>
          <SuccessButton
            type={'button'}
            onClick={this.handleFormSubmit}
            loading={this.props.recommendedProducts.isSubmitting}
          >
            {capitalizeFirstLetter(i18n('ACCEPT'))}
          </SuccessButton>
        </ButtonWrapper>
        <CancelButton type={'button'} onClick={this.handleFormClose}>
          {capitalizeFirstLetter(i18n('CANCEL'))}
        </CancelButton>
      </Row>
    </PopUp>
  )

  getFormTitle = () =>
    `${capitalizeFirstLetter(i18n('EDIT'))} ${i18n('PRODUCT')} ${i18n('RECOMMENDED')}`

  getFormSubTitle = () =>
    i18n('RECOMMENDATION_INTERACTION')(i18n('EDIT'), this.state.productToEdit.product.name)

  handleFormSubmit = async () => {
    const correctedPos = this.state.finalPos + 1
    await this.props.editRecommendedProduct(this.state.productToEdit.id, correctedPos)
    if (this.props.recommendedProducts.error) {
      this.setInitialValues()
    } else {
      this.props.reset()
    }
    this.closeForm()
  }

  handleFormClose = () => {
    this.setInitialValues()
    this.closeForm()
  }

  closeForm = () => this.setState({ productToEdit: null })

  render() {
    return (
      <Container>
        <HeaderWrapper>
          <StyledLabel width={'10%'}>{i18n('POSITION')}</StyledLabel>
          <Separator />
          <StyledLabel width={'15%'}>{i18n('IMAGE')}</StyledLabel>
          <Separator />
          <StyledLabel width={'40%'}>{capitalizeFirstLetter(i18n('NAME'))}</StyledLabel>
          <Separator />
          <StyledLabel width={'20%'}>{capitalizeFirstLetter(i18n('PRICE'))}</StyledLabel>
          <Separator />
          <StyledLabel width={'10%'}>{`${capitalizeFirstLetter(
            i18n('DISCOUNT_SHORT')
          )}.`}</StyledLabel>
          <StyledLabel width={'5%'} />
        </HeaderWrapper>
        <ListWrapper>
          <ProductsContainer>
            {this.state.innerProducts.map((p, index) => (
              <ProductDraggable
                key={p.id}
                id={p.id}
                index={index}
                recomendation={p}
                product={p.product}
                moveCard={this.handleMoveCard}
                onDragEnd={this.handleDragEnd}
                onDelete={this.props.onDelete}
              />
            ))}
          </ProductsContainer>
        </ListWrapper>
        {this.state.productToEdit && this.renderForm()}
      </Container>
    )
  }
}

const mapStateToProps = ({ recommendedProducts }) => ({
  recommendedProducts
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      editRecommendedProduct
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsDraggableTable)
