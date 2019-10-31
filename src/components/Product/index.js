import React from 'react'
import theme from 'config/theme'
import Icon, { IconNames } from 'components/Icons'
import LazyImage from 'components/LazyImage'
import {
  Container,
  Column,
  Row,
  Name,
  Price,
  AmountWrapper,
  IconWrapper,
  NoImageWrapper
} from './styled'

const Product = ({
  name,
  price,
  total_price,
  image_url,
  editMode,
  onEditClick,
  onDeleteClick,
  onActiveClick,
  active,
  onClick
}) => (
  <Container onClick={!editMode && onClick}>
    <Row>
      {image_url ? (
        <LazyImage src={image_url} />
      ) : (
        <NoImageWrapper>
          <Icon size={50} name={IconNames['ImageOff']} color={theme.colors.blue} />
        </NoImageWrapper>
      )}
      <Column padding={'0px 20px 0px 0px'}>
        <Name withMargin={editMode && price}>{name}</Name>
        {editMode && price && <Price>{`${price} €`}</Price>}
        {editMode && total_price && <Price>{`${total_price} €`}</Price>}
      </Column>
    </Row>
    {!editMode && price && (
      <Column>
        <AmountWrapper>
          <Price>{`${price} €`}</Price>
        </AmountWrapper>
      </Column>
    )}
    {editMode && (
      <Column>
        <IconWrapper margin={10} onClick={onEditClick}>
          <Icon size={20} name={IconNames['Edit']} color={theme.colors.blue} />
        </IconWrapper>
        <IconWrapper onClick={active ? onDeleteClick : onActiveClick}>
          <Icon
            size={20}
            name={IconNames[active ? 'Delete' : 'Plus']}
            color={active ? theme.colors.blue : theme.colors.green}
          />
        </IconWrapper>
      </Column>
    )}
  </Container>
)

export default Product
