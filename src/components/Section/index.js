import React from 'react'
import { connect } from 'react-redux'
import LeftArrow from 'assets/icons/arrow_left.png'
import Button from 'components/Button'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Container, Wrapper, SectionTitle, Row, BackButton, StyledImg } from './styled'

const Section = ({ title, children, btnContent, onBtnClick, onBack, browser }) => (
  <Container>
    <Row>
      <Row>
        {onBack && (
          <BackButton onClick={onBack}>
            <StyledImg src={LeftArrow} />
          </BackButton>
        )}
        {title && <SectionTitle>{title}</SectionTitle>}
      </Row>
      {btnContent && (
        <Button onClick={onBtnClick} small={browser.lessThan.widescreen}>
          {btnContent}
        </Button>
      )}
    </Row>
    <Wrapper>{children}</Wrapper>
    <ToastContainer
      style={{
        minWidth: 600
      }}
      closeButton={false}
      position={toast.POSITION.BOTTOM_CENTER}
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      draggable={false}
      pauseOnHover
      className={'toast'}
      bodyClassName={'toastBody'}
    />
  </Container>
)

const mapStateToProps = ({ browser }) => ({
  browser
})

export default connect(
  mapStateToProps,
  null
)(Section)
