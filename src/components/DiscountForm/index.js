import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Modal from 'components/Modal'
import CalendarInput from 'components/CalendarInput'
import CrossIcon from 'assets/icons/cross.png'
import { submitDiscount } from 'actions/discounts'
import { toISOString } from 'utils/dateParser'
import { SuccessButton } from 'components/Button'
import PercentageInput from 'components/PercentageInput'
import { FormContainer, Row, Column, Title, ErrorLabel, CrossImage } from 'components/Form'
import { capitalizeFirstLetter, removeLastCharacter } from 'utils/strings'
import i18n from 'services/i18n'

class DiscountForm extends React.Component {
  getInitialValues = () => ({
    discount_percentage: '',
    valid_from: '',
    valid_until: ''
  })

  getSignUpSchema = () =>
    Yup.lazy(values => {
      return Yup.object().shape({
        discount_percentage: Yup.number()
          .typeError(i18n('FORM_VALIDATIONS').NUMBER_TYPE)
          .max(100, i18n('FORM_VALIDATIONS').MAX_AMOUNT('100%')),
        valid_from: values.discount_percentage
          ? Yup.date().required('Seleccione fecha de inicio')
          : null,
        valid_until: values.discount_percentage
          ? Yup.date().required('Seleccione fecha de finalizacion')
          : null
      })
    })

  isDateInputDisabled = values =>
    values.discount_percentage === '' || values.discount_percentage === '0'

  getModifiers = (valid_from, valid_until) => ({
    highlighted: {
      from: new Date(valid_from),
      to: new Date(valid_until)
    },
    initial: this.getInitialDate(valid_from),
    final: this.getUntilDate(valid_until)
  })

  getInitialDate = valid_from => (valid_from ? new Date(valid_from) : new Date())

  getUntilDate = valid_until => (valid_until ? new Date(valid_until) : '')

  getFormContent = ({ handleSubmit, values, setFieldValue, errors }) => (
    <FormContainer onSubmit={handleSubmit} align={'flex-start'}>
      <CrossImage onClick={() => this.props.onClose(false)} src={CrossIcon} />
      <Title>{'Nuevo descuento'}</Title>
      <Row align={'flex-start'} margin={'15px 0'}>
        <Column>
          <PercentageInput
            mask={'999'}
            maskChar={''}
            name={'discount_percentage'}
            placeholder={capitalizeFirstLetter(`${i18n('DISCOUNT')} %`)}
            value={values.discount_percentage}
            onChange={({ target: { value } }) =>
              setFieldValue('discount_percentage', removeLastCharacter(value))
            }
          />
        </Column>
        <Column margin={'0 0 0 10px'}>
          <CalendarInput
            name={'valid_from'}
            value={values.valid_from}
            placeholder={'Inicio Descuento'}
            disabled={this.isDateInputDisabled(values)}
            onChange={date => setFieldValue('valid_from', date)}
            dayPickerProps={{
              disabledDays: {
                before: new Date(),
                after: values.valid_until ? new Date(values.valid_until) : ''
              },
              modifiers: this.getModifiers(values.valid_from, values.valid_until)
            }}
          />
          {errors.valid_from && <ErrorLabel>{errors.valid_from}</ErrorLabel>}
        </Column>
        <Column margin={'0 0 0 10px'}>
          <CalendarInput
            name={'valid_until'}
            value={values.valid_until}
            placeholder={'Fin Descuento'}
            disabled={this.isDateInputDisabled(values)}
            onChange={date => setFieldValue('valid_until', date)}
            dayPickerProps={{
              disabledDays: {
                before: this.getInitialDate(values.valid_from)
              },
              modifiers: this.getModifiers(values.valid_from, values.valid_until)
            }}
          />
          {errors.valid_until && <ErrorLabel>{errors.valid_until}</ErrorLabel>}
        </Column>
      </Row>
      <Row justify={'center'}>
        <SuccessButton type={'submit'} loading={this.props.discounts.isSubmitting}>
          {capitalizeFirstLetter(this.props.product ? i18n('EDIT') : i18n('CREATE'))}
        </SuccessButton>
      </Row>
      {this.props.discounts.error && <ErrorLabel>{this.props.discounts.error}</ErrorLabel>}
    </FormContainer>
  )

  handleSubmit = async formData => {
    const discount = this.formatData(formData)
    await this.props.submitDiscount(discount)
    if (!this.props.discounts.error) {
      this.props.onClose(true)
    }
  }

  formatData = rawFormData => ({
    product_id: this.props.selectedResource.id,
    discount_percentage: rawFormData.discount_percentage,
    valid_from: toISOString(rawFormData.valid_from),
    valid_until: toISOString(rawFormData.valid_until)
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

const mapStateToProps = ({ discounts, selectedResource }) => ({
  discounts,
  selectedResource
})

const mapDispatchToProps = dispatch => bindActionCreators({ submitDiscount }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscountForm)
