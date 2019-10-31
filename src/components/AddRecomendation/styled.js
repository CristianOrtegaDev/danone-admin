import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`

export const Title = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.blue};
  font-weight: 700;
  font-size: 24px;
  padding-bottom: 15px;
`

export const InputWrapper = styled.div`
  width: 100%;
`

export const Separator = styled.div`
  width: 100%;
  margin: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.blue};
`

export const ListWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 600px;
  overflow-y: auto;
`

export const LoaderWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.transparentBlack};
`

export const EmptySearchWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 600px;
  padding-bottom: 32px;
`

export const ListLoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  padding-bottom: 32px;
`
