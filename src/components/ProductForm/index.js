import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Modal from 'components/Modal'
import FileInput from 'components/FileInput'
import Input from 'components/Input'
import CrossIcon from 'assets/icons/cross.png'
import { SuccessButton } from 'components/Button'
import Checkbox from 'components/Checkbox'
import TextArea from 'components/TextArea'
import { submitProduct, editProduct } from 'actions/products'
import i18n from 'services/i18n'
import { capitalizeFirstLetter } from 'utils/strings'
import { FormContainer, Row, Column, ErrorLabel, CrossImage, InputLabel } from 'components/Form'

class ProductForm extends React.Component {
  getInitialValues = () =>
    this.isEditMode()
      ? this.formatInitialEditValues(this.props.product)
      : {
          name: '',
          image_url: '',
          initial_price: '',
          inno: false,
          sr: false,
          sales_ranking: '',
          sku: '',
          ean: null,
          otg: false,
          description: ''
        }

  formatInitialEditValues = ({
    name,
    image_url,
    price,
    inno,
    sr,
    sales_ranking,
    sku,
    ean,
    otg,
    description
  }) => ({
    name,
    inno,
    sr,
    sales_ranking,
    sku,
    ean,
    otg,
    image_url: { url: image_url },
    initial_price: price,
    description: description
  })

  getSignUpSchema = () =>
    Yup.lazy(() => {
      return Yup.object().shape({
        name: Yup.string().required(i18n('FORM_VALIDATIONS').NAME_REQUIRED),
        image_url: Yup.string().required(i18n('FORM_VALIDATIONS').IMAGE_REQUIRED),
        initial_price: Yup.number()
          .typeError(i18n('FORM_VALIDATIONS').NUMBER_TYPE)
          .positive(i18n('FORM_VALIDATIONS').POSITIVE_NUMBER)
          .required(i18n('FORM_VALIDATIONS').PRICE_REQUIRED),
        ean: Yup.number()
          .typeError(i18n('FORM_VALIDATIONS').EAN_LENGTH)
          .lessThan(1000000000000, i18n('FORM_VALIDATIONS').EAN_LENGTH)
          .moreThan(100000000000, i18n('FORM_VALIDATIONS').EAN_LENGTH)
          .required(i18n('FORM_VALIDATIONS').EAN_REQUIRED)
      })
    })

