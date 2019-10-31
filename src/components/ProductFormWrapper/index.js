import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'
import { fetchProductData } from 'actions/productData'
import ProductForm from 'components/ProductForm'

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.transparentBlack};
`

class ProductFormWrapper extends React.Component {
  componentDidMount() {
    this.props.fetchProductData(this.props.product.id)
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.productData.error !== this.props.productData.error &&
      this.props.productData.error
    ) {
      this.props.onClose()
    }
  }

  render() {
    return (
      <Container>
        {this.props.productData.isFetching ? (
          <CircularProgress />
        ) : (
          <ProductForm product={this.props.productData.data} onClose={this.props.onClose} />
        )}
      </Container>
    )
  }
}

const mapStateToProps = ({ productData }) => ({
  productData
})

const mapDispatchToProps = dispatch => bindActionCreators({ fetchProductData }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductFormWrapper)
