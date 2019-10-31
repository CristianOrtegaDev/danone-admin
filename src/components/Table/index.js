import React from 'react'
import ReactTable from 'react-table'
import mediaQueries from 'config/media-queries'
import Pagination from './Pagination'
import styled from 'styled-components'

const TableWrapper = styled.div`
  .ReactTable {
    max-height: 550px;
    width: 100% !important;
  }

  .rt-table {
    display: flex;
    width: 100% !important;
    min-width: auto !important;
    flex-direction: column;
  }

  .rt-tbody {
    border-left: 1px solid ${({ theme }) => theme.colors.mystic};
    border-bottom: 1px solid ${({ theme }) => theme.colors.mystic};

    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      width: 0;
    }

    .rt-tr-group:first-child {
      border-top: none;
      outline: none;
    }

    .rt-tr-group {
      border-top: 1px solid ${({ theme }) => theme.colors.mystic};
      outline: none;
      .-even {
        background: #ecf7e8;
      }

      .-odd {
        background: ${({ theme }) => theme.colors.white};
      }
    }
  }

  .rt-thead {
    border-top: 1px solid ${({ theme }) => theme.colors.mystic};
    border-bottom: 1px solid ${({ theme }) => theme.colors.mystic};
    border-right: 1px solid ${({ theme }) => theme.colors.mystic};
    outline: none;
  }

  .rt-thead,
  .rt-tbody {
    width: 100% !important;
    min-width: auto !important;

    .rt-tr {
      display: flex;
      width: 100% !important;
      min-width: auto !important;
      outline: none;

      .rt-th {
        flex: 1 !important;
        outline: none;
      }

      .rt-th > div {
        height: 100%;
        outline: none;
      }

      .rt-td {
        flex: 1 !important;
        outline: none;
      }
    }
  }

  .-loading {
    display: none;
  }
`

export const HeaderCell = styled.div`
  height: 35px;
  width: auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme, color }) => color || theme.colors.blue};
  border-left: 1px solid ${({ theme }) => theme.colors.mystic};
  outline: none;

  ${mediaQueries.laptop`
    height: 30px;
  `}
`

export const TableCell = styled.div`
  height: 35px;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 10px;
  flex: 1;
  border-right: 1px solid ${({ theme }) => theme.colors.mystic};
  outline: none;

  ${mediaQueries.laptop`
    height: 30px;
    font-size: 14px;
  `}
`

const Table = ({ data, columns, withoutPagination, ...otherProps }) => (
  <TableWrapper>
    <ReactTable
      data={data}
      columns={columns}
      showPagination={!withoutPagination}
      sortable={false}
      minRows={1}
      showPageJump={false}
      showPageSizeOptions={false}
      loading={false}
      PaginationComponent={Pagination}
      {...otherProps}
    />
  </TableWrapper>
)

export default Table
