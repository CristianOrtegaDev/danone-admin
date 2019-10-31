import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { submitBrand, editBrand } from 'actions/brands'
import Modal from 'components/Modal'
import FileInput from 'components/FileInput'
import Input from 'components/Input'
import CrossIcon from 'assets/icons/cross.png'
import { SuccessButton } from 'components/Button'
import i18n from 'services/i18n'
import { capitalizeFirstLetter } from 'utils/strings'
import { FormContainer, Row, Column, ErrorLabel, CrossImage, InputLabel } from 'components/Form'

class BrandForm extends React.Component {
  getFormContent = ({ handleSubmit, values, setFieldValue, errors }) => (
    <FormContainer onSubmit={handleSubmit}>
      <CrossImage onClick={() => this.props.onClose(false)} src={CrossIcon} />
      <Row>
        <Column>
          <InputLabel>{`${capitalizeFirstLetter(
            this.props.brand ? i18n('EDIT') : i18n('NEW').FEMALE
          )} ${i18n('BRAND')}`}</InputLabel>
          <Input
            name={'name'}
            placeholder={capitalizeFirstLetter(i18n('NAME'))}
            value={values.name}
            onChange={({ target: { value } }) => setFieldValue('name', value)}
          />
          {errors.name && <ErrorLabel>{errors.name}</ErrorLabel>}
        </Column>
      </Row>
      <Row>
        <Column>
          <FileInput
            name={'image_url'}
            value={values.image_url}
            onChange={file => setFieldValue('image_url', file)}
            withImgCrop
          />
          {errors.image_url && <ErrorLabel>{errors.image_url}</ErrorLabel>}
        </Column>
      </Row>
      <Row justify={'center'}>
        <SuccessButton type={'submit'} loading={this.props.brands.isSubmitting}>
          {capitalizeFirstLetter(this.props.brand ? i18n('EDIT') : i18n('CREATE'))}
        </SuccessButton>
      </Row>
    </FormContainer>
  )

  getInitialValues = () =>
    this.props.brand && this.props.brand.image_url
      ? {
          ...this.props.brand,
          image_url: { url: this.props.brand.image_url }
        }
      : {
          name: '',
          image_url: null
        }

  getSignUpSchema = () =>
    Yup.object().shape({
      name: Yup.string().required(i18n('FORM_VALIDATIONS').NAME_REQUIRED),
      image_url: Yup.object()
        .nullable()
        .required(i18n('FORM_VALIDATIONS').IMAGE_REQUIRED)
    })

  handleSubmit = async formData => {
    const { submitBrand } = this.props
    const formattedSubmitData = this.formatSubmitFormData(formData)
    await submitBrand(formattedSubmitData)
    this.handleError()
  }

  handleEdit = async formData => {
    const { brand, editBrand } = this.props
    const formattedEditData = this.formatEditFormData(formData)
    await editBrand(brand.id, formattedEditData)
    this.handleError()
  }

  formatEditFormData = ({ name, image_url }) =>
    !image_url.base64Value || !image_url.extension
      ? { name }
      : this.formatSubmitFormData({ name, image_url })

  formatSubmitFormData = ({ name, image_url }) => ({
    name,
    image_base64: image_url.base64Value,
    image_extension: image_url.extension
  })

  handleError = () => {
    if (!this.props.brands.error) {
      this.props.onClose(true)
    }
  }

  render() {
    return (
      <Modal>
        <Formik
          initialValues={this.getInitialValues()}
          validateOnChange={false}
          validationSchema={this.getSignUpSchema()}
          onSubmit={this.props.brand ? this.handleEdit : this.handleSubmit}
          render={this.getFormContent}
        />
      </Modal>
    )
  }
}

const mapStateToProps = ({ brands }) => ({ brands })

const mapDispatchToProps = dispatch => bindActionCreators({ submitBrand, editBrand }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BrandForm)
