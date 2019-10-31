import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import LazyImage from 'components/LazyImage'
import Icon, { IconNames } from 'components/Icons'
import theme from 'config/theme'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
  padding: 10px 20px;
  margin-bottom: 0.5rem;
  background-color: transparent;
  cursor: move;
  border: 1px solid ${({ theme }) => theme.colors.blue};
  border-radius: 4px;
`

const Wrapper = styled.div`
  width: ${({ width }) => width || 'auto'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: ${({ pointer }) => (pointer ? 'pointer' : 'inherit')};
`

const StyledLabel = styled.div`
  width: ${({ width }) => width || 'auto'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.roboto};
`

const Name = styled(StyledLabel)`
  justify-content: flex-start;
  padding: 0 20px;
`

const Separator = styled.div`
  height: 65%;
  border-right: 2px solid ${({ theme }) => theme.colors.blue};
`

const Card = ({ id, product, recomendation, index, moveCard, onDelete, onDragEnd }) => {
  const ref = useRef(null)

  const [, drop] = useDrop({
    accept: 'card',
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    }
  })

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'card', id, index },
    end: dropResult => {
      onDragEnd(recomendation, dropResult.index)
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  const opacity = isDragging ? 0 : 1

  drag(drop(ref))

  return (
    <Container ref={ref} style={{ opacity }}>
      <StyledLabel width={'10%'}>{index + 1}</StyledLabel>
      <Separator />
      <Wrapper width={'15%'}>
        <LazyImage size={70} src={product.image_url} withOutMargin />
      </Wrapper>
      <Separator />
      <Name width={'40%'}>{product.name}</Name>
      <Separator />
      <StyledLabel width={'20%'}>{`${product.price} €`}</StyledLabel>
      <Separator />
      <Wrapper width={'10%'}>
        <Icon
          name={IconNames.Percent}
          color={product.discount ? theme.colors.blueGreen : theme.colors.red}
          size={20}
        />
      </Wrapper>
      <Wrapper width={'5%'} pointer onClick={() => onDelete(recomendation)}>
        <Icon name={IconNames.Delete} color={theme.colors.red} size={20} />
      </Wrapper>
    </Container>
  )
}
export default Card
