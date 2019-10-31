import React from 'react'
import DeliveredIcon from 'assets/icons/delivered_order.png'
import PendentIcon from 'assets/icons/pendent_order.png'
import { getFormattedDate } from 'utils/dateParser'
import orderType from 'constants/orderType'
import i18n from 'services/i18n'
import { capitalizeFirstLetter } from 'utils/strings'
import {
  Container,
  Wrapper,
  Icon,
  InfoWrapper,
  DeliverInfoWrapper,
  DeliverLabel,
  DeliverDate,
  Name,
  DeliverPrice
} from './styled'

const isDeliverType = type => type === orderType.DELIVERED

const Order = ({ id, delivery_date, total_price, type, onClick, selected }) => (
  <Container onClick={onClick} selected={selected}>
    <Wrapper>
      <Icon src={isDeliverType(type) ? DeliveredIcon : PendentIcon} />
      <InfoWrapper>
        <DeliverInfoWrapper>
          <DeliverLabel>
            {isDeliverType(type) ? i18n('DELIVERED_AT') : i18n('DELIVER_AT')}
          </DeliverLabel>
          <DeliverDate>{getFormattedDate(delivery_date)}</DeliverDate>
        </DeliverInfoWrapper>
        <Name type={isDeliverType(type)}>{`${capitalizeFirstLetter(i18n('ORDER'))} Nº ${id}`}</Name>
      </InfoWrapper>
      {total_price && <DeliverPrice>{`${total_price} €`}</DeliverPrice>}
    </Wrapper>
  </Container>
)

export default Order
