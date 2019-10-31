import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchDiscounts, activateDiscount, deactivateDiscount } from 'actions/discounts'
import { ConfirmationButton, CancelButton } from 'components/Button'
import { fetchInactiveDiscounts } from 'actions/inactiveDiscounts'
import CircularProgress from '@material-ui/core/CircularProgress'
import DetailContainer from 'components/DetailContainer'
import DiscountsTable from 'components/DiscountsTable'
import DiscountForm from 'components/DiscountForm'
import StyledTabs from 'components/StyledTabs'
import { ErrorLabel } from 'components/Form'
import PopUp from 'components/PopUp'
import { capitalizeFirstLetter } from 'utils/strings'
import i18n from 'services/i18n'
import {
  DetailWrapper,
  TableWrapper,
  AddBtn,
  LoaderWrapper,
  Row,
  DeleteLabel,
  DeleteTitle
} from './styled'

class DiscountDetail extends React.Component {
  state = {
    active: 0,
    isDiscountFormActive: false,
    discountToDeactivate: null,
    discountToActivate: null
  }

  componentDidUpdate = prevProps => {
    if (
      (!prevProps.product && this.props.product) ||
      (this.props.product && prevProps.product && this.props.product.id !== prevProps.product.id)
    ) {
      this.fetchInitialData()
    }
  }

  fetchInitialData = (page = 1) => {
    this.props.fetchDiscounts(this.props.product.id, page)
    this.props.fetchInactiveDiscounts(this.props.product.id, page)
  }

  isActiveEnabled = () => this.state.active === 0

  isLoading = () =>
    this.isActiveEnabled()
      ? this.props.discounts.isFetching
      : this.props.inactiveDiscounts.isFetching

  isContentAvaiable = () =>
    this.isActiveEnabled()
      ? this.props.discounts.values.length
      : this.props.inactiveDiscounts.values.length

  renderDetail = () => (
    <DetailWrapper>
      <StyledTabs
        value={this.state.active}
        tabs={[
          {
            label: i18n('ACTIVE'),
            value: this.props.discounts.values.length
          },
          {
            label: i18n('INACTIVE'),
            value: this.props.inactiveDiscounts.values.length
          }
        ]}
        handleTabChange={this.handleTabChange}
      />
      <TableWrapper>{this.checkTableRender()}</TableWrapper>
      <AddBtn onClick={this.handleAddDiscount}>{'+'}</AddBtn>
    </DetailWrapper>
  )

  checkTableRender = () =>
    this.isLoading() ? (
      <LoaderWrapper>
        <CircularProgress />
      </LoaderWrapper>
    ) : (
      this.renderTable()
    )

  renderTable = () =>
    this.isContentAvaiable() ? (
      <DiscountsTable
        discounts={
          this.isActiveEnabled() ? this.props.discounts.values : this.props.inactiveDiscounts.values
        }
        active={this.state.active}
        onActivate={this.openActivateDiscountForm}
        onDeactivate={this.openDeactivateDiscountForm}
        onPageChange={page => this.fetchInitialData(page)}
        actualPage={this.props.discounts.page}
        hasMore={this.props.discounts.hasMore}
      />
    ) : (
      <label>No hay descuentos disponibles</label>
    )

  handleAddDiscount = () => this.toggleDiscountForm()

  toggleDiscountForm = reset => {
    this.setState({ isDiscountFormActive: !this.state.isDiscountFormActive })
    if (reset) {
      this.fetchInitialData()
    }
  }

  handleTabChange = (_event, value) => {
    this.setState({ active: value })
  }

  openActivateDiscountForm = discountToActivate => this.setState({ discountToActivate })

  closeActivateDiscountForm = () => this.setState({ discountToActivate: null })

  handleActivateDiscount = async () => {
    await this.props.activateDiscount(this.state.discountToActivate.id)
    if (!this.props.discounts.error) {
      this.closeActivateDiscountForm()
      this.fetchInitialData()
    }
  }

  renderActivateForm = () => (
    <PopUp onClose={this.closeActivateDiscountForm}>
      <Row justify={'center'} margin={'0px 0px 10px 0px'}>
        <DeleteTitle>{i18n('ENABLE_DISCOUNT')}</DeleteTitle>
      </Row>
      <Row justify={'center'} margin={'0px 0px 20px 0px'}>
        <DeleteLabel>{`${i18n('SURE_TO_ENABLE_DISCOUNT')} "${
          this.state.discountToActivate.id
        }"?`}</DeleteLabel>
      </Row>
      <ConfirmationButton
        type={'button'}
        onClick={this.handleActivateDiscount}
        loading={this.props.discounts.isSubmitting}
      >
        {capitalizeFirstLetter(i18n('ENABLE'))}
      </ConfirmationButton>
      {this.props.discounts.error && <ErrorLabel>{this.props.discounts.error}</ErrorLabel>}
    </PopUp>
  )

  openDeactivateDiscountForm = discountToDeactivate => this.setState({ discountToDeactivate })

  closeDeactivateDiscountForm = () => this.setState({ discountToDeactivate: null })

  handleDisableDiscount = async () => {
    await this.props.deactivateDiscount(this.state.discountToDeactivate.id)
    if (!this.props.discounts.error) {
      this.closeDeactivateDiscountForm()
      this.fetchInitialData()
    }
  }

  renderDeactivateForm = () => (
    <PopUp onClose={this.closeDeactivateDiscountForm}>
      <Row justify={'center'} margin={'0px 0px 10px 0px'}>
        <DeleteTitle>{i18n('DISABLE_DISCOUNT')}</DeleteTitle>
      </Row>
      <Row justify={'center'} margin={'0px 0px 20px 0px'}>
        <DeleteLabel>{`${i18n('SURE_TO_DISABLE_DISCOUNT')} "${
          this.state.discountToDeactivate.id
        }"?`}</DeleteLabel>
      </Row>
      <CancelButton
        type={'button'}
        onClick={this.handleDisableDiscount}
        loading={this.props.discounts.isSubmitting}
      >
        {capitalizeFirstLetter(i18n('DISABLE'))}
      </CancelButton>
      {this.props.discounts.error && <ErrorLabel>{this.props.discounts.error}</ErrorLabel>}
    </PopUp>
  )

  render() {
    return (
      <DetailContainer>
        {this.props.product ? this.renderDetail() : <label>Seleccione un producto</label>}
        {this.state.isDiscountFormActive && <DiscountForm onClose={this.toggleDiscountForm} />}
        {this.state.discountToActivate && this.renderActivateForm()}
        {this.state.discountToDeactivate && this.renderDeactivateForm()}
      </DetailContainer>
    )
  }
}

const mapStateToProps = ({ discounts, inactiveDiscounts }) => ({
  discounts,
  inactiveDiscounts
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchDiscounts,
      fetchInactiveDiscounts,
      activateDiscount,
      deactivateDiscount
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscountDetail)
