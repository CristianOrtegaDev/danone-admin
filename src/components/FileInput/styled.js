import styled from 'styled-components'

export const FileInputWrapper = styled.div`
  width: 80px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
`

export const StyledFileInput = styled.input`
  width: 80px;
  height: 80px;
  font-size: 200px;
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0;
  cursor: pointer;
`

export const ImageAttachText = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.blueRibbon};
  font-size: 14px;
  text-decoration: underline;
  cursor: pointer;
  margin-left: 20px;
`

export const AttachedContainer = styled.div`
  width: 80px;
  height: 80px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.transparent};
  pointer-events: none;
`

export const CheckedElement = styled.img`
  position: absolute;
  top: -8px;
  right: -12px;
  border: 2px solid ${({ theme }) => theme.colors.white};
  width: 28px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.white};
`

export const DocumentImg = styled.img`
  width: 100%;
  border-radius: 8px;
`

export const ErrorLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.red};
  font-weight: 500;
  font-size: 12px;
  margin: 2px 0 10px 0;
  cursor: pointer;
`
