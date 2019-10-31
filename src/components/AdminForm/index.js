import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Modal from 'components/Modal'
import Input from 'components/Input'
import CrossIcon from 'assets/icons/cross.png'
import { SuccessButton } from 'components/Button'
import { submitAdmin } from 'actions/administrators'
import i18n from 'services/i18n'
import { capitalizeFirstLetter } from 'utils/strings'
import { specialCharacters, numbers, upperCaseLetters, email } from 'utils/regex'
import { FormContainer, Row, Column, ErrorLabel, CrossImage, InputLabel } from 'components/Form'

class AdminForm extends React.Component {
  getInitialValues = () => ({
    email: '',
    name: '',
    surname: '',
    username: '',
    password: ''
  })

  getSignUpSchema = () =>
    Yup.object().shape({
      email: Yup.string()
        .matches(email, i18n('FORM_VALIDATIONS').VALID_EMAIL)
        .required(i18n('FORM_VALIDATIONS').EMAIL_REQUIRED),
      name: Yup.string().required(i18n('FORM_VALIDATIONS').NAME_REQUIRED),
      surname: Yup.string().required(i18n('FORM_VALIDATIONS').SURNAME_REQUIRED),
      username: Yup.string().required(i18n('FORM_VALIDATIONS').USER_REQUIRED),
      password: Yup.string()
        .matches(specialCharacters, i18n('FORM_VALIDATIONS').SPECIAL_CHARACTER)
        .matches(numbers, i18n('FORM_VALIDATIONS').NUMBER_REQUIRED)
        .matches(upperCaseLetters, i18n('FORM_VALIDATIONS').UPPER_CASE_REQUIRED)
        .required(i18n('FORM_VALIDATIONS').PASSWORD_REQUIRED)
    })

  handleSubmit = async formData => {
    formData.is_super_user = false
    await this.props.submitAdmin(formData)
    if (!this.props.administrators.error) {
      this.props.onClose(true)
    }
  }

  getFormContent = ({ handleSubmit, values, setFieldValue, errors }) => (
    <FormContainer onSubmit={handleSubmit}>
      <CrossImage onClick={() => this.props.onClose(false)} src={CrossIcon} />
      <InputLabel>{'Nuevo administrador'}</InputLabel>
      <Row>
        <Column>
          <Input
            name={'email'}
            placeholder={i18n('EMAIL')}
            value={values.email}
            disabled={this.props.administrators.isFetching}
            onChange={({ target: { value } }) => setFieldValue('email', value)}
          />
          {errors.email && <ErrorLabel>{errors.email}</ErrorLabel>}
        </Column>
      </Row>
      <Row>
        <Column>
          <Input
            name={'name'}
            placeholder={i18n('NAME')}
            value={values.name}
            disabled={this.props.administrators.isFetching}
            onChange={({ target: { value } }) => setFieldValue('name', value)}
          />
          {errors.name && <ErrorLabel>{errors.name}</ErrorLabel>}
        </Column>
      </Row>
      <Row>
        <Column>
          <Input
            name={'surname'}
            placeholder={i18n('SURNAME')}
            value={values.surname}
            disabled={this.props.administrators.isFetching}
            onChange={({ target: { value } }) => setFieldValue('surname', value)}
          />
          {errors.surname && <ErrorLabel>{errors.surname}</ErrorLabel>}
        </Column>
      </Row>
      <Row>
        <Column>
          <Input
            name={'username'}
            placeholder={i18n('USER')}
            value={values.username}
            disabled={this.props.administrators.isFetching}
            onChange={({ target: { value } }) => setFieldValue('username', value)}
          />
          {errors.username && <ErrorLabel>{errors.username}</ErrorLabel>}
        </Column>
      </Row>
      <Row>
        <Column>
          <Input
            name={'password'}
            type={'password'}
            placeholder={i18n('PASSWORD')}
            value={values.password}
            disabled={this.props.administrators.isFetching}
            onChange={({ target: { value } }) => setFieldValue('password', value)}
          />
          {errors.password && <ErrorLabel>{errors.password}</ErrorLabel>}
        </Column>
      </Row>
      <SuccessButton type={'submit'} loading={this.props.administrators.isSubmitting}>
        {capitalizeFirstLetter(i18n('REGISTER'))}
      </SuccessButton>
      {this.props.administrators.error && (
        <ErrorLabel>{this.props.administrators.error}</ErrorLabel>
      )}
    </FormContainer>
  )

  render() {
    return (
      <Modal>
        <Formik
          initialValues={this.getInitialValues()}
          validateOnChange={false}
          validationSchema={this.getSignUpSchema()}
          onSubmit={this.handleSubmit}
          render={this.getFormContent}
        />
      </Modal>
    )
  }
}

const mapStateToProps = ({ administrators }) => ({ administrators })

const mapDispatchToProps = dispatch => bindActionCreators({ submitAdmin }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminForm)
