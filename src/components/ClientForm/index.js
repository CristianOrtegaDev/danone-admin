import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Modal from 'components/Modal'
import Input from 'components/Input'
import CrossIcon from 'assets/icons/cross.png'
import { SuccessButton } from 'components/Button'
import StyledSelect from 'components/StyledSelect'
import { submitClient, editClient } from 'actions/clients'
import FileInput from 'components/FileInput'
import { capitalizeFirstLetter } from 'utils/strings'
import { specialCharacters, numbers, upperCaseLetters, email } from 'utils/regex'
import { FormContainer, Row, Column, ErrorLabel, CrossImage, InputLabel } from 'components/Form'
import DAY_SELECTION from 'constants/daySelection'
import i18n from 'services/i18n'

class ClientForm extends React.Component {
  getInitialValues = () =>
    this.isEditMode()
      ? this.formatInitialEditValues(this.props.client)
      : {
          username: '',
          client_code: '',
          name: '',
          surname: '',
          email: '',
          password: '',
          delivery_day: '',
          nif: '',
          image: null
        }

  formatInitialEditValues = ({ delivery_day, image_url, ...otherProps }) => ({
    ...otherProps,
    image: { url: image_url },
    delivery_day: DAY_SELECTION[delivery_day]
  })

  getSignUpSchema = () =>
    Yup.lazy(() =>
      Yup.object().shape({
        email: this.isEditMode()
          ? null
          : Yup.string()
              .matches(email, i18n('FORM_VALIDATIONS').VALID_EMAIL)
              .required(i18n('FORM_VALIDATIONS').EMAIL_REQUIRED),
        client_code: this.isEditMode()
          ? null
          : Yup.string().required(i18n('FORM_VALIDATIONS').CLIENT_CODE_REQUIRED),
        name: Yup.string().required(i18n('FORM_VALIDATIONS').NAME_REQUIRED),
        surname: Yup.string().required(i18n('FORM_VALIDATIONS').SURNAME_REQUIRED),
        username: this.isEditMode()
          ? null
          : Yup.string().required(i18n('FORM_VALIDATIONS').USER_REQUIRED),
        password: this.isEditMode()
          ? null
          : Yup.string()
              .matches(specialCharacters, i18n('FORM_VALIDATIONS').SPECIAL_CHARACTER)
              .matches(numbers, i18n('FORM_VALIDATIONS').NUMBER_REQUIRED)
              .matches(upperCaseLetters, i18n('FORM_VALIDATIONS').UPPER_CASE_REQUIRED)
              .required(i18n('FORM_VALIDATIONS').PASSWORD_REQUIRED),
        delivery_day: Yup.string().required(i18n('FORM_VALIDATIONS').DELIVERY_DAY_REQUIRED),
        nif: this.isEditMode()
          ? null
          : Yup.string().required(i18n('FORM_VALIDATIONS').NIF_REQUIRED),
        image: Yup.object()
          .nullable()
          .required(i18n('FORM_VALIDATIONS').IMAGE_REQUIRED)
      })
    )

  isEditMode = () => (this.props.client ? true : false)