  getFormContent = ({ handleSubmit, values, setFieldValue, errors }) => (
    <FormContainer onSubmit={handleSubmit} align={'flex-start'}>
      <CrossImage onClick={() => this.props.onClose(false)} src={CrossIcon} />
      <Row>
        <Column>
          <InputLabel>{`${capitalizeFirstLetter(
            this.props.product ? i18n('EDIT') : i18n('NEW').MALE
          )} ${i18n('PRODUCT')}`}</InputLabel>
          <Input
            name={'name'}
            placeholder={capitalizeFirstLetter(i18n('NAME'))}
            value={values.name}
            onChange={({ target: { value } }) => setFieldValue('name', value)}
          />
          {errors.name && <ErrorLabel>{errors.name}</ErrorLabel>}
        </Column>
      </Row>
      <Row align={'flex-start'}>
        <Column>
          <Input
            name={'ean'}
            placeholder={capitalizeFirstLetter(i18n('EAN'))}
            value={values.ean}
            onChange={({ target: { value } }) => setFieldValue('ean', value)}
          />
          {errors.ean && <ErrorLabel>{errors.ean}</ErrorLabel>}
        </Column>
        <Column margin={'0 0 0 10px'}>
          <Input
            name={'sales_ranking'}
            placeholder={capitalizeFirstLetter(i18n('RANKING'))}
            value={values.sales_ranking}
            onChange={({ target: { value } }) => setFieldValue('sales_ranking', value)}
            disabled={!values.sr}
          />
        </Column>
        <Column margin={'0 0 0 10px'}>
          <Checkbox
            name={'sr'}
            checked={values.sr}
            label={i18n('BEST_SELLERS')}
            onChange={event => setFieldValue('sr', event.target.checked)}
          />
        </Column>
      </Row>
      <Row align={'flex-start'}>
        <Column>
          <Input
            name={'sku'}
            placeholder={capitalizeFirstLetter(i18n('SKU'))}
            value={values.sku}
            onChange={({ target: { value } }) => setFieldValue('sku', value)}
          />
        </Column>
        <Column margin={'0 0 0 10px'}>
          <Checkbox
            name={'inno'}
            checked={values.inno}
            label={capitalizeFirstLetter(i18n('INNO'))}
            onChange={event => setFieldValue('inno', event.target.checked)}
          />
          {errors.inno && <ErrorLabel>{errors.inno}</ErrorLabel>}
        </Column>
        <Column margin={'0 0 0 10px'}>
          <Checkbox
            name={'otg'}
            checked={values.otg}
            label={i18n('OTG')}
            onChange={event => setFieldValue('otg', event.target.checked)}
          />
        </Column>
      </Row>
      <Row width={32.5}>
        <Column>
          <Input
            name={capitalizeFirstLetter(i18n('PRICE'))}
            placeholder={'Precio'}
            value={values.initial_price}
            onChange={({ target: { value } }) => setFieldValue('initial_price', value)}
          />
          {errors.initial_price && <ErrorLabel>{errors.initial_price}</ErrorLabel>}
        </Column>
      </Row>
      <Row>
        <Column width={20}>
          <FileInput
            name={'image_url'}
            value={values.image_url}
            onChange={file => setFieldValue('image_url', file)}
            withImgCrop
          />
          {errors.image_url && <ErrorLabel>{errors.image_url}</ErrorLabel>}
        </Column>
        <TextArea
          name={'description'}
          placeholder={capitalizeFirstLetter(i18n('OBSERVATION'))}
          value={values.description}
          onChange={({ target: { value } }) => setFieldValue('description', value)}
        />
      </Row>
      <Row justify={'center'}>
        <SuccessButton type={'submit'} loading={this.props.products.isSubmitting}>
          {capitalizeFirstLetter(this.props.product ? i18n('EDIT') : i18n('CREATE'))}
        </SuccessButton>
      </Row>
    </FormContainer>
  )

  handleSubmit = async formData => {
    const formattedData = this.formatFormData(this.props.selectedResource.id, formData)
    await this.props.submitProduct(formattedData)
    this.checkError()
  }

  handleEdit = async formData => {
    const formattedData = this.formatFormData(this.props.product.id, formData)
    await this.props.editProduct(formattedData)
    this.checkError()
  }

  checkError = () => {
    if (!this.props.products.error) {
      this.props.onClose(true)
    }
  }

  formatFormData = (id, formData) => {
    let formattedData = {}

    formattedData.image_base64 = formData.image_url.base64Value
    formattedData.image_extension = formData.image_url.extension
    formattedData.name = formData.name
    formattedData.inno = formData.inno
    formattedData.otg = formData.otg

    formattedData.description = formData.description

    formattedData.sr = formData.sr
    if (formData.sr) {
      formattedData.sales_ranking = parseInt(formData.sales_ranking)
    }

    formattedData.sku = formData.sku
    formattedData.ean = formData.ean

    if (!this.isEditMode()) {
      formattedData.brand_id = id
      formattedData.activation_date = null
      formattedData.initial_price = formData.initial_price
    } else {
      formattedData.id = id
      formattedData.price = formData.initial_price
      if (this.props.product.sales_ranking !== formData.sales_ranking) {
        formattedData.should_update_sales_ranking = true
      } else {
        formattedData.should_update_sales_ranking = false
      }
    }

    return formattedData
  }

  isEditMode = () => (this.props.product ? true : false)

  render() {
    return (
      <Modal>
        <Formik
          initialValues={this.getInitialValues()}
          validateOnChange={false}
          validationSchema={this.getSignUpSchema()}
          onSubmit={this.props.product ? this.handleEdit : this.handleSubmit}
          render={this.getFormContent}
        />
      </Modal>
    )
  }
}

const mapStateToProps = ({ products, selectedResource }) => ({
  products,
  selectedResource
})

const mapDispatchToProps = dispatch => bindActionCreators({ submitProduct, editProduct }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductForm)
