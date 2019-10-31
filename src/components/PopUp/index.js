import React from 'react'
import Modal from 'components/Modal'
import CrossIcon from 'assets/icons/cross.png'
import styled from 'styled-components'

export const Container = styled.form`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 100px;
  background-color: ${({ theme }) => theme.colors.white};
  transition: all 0.2s ease;
  border-radius: 4px;
`

export const CrossImage = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 25px;
  right: 30px;
  cursor: pointer;
`

const PopUp = ({ children, onClose }) => (
  <Modal>
    <Container>
      <CrossImage onClick={onClose} src={CrossIcon} />
      {children}
    </Container>
  </Modal>
)

export default PopUp
