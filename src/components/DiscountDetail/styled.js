import styled from 'styled-components'

export const DetailWrapper = styled.div`
  height: 100%;
  position: relative;
`

export const TableWrapper = styled.div`
  padding-top: 20px;
  height: 90%;
`

export const LoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const AddBtn = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 5px;
  right: 5px;
  font-size: 45px;
  padding-bottom: 10px;
  background-color: ${({ theme }) => theme.colors.blue};
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`

export const Row = styled.div`
  display: flex;
  margin: 10px 0;
  justify-content: ${({ justify }) => justify || 'flex-start'};
  align-items: center;
`

export const DeleteTitle = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.blue};
  font-size: 26px;
  font-weight: 700;
`

export const DeleteLabel = styled.label`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.black};
  font-size: 18px;
  font-weight: 400;
  margin: 10px 0;
`
