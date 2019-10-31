import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DetailContainer from 'components/DetailContainer'
import { ConfirmationButton, CancelButton, SuccessButton } from 'components/Button'
import { activateClient, deactivateClient } from 'actions/clients'
import { ErrorLabel } from 'components/Form'
import { capitalizeFirstLetter } from 'utils/strings'
import PopUp from 'components/PopUp'
import i18n from 'services/i18n'
import LazyImage from 'components/LazyImage'
import DAY_SELECTION from 'constants/daySelection'
import { StyledContent, StyledLabel, Row, Column, DeleteTitle, DeleteLabel } from './styled'

class ClientDetail extends React.Component {
  state = {
    isDeleteFormOpen: false,
    isActivateFormOpen: false
  }

  renderDeleteForm = () => (
    <PopUp onClose={this.toggleDeleteForm}>
      <Row justify={'center'} margin={'0px 0px 10px 0px'}>
        <DeleteTitle>{i18n('DISABLE_CLIENT')}</DeleteTitle>
      </Row>
      <Row justify={'center'} margin={'0px 0px 20px 0px'}>
        <DeleteLabel>{`${i18n('SURE_TO_DISABLE_CLIENT')} "${
          this.props.client.name
        }"?`}</DeleteLabel>
      </Row>
      <CancelButton
        type={'button'}
        onClick={this.handleDelete}
        loading={this.props.clients.isSubmitting}
      >
        {capitalizeFirstLetter(i18n('DISABLE'))}
      </CancelButton>
      {this.props.clients.error && <ErrorLabel>{this.props.clients.error}</ErrorLabel>}
    </PopUp>
  )

  handleDelete = async () => {
    await this.props.deactivateClient(this.props.client.id)
    if (!this.props.clients.error) {
      this.toggleDeleteForm()
      this.props.onClientEdit()
    }
  }

  toggleDeleteForm = () => this.setState({ isDeleteFormOpen: !this.state.isDeleteFormOpen })

  renderActivateForm = () => (
    <PopUp onClose={this.toggleActivateForm}>
      <Row justify={'center'} margin={'0px 0px 10px 0px'}>
        <DeleteTitle>{i18n('ENABLE_CLIENT')}</DeleteTitle>
      </Row>
      <Row justify={'center'} margin={'0px 0px 20px 0px'}>
        <DeleteLabel>{`${i18n('SURE_TO_ENABLE_CLIENT')} "${this.props.client.name}"?`}</DeleteLabel>
      </Row>
      <ConfirmationButton
        type={'button'}
        onClick={this.handleActivate}
        loading={this.props.clients.isSubmitting}
      >
        {capitalizeFirstLetter(i18n('ENABLE'))}
      </ConfirmationButton>
      {this.props.clients.error && <ErrorLabel>{this.props.clients.error}</ErrorLabel>}
    </PopUp>
  )

  handleActivate = async () => {
    await this.props.activateClient(this.props.client.id)
    if (!this.props.clients.error) {
      this.toggleActivateForm()
      this.props.onClientEdit()
    }
  }

  toggleActivateForm = () => this.setState({ isActivateFormOpen: !this.state.isActivateFormOpen })

  renderDetail = () => (
    <Fragment>
      <DetailContainer>
        <Row justify={'Space-between'}>
          <StyledLabel size={24}>{'DETALLE DEL CLIENTE'}</StyledLabel>
          {this.props.active ? (
            <Row justify={'Space-between'}>
              <SuccessButton onClick={this.props.editClient} small>
                {i18n('EDIT_CLIENT')}
              </SuccessButton>
              <div style={{ width: 10 }} />
              <CancelButton onClick={this.toggleDeleteForm} small>
                {i18n('DISABLE_CLIENT')}
              </CancelButton>
            </Row>
          ) : (
            <ConfirmationButton onClick={this.toggleActivateForm} small>
              {i18n('ENABLE_CLIENT')}
            </ConfirmationButton>
          )}
        </Row>
        <Row justify={'Space-between'}>
          <Column>
            <Row>
              <StyledLabel>{`${capitalizeFirstLetter(i18n('CLIENT_CODE'))}:`}</StyledLabel>
              <StyledContent>{this.props.client.client_code}</StyledContent>
            </Row>
            <Row>
              <StyledLabel>{`${capitalizeFirstLetter(i18n('NAME'))}:`}</StyledLabel>
              <StyledContent>{this.props.client.name}</StyledContent>
            </Row>
          </Column>
          <Row>
            <LazyImage src={this.props.client.image_url} size={100} />
          </Row>
        </Row>
        <Row>
          <StyledLabel>{`${i18n('SURNAME')}:`}</StyledLabel>
          <StyledContent>{this.props.client.surname}</StyledContent>
        </Row>
        <Row>
          <StyledLabel>{`${i18n('EMAIL')}:`}</StyledLabel>
          <StyledContent>{this.props.client.email}</StyledContent>
        </Row>
        <Row>
          <StyledLabel>{`${capitalizeFirstLetter(i18n('USERNAME'))}:`}</StyledLabel>
          <StyledContent>{this.props.client.username}</StyledContent>
        </Row>
        <Row>
          <StyledLabel>{`${capitalizeFirstLetter(i18n('CLIENT_DELIVERY_DAY'))}:`}</StyledLabel>
          <StyledContent>
            {DAY_SELECTION.find(e => e.value === this.props.client.delivery_day).label}
          </StyledContent>
        </Row>
      </DetailContainer>
      {this.state.isDeleteFormOpen && this.renderDeleteForm()}
      {this.state.isActivateFormOpen && this.renderActivateForm()}
    </Fragment>
  )
  render() {
    return this.props.client ? (
      this.renderDetail()
    ) : (
      <DetailContainer>
        <label>{i18n('SELECT_CLIENT')}</label>
      </DetailContainer>
    )
  }
}

const mapStateToProps = ({ clients }) => ({ clients })

const mapDispatchToProps = dispatch =>
  bindActionCreators({ activateClient, deactivateClient }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientDetail)
