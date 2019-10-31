import styled from 'styled-components'

export const CropContainer = styled.div`
  width: 600px;
  left: 0;
  padding: 20px 20px 0 20px;
  border-radius: 4px;
  position: absolute;
  border: 1px solid ${({ theme }) => theme.colors.blue};
  background-color: ${({ theme }) => theme.colors.white};
`

export const CropWrapper = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
`

export const ConfigContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`

export const SliderWrapper = styled.div`
  margin: auto;
  width: 50%;
  height: 80px;
  display: flex;
  align-items: center;
`

export const ButtonWrapper = styled.div`
  margin-right: 15px;
`