  getFormContent = ({ handleSubmit, values, setFieldValue, errors }) => (
    <FormContainer onSubmit={handleSubmit}>
      <CrossImage onClick={() => this.props.onClose(false)} src={CrossIcon} />
      <InputLabel>{this.isEditMode() ? i18n('EDIT_CLIENT') : i18n('CREATE_CLIENT')}</InputLabel>
      {!this.isEditMode() && (
        <Row>
          <Column>
            <Input
              name={'client_code'}
              placeholder={i18n('CLIENT_CODE')}
              value={values.client_code}
              disabled={this.props.clients.isFetching || this.isEditMode()}
              onChange={({ target: { value } }) => setFieldValue('client_code', value)}
            />
            {errors.client_code && <ErrorLabel>{errors.client_code}</ErrorLabel>}
          </Column>
        </Row>
      )}
      {!this.isEditMode() && (
        <Row>
          <Column>
            <Input
              name={'email'}
              placeholder={i18n('EMAIL')}
              value={values.email}
              disabled={this.props.clients.isFetching || this.isEditMode()}
              onChange={({ target: { value } }) => setFieldValue('email', value)}
            />
            {errors.email && <ErrorLabel>{errors.email}</ErrorLabel>}
          </Column>
        </Row>
      )}
      <Row align={'flex-start'}>
        <Column margin={'0 10px 0 0'}>
          <Input
            name={'name'}
            placeholder={i18n('NAME')}
            value={values.name}
            disabled={this.props.clients.isFetching}
            onChange={({ target: { value } }) => setFieldValue('name', value)}
          />
          {errors.name && <ErrorLabel>{errors.name}</ErrorLabel>}
        </Column>
        <Column>
          <Input
            name={'surname'}
            placeholder={i18n('SURNAME')}
            value={values.surname}
            disabled={this.props.clients.isFetching}
            onChange={({ target: { value } }) => setFieldValue('surname', value)}
          />
          {errors.surname && <ErrorLabel>{errors.surname}</ErrorLabel>}
        </Column>
      </Row>
      {!this.isEditMode() && (
        <Row>
          <Column>
            <Input
              name={'username'}
              placeholder={i18n('USER')}
              value={values.username}
              disabled={this.props.clients.isFetching || this.isEditMode()}
              onChange={({ target: { value } }) => setFieldValue('username', value)}
            />
            {errors.username && <ErrorLabel>{errors.username}</ErrorLabel>}
          </Column>
        </Row>
      )}
      {!this.isEditMode() && (
        <Row>
          <Column>
            <Input
              name={'password'}
              type={'password'}
              placeholder={i18n('PASSWORD')}
              value={values.password}
              disabled={this.props.clients.isFetching || this.isEditMode()}
              onChange={({ target: { value } }) => setFieldValue('password', value)}
            />
            {errors.password && <ErrorLabel>{errors.password}</ErrorLabel>}
          </Column>
        </Row>
      )}
      <Row>
        <Column>
          {!this.isEditMode() && (
            <Column margin={'0 0 10px 0'}>
              <Input
                name={'nif'}
                placeholder={i18n('NIF')}
                value={values.nif}
                disabled={this.props.clients.isFetching || this.isEditMode()}
                onChange={({ target: { value } }) => setFieldValue('nif', value)}
              />
              {errors.nif && <ErrorLabel>{errors.nif}</ErrorLabel>}
            </Column>
          )}
          <Column>
            <StyledSelect
              name={'delivery_day'}
              value={values.delivery_day}
              placeholder={capitalizeFirstLetter(i18n('DELIVERY_DAY'))}
              onChange={value => setFieldValue('delivery_day', value)}
              options={DAY_SELECTION}
              isSearchable={false}
            />
            {errors.delivery_day && <ErrorLabel>{errors.delivery_day}</ErrorLabel>}
          </Column>
        </Column>
        <Column width={30} align={'center'}>
          <FileInput
            name={'image'}
            value={values.image}
            onChange={file => setFieldValue('image', file)}
            withImgCrop
          />
          {errors.image && <ErrorLabel>{errors.image}</ErrorLabel>}
        </Column>
      </Row>
      <SuccessButton type={'submit'} loading={this.props.clients.isSubmitting}>
        {capitalizeFirstLetter(i18n(this.isEditMode() ? 'EDIT' : 'REGISTER'))}
      </SuccessButton>
      {this.props.clients.error && <ErrorLabel>{this.props.clients.error}</ErrorLabel>}
    </FormContainer>
  )

  handleSubmit = async formData => {
    if (this.isEditMode()) {
      const formattedClient = this.formatEditFormData(formData)
      await this.props.editClient(formattedClient)
    } else {
      const formattedClient = this.formatSubmitFormData(formData)
      await this.props.submitClient(formattedClient)
    }
    if (!this.props.clients.error) {
      this.props.onClose(true)
    }
  }

  formatEditFormData = formData => {
    let updatedFormData = {}
    updatedFormData.id = this.props.client.id
    updatedFormData.name = formData.name
    updatedFormData.surname = formData.surname
    updatedFormData.delivery_day = parseInt(formData.delivery_day.value)

    if (formData.image.extension) {
      let formattedData = this.formatSubmitFormData(formData)
      updatedFormData.image_base64 = formattedData.image_base64
      updatedFormData.image_extension = formattedData.image_extension
      updatedFormData.should_image_be_updated = true
    }

    return updatedFormData
  }

  formatSubmitFormData = ({ image, delivery_day, ...args }) => ({
    ...args,
    delivery_day: parseInt(delivery_day.value),
    image_base64: image.base64Value,
    image_extension: image.extension
  })

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

const mapStateToProps = ({ clients }) => ({ clients })

const mapDispatchToProps = dispatch => bindActionCreators({ submitClient, editClient }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientForm)
