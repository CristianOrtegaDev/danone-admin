import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { withRouter } from 'react-router'
import { auth } from 'actions/auth'
import { SuccessButton } from 'components/Button'
import Page from 'components/Page'
import theme from 'config/theme'
import DanoneLogo from 'assets/icons/danone_logo.png'
import { FormContainer, Row, Column, ErrorLabel } from 'components/Form'
import Input from 'components/Input'
import i18n from 'services/i18n'
import { capitalizeFirstLetter } from 'utils/strings'
import styled from 'styled-components'
import { specialCharacters, numbers, upperCaseLetters } from 'utils/regex'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Wrapper = styled.div`
  width: 70%;
`

export const HeaderImg = styled.img`
  width: 100px;
  margin-bottom: 30px;
`

class Login extends React.Component {
  getInitialValues = () => ({
    user: '',
    password: ''
  })

  getSignUpSchema = () =>
    Yup.object().shape({
      user: Yup.string().required(i18n('FORM_VALIDATIONS').USER_REQUIRED),
      password: Yup.string()
        .matches(specialCharacters, i18n('FORM_VALIDATIONS').SPECIAL_CHARACTER)
        .matches(numbers, i18n('FORM_VALIDATIONS').NUMBER_REQUIRED)
        .matches(upperCaseLetters, i18n('FORM_VALIDATIONS').UPPER_CASE_REQUIRED)
        .required(i18n('FORM_VALIDATIONS').PASSWORD_REQUIRED)
    })

  handleSubmit = async ({ user, password }) => {
    await this.props.auth(user, password)
    if (!this.props.auth.error) {
      this.props.history.push(`/`)
    }
  }

  getFormContent = ({ handleSubmit, values, setFieldValue, errors }) => (
    <FormContainer onSubmit={handleSubmit}>
      <HeaderImg src={DanoneLogo} />
      <Row>
        <Column>
          <Input
            name={'user'}
            placeholder={i18n('USER')}
            value={values.user}
            disabled={this.props.authReducer.isFetching}
            onChange={({ target: { value } }) => setFieldValue('user', value)}
          />
          {errors.user && <ErrorLabel>{errors.user}</ErrorLabel>}
        </Column>
      </Row>
      <Row>
        <Column>
          <Input
            name={'password'}
            type={'password'}
            placeholder={i18n('PASSWORD')}
            value={values.password}
            disabled={this.props.authReducer.isFetching}
            onChange={({ target: { value } }) => setFieldValue('password', value)}
          />
          {errors.password && <ErrorLabel>{errors.password}</ErrorLabel>}
        </Column>
      </Row>
      <SuccessButton type={'submit'} loading={this.props.authReducer.isFetching}>
        {capitalizeFirstLetter(i18n('LOGIN'))}
      </SuccessButton>
      {this.props.authReducer.error && <ErrorLabel>{this.props.authReducer.error}</ErrorLabel>}
    </FormContainer>
  )

  render() {
    return (
      <Page backgroundColor={theme.colors.blue}>
        <Container>
          <Wrapper>
            <Formik
              initialValues={this.getInitialValues()}
              validateOnChange={false}
              validationSchema={this.getSignUpSchema()}
              onSubmit={this.handleSubmit}
              render={this.getFormContent}
            />
          </Wrapper>
        </Container>
      </Page>
    )
  }
}

const mapStateToProps = ({ auth }) => ({ authReducer: auth })

const mapDispatchToProps = dispatch => bindActionCreators({ auth }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Login))
