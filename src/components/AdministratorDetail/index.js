import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import DetailContainer from 'components/DetailContainer'
import { ConfirmationButton, CancelButton } from 'components/Button'
import { activateAdmin, deactivateAdmin } from 'actions/administrators'
import { ErrorLabel } from 'components/Form'
import { capitalizeFirstLetter } from 'utils/strings'
import PopUp from 'components/PopUp'
import i18n from 'services/i18n'
import { StyledContent, StyledLabel, Row, DeleteTitle, DeleteLabel } from './styled'

class AdministratorDetail extends React.Component {
  state = {
    isDeleteFormOpen: false,
    isActivateFormOpen: false
  }

  renderDeleteForm = () => (
    <PopUp onClose={this.toggleDeleteForm}>
      <Row justify={'center'} margin={'0px 0px 10px 0px'}>
        <DeleteTitle>{i18n('DISABLE_ADMINISTRATOR')}</DeleteTitle>
      </Row>
      <Row justify={'center'} margin={'0px 0px 20px 0px'}>
        <DeleteLabel>{`${i18n('SURE_TO_DISABLE_ADMINISTRATOR')} "${
          this.props.admin.name
        }"?`}</DeleteLabel>
      </Row>
      <CancelButton
        type={'button'}
        onClick={this.handleDelete}
        loading={this.props.administrators.isSubmitting}
      >
        {capitalizeFirstLetter(i18n('DISABLE'))}
      </CancelButton>
      {this.props.administrators.error && (
        <ErrorLabel>{this.props.administrators.error}</ErrorLabel>
      )}
    </PopUp>
  )

  handleDelete = async () => {
    await this.props.deactivateAdmin(this.props.admin.id)
    if (!this.props.administrators.error) {
      this.toggleDeleteForm()
      this.props.onAdminEdit()
    }
  }

  toggleDeleteForm = () => this.setState({ isDeleteFormOpen: !this.state.isDeleteFormOpen })

  renderActivateForm = () => (
    <PopUp onClose={this.toggleActivateForm}>
      <Row justify={'center'} margin={'0px 0px 10px 0px'}>
        <DeleteTitle>{i18n('ENABLE_ADMINISTRATOR')}</DeleteTitle>
      </Row>
      <Row justify={'center'} margin={'0px 0px 20px 0px'}>
        <DeleteLabel>{`${i18n('SURE_TO_ENABLE_ADMINISTRATOR')} "${
          this.props.admin.name
        }"?`}</DeleteLabel>
      </Row>
      <ConfirmationButton
        type={'button'}
        onClick={this.handleActivate}
        loading={this.props.administrators.isSubmitting}
      >
        {capitalizeFirstLetter(i18n('ENABLE'))}
      </ConfirmationButton>
      {this.props.administrators.error && (
        <ErrorLabel>{this.props.administrators.error}</ErrorLabel>
      )}
    </PopUp>
  )

  handleActivate = async () => {
    await this.props.activateAdmin(this.props.admin.id)
    if (!this.props.administrators.error) {
      this.toggleActivateForm()
      this.props.onAdminEdit()
    }
  }

  toggleActivateForm = () => this.setState({ isActivateFormOpen: !this.state.isActivateFormOpen })

  renderDetail = () => (
    <Fragment>
      <DetailContainer>
        <Row justify={'Space-between'}>
          <StyledLabel size={24}>{'DETALLE DEL ADMINISTRADOR'}</StyledLabel>
          {this.props.active ? (
            <CancelButton onClick={this.toggleDeleteForm} small>
              {i18n('DISABLE_ADMINISTRATOR')}
            </CancelButton>
          ) : (
            <ConfirmationButton onClick={this.toggleActivateForm} small>
              {i18n('ENABLE_ADMINISTRATOR')}
            </ConfirmationButton>
          )}
        </Row>
        <Row>
          <StyledLabel>{`${capitalizeFirstLetter(i18n('NAME'))}:`}</StyledLabel>
          <StyledContent>{this.props.admin.name}</StyledContent>
        </Row>
        <Row>
          <StyledLabel>{`${i18n('SURNAME')}:`}</StyledLabel>
          <StyledContent>{this.props.admin.surname}</StyledContent>
        </Row>
        <Row>
          <StyledLabel>{`${i18n('EMAIL')}:`}</StyledLabel>
          <StyledContent>{this.props.admin.email}</StyledContent>
        </Row>
        <Row>
          <StyledLabel>{`${capitalizeFirstLetter(i18n('USERNAME'))}:`}</StyledLabel>
          <StyledContent>{this.props.admin.username}</StyledContent>
        </Row>
      </DetailContainer>
      {this.state.isDeleteFormOpen && this.renderDeleteForm()}
      {this.state.isActivateFormOpen && this.renderActivateForm()}
    </Fragment>
  )
  render() {
    return this.props.admin ? (
      this.renderDetail()
    ) : (
      <DetailContainer>
        <label>{i18n('SELECT_ADMINISTRATOR')}</label>
      </DetailContainer>
    )
  }
}

const mapStateToProps = ({ administrators }) => ({ administrators })

const mapDispatchToProps = dispatch =>
  bindActionCreators({ activateAdmin, deactivateAdmin }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdministratorDetail)
