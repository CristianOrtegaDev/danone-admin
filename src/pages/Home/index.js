import React from 'react'
import Page, { ContentContainer, ContentWrapper, ListWrapper, DetailWrapper } from 'components/Page'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchOrdersPendent } from 'actions/ordersPendent'
import { fetchOrdersDelivered } from 'actions/ordersDelivered'
import { setSelectedResource, resetSelectedResource } from 'actions/selectedResource'
import Section from 'components/Section'
import PageLoader from 'components/PageLoader'
import PageEmpty from 'components/PageEmpty'
import StyledTabs from 'components/StyledTabs'
import ResourceList from 'components/ResourceList'
import Order from 'components/Order'
import OrderDetail from 'components/OrderDetail'
import orderType from 'constants/orderType'
import i18n from 'services/i18n'
import { capitalizeFirstLetter } from 'utils/strings'
import { toast } from 'react-toastify'
import { ErrorToast } from 'components/Toast'

class Home extends React.Component {
  state = {
    active: 0
  }

  componentDidMount = () => {
    this.props.fetchOrdersPendent(true)
    this.props.fetchOrdersDelivered(true)
  }

  componentDidUpdate = prevProps => {
    if (
      this.props.ordersPendent.error &&
      prevProps.ordersPendent.error !== this.props.ordersPendent.error
    ) {
      toast(
        <ErrorToast
          boldContent={i18n('ERRORS').WE_ARE_SORRY}
          content={this.props.ordersPendent.error}
        />
      )
    } else if (
      this.props.ordersDelivered.error &&
      prevProps.ordersDelivered.error !== this.props.ordersDelivered.error
    ) {
      toast(
        <ErrorToast
          boldContent={i18n('ERRORS').WE_ARE_SORRY}
          content={this.props.ordersDelivered.error}
        />
      )
    }
  }

  handleTabChange = (event, value) => {
    this.props.resetSelectedResource()
    this.setState({ active: value })
  }

  componentWillUnmount = () => this.props.resetSelectedResource()

  renderOrders = orders =>
    orders.map((order, i) => (
      <Order
        key={i}
        {...order}
        selected={this.props.selectedResource && this.props.selectedResource.id === order.id}
        type={this.isDeliverEnabled() ? orderType.DELIVERED : orderType.PENDENT}
        onClick={() => this.props.setSelectedResource(order)}
      />
    ))

  handleMoreContentFetching = () => {
    if (this.isDeliverEnabled()) {
      this.props.fetchOrdersDelivered()
    } else {
      this.props.fetchOrdersPendent()
    }
  }

  checkPageContent = () =>
    this.isContentAvaiable() ? (
      <ContentWrapper>
        <ListWrapper>
          <ResourceList
            dataLength={
              this.isDeliverEnabled()
                ? this.props.ordersDelivered.values.length
                : this.props.ordersPendent.values.length
            }
            fetchMoreContent={this.handleMoreContentFetching}
            noMoreContentMsg={i18n('NO_MORE_ORDERS')}
            hasMore={
              this.isDeliverEnabled()
                ? this.props.ordersDelivered.hasMore
                : this.props.ordersPendent.hasMore
            }
          >
            {this.renderOrders(
              this.isDeliverEnabled()
                ? this.props.ordersDelivered.values
                : this.props.ordersPendent.values
            )}
          </ResourceList>
        </ListWrapper>
        <DetailWrapper>
          <OrderDetail
            order={this.props.selectedResource}
            typeEnabled={this.isDeliverEnabled() ? orderType.DELIVERED : orderType.PENDENT}
          />
        </DetailWrapper>
      </ContentWrapper>
    ) : (
      <PageEmpty message={i18n('NO_ORDERS_AVAIABLE')} />
    )

  isLoading = () =>
    this.props.ordersPendent.isFetching &&
    this.props.ordersDelivered.isFetching &&
    !this.isContentAvaiable()

  isContentAvaiable = () =>
    this.props.ordersPendent.values.length || this.props.ordersDelivered.values.length

  isDeliverEnabled = () => this.state.active === 0

  render() {
    return (
      <Page withHeader>
        <Section title={capitalizeFirstLetter(i18n('ORDERS'))}>
          <ContentContainer>
            <StyledTabs
              value={this.state.active}
              tabs={[
                {
                  label: i18n('DELIVERED'),
                  value: this.props.ordersDelivered.values.length
                },
                {
                  label: i18n('PENDENTS'),
                  value: this.props.ordersPendent.values.length
                }
              ]}
              handleTabChange={this.handleTabChange}
            />
            {this.isLoading() ? <PageLoader /> : this.checkPageContent()}
          </ContentContainer>
        </Section>
      </Page>
    )
  }
}

const mapStateToProps = ({ ordersPendent, ordersDelivered, selectedResource }) => ({
  ordersPendent,
  ordersDelivered,
  selectedResource
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { fetchOrdersPendent, fetchOrdersDelivered, setSelectedResource, resetSelectedResource },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
