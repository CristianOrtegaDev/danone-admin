import React from 'react'
import { SuccessButton, CancelButton } from 'components/Button'
import PopUp from 'components/PopUp'
import { Row, Title, SubTitle } from 'components/Form'
import { capitalizeFirstLetter } from 'utils/strings'
import i18n from 'services/i18n'
import styled from 'styled-components'

export const ButtonWrapper = styled.div`
  margin-right: 15px;
`

class DeleteRecomendationForm extends React.Component {
  getFormTitle = () =>
    `${capitalizeFirstLetter(i18n('DELETE'))} ${i18n('PRODUCT')} ${i18n('RECOMMENDED')}`

  getFormSubTitle = () =>
    i18n('RECOMMENDATION_INTERACTION')(i18n('DELETE'), this.props.recommendation.product.name)

  render() {
    return (
      <PopUp onClose={this.props.onClose}>
        <Row justify={'center'} margin={'0px 0px 10px 0px'}>
          <Title>{this.getFormTitle()}</Title>
        </Row>
        <Row justify={'center'} margin={'0px 0px 20px 0px'}>
          <SubTitle>{this.getFormSubTitle()}</SubTitle>
        </Row>
        <Row justify={'center'}>
          <ButtonWrapper>
            <SuccessButton
              type={'button'}
              onClick={this.props.onDelete}
              loading={this.props.loading}
            >
              {capitalizeFirstLetter(i18n('ACCEPT'))}
            </SuccessButton>
          </ButtonWrapper>
          <CancelButton type={'button'} onClick={this.props.onCancel}>
            {capitalizeFirstLetter(i18n('CANCEL'))}
          </CancelButton>
        </Row>
      </PopUp>
    )
  }
}

export default DeleteRecomendationForm
