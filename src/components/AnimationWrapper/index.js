import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`

const AnimationWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  animation: ${fadeIn} 0.4s forwards 1 ease-in-out;
`

export default AnimationWrapper
