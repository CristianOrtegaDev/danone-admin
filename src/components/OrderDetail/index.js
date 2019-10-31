import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import CrossIcon from 'assets/icons/cross.png'
import DetailContainer from 'components/DetailContainer'
import ProductsTable from 'components/ProductsTable'
import PageLoader from 'components/PageLoader'
import LazyImage from 'components/LazyImage'
import NoContent from 'components/NoContent'
import Modal from 'components/Modal'
import { CrossImage } from 'components/Form'
import { getFormattedDate } from 'utils/dateParser'
import { fetchOrderDetail, resetOrderDetail } from 'actions/orderDetail'
import orderType from 'constants/orderType'
import i18n from 'services/i18n'
import { capitalizeFirstLetter } from 'utils/strings'
import {
  ProductsLabel,
  Separator,
  Row,
  Column,
  InfoLabel,
  InfoContent,
  ExtendedTableContainer,
  ExpandedLabel
} from './styled'

class OrderDetail extends React.Component {
  state = {
    isTableExtendedOpen: false
  }

  componentDidUpdate = prevProps => {
    if (!prevProps.order && this.props.order) {
      this.props.fetchOrderDetail(this.props.order.id)
    } else if (prevProps.order && this.props.order && prevProps.order.id !== this.props.order.id) {
      this.props.fetchOrderDetail(this.props.order.id)
    } else if (prevProps.order && !this.props.order) {
      this.props.resetOrderDetail()
    }
  }

  renderDetail = () => {
    const {
      orderDetail: { data },
      typeEnabled
    } = this.props

    return (
      <Fragment>
        <DetailContainer>
          <ProductsLabel>{`${i18n('DATA_OF')} ${i18n('ORDER')}`}</ProductsLabel>
          <Separator />
          <Row justify={'space-between'} margin={0}>
            <Row width={'auto'}>
              <InfoLabel>
                {typeEnabled === orderType.DELIVERED ? i18n('DELIVERED_AT') : i18n('DELIVER_AT')}
              </InfoLabel>
              <InfoContent>{getFormattedDate(data.delivery_date)}</InfoContent>
            </Row>
            <Row width={'auto'}>
              <InfoLabel>{`${capitalizeFirstLetter(i18n('ORDER'))} Nº: `}</InfoLabel>
              <InfoContent margin={'0 0 0px 10px'}>{data.id}</InfoContent>
            </Row>
          </Row>
          <Row justify={'space-between'} margin={0}>
            <Row width={'auto'}>
              <InfoLabel>{`${capitalizeFirstLetter(i18n('NET_PRICE'))}: `}</InfoLabel>
              <InfoContent>{`${data.net_price} €`}</InfoContent>
            </Row>
            <Row width={'auto'}>
              <InfoLabel>{`${capitalizeFirstLetter(i18n('TOTAL_PRICE'))}: `}</InfoLabel>
              <InfoContent>{`${data.total_price} €`}</InfoContent>
            </Row>
          </Row>
          <ProductsLabel>{`${i18n('DATA_OF')} ${i18n('BUYER')}`}</ProductsLabel>
          <Separator />
          <Row justify={'space-between'} margin={0}>
            <Column>
              <Row>
                <InfoLabel>{i18n('NAME_OF_BUYER')}</InfoLabel>
                <InfoContent>{`${data.client.name} ${data.client.surname}`}</InfoContent>
              </Row>
              <Row>
                <InfoLabel>{`${i18n('EMAIL')}: `}</InfoLabel>
                <InfoContent>{`${data.client.email}`}</InfoContent>
              </Row>
            </Column>
            <LazyImage
              src={data.client.image_url}
              size={this.props.browser.lessThan.widescreen ? 50 : 60}
            />
          </Row>
          <Row justify={'space-between'} margin={'0'}>
            <ProductsLabel>{capitalizeFirstLetter(i18n('PRODUCTS'))}</ProductsLabel>
            {data.products && data.products.length > 0 && (
              <ExpandedLabel onClick={() => this.setState({ isTableExtendedOpen: true })}>
                {i18n('EXPAND_TABLE')}
              </ExpandedLabel>
            )}
          </Row>
          <Separator />
          {data.products && data.products.length > 0 ? (
            <ProductsTable key={'table-simple'} products={data.products} />
          ) : (
            <NoContent content={i18n('NO_PRODUCTS_AVAIABLE')} />
          )}
        </DetailContainer>
        {this.state.isTableExtendedOpen && this.renderExtendedTable()}
      </Fragment>
    )
  }

  renderExtendedTable = () => (
    <Modal>
      <ExtendedTableContainer>
        <CrossImage src={CrossIcon} onClick={() => this.setState({ isTableExtendedOpen: false })} />
        <ProductsLabel>{i18n('PRODUCTS_TABLE_EXTENDED')}</ProductsLabel>
        <Separator />
        <ProductsTable
          key={'table-extended'}
          products={this.props.orderDetail.data.products}
          extended
        />
      </ExtendedTableContainer>
    </Modal>
  )

  renderNoData = () => (
    <DetailContainer>
      <InfoContent>{`${i18n('SELECT_AN').MALE} ${i18n('ORDER')}`}</InfoContent>
    </DetailContainer>
  )

  renderOrder = () => {
    return this.props.orderDetail.data ? this.renderDetail() : this.renderNoData()
  }

  mapProducts = products =>
    products.map(p => {
      p.name = p.product.name
      p.image_url = p.product.image_url
      return p
    })

  renderLoader = () => <PageLoader />

  render() {
    return this.props.orderDetail.isFetching ? this.renderLoader() : this.renderOrder()
  }
}

const mapStateToProps = ({ browser, orderDetail }) => ({
  browser,
  orderDetail
})

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchOrderDetail, resetOrderDetail }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetail)
