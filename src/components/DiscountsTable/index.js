import React from 'react'
import { connect } from 'react-redux'
import Table, { HeaderCell, TableCell } from 'components/Table'
import Icon, { IconNames } from 'components/Icons'
import theme from 'config/theme'
import { getFormattedDate } from 'utils/dateParser'
import i18n from 'services/i18n'
import { IconWrapper, TableContainer, PaginationButton, PaginationContainer } from './styled'

class DiscountsTable extends React.Component {
  generateColumns = () => {
    const idColumn = {
      accessor: 'id',
      Header: () => <HeaderCell>{'ID'}</HeaderCell>,
      width: 75,
      Cell: ({ value }) => <TableCell>{value}</TableCell>
    }
    const validFromColumn = {
      accessor: 'valid_from',
      Header: () => <HeaderCell>{i18n('VALID_FROM')}</HeaderCell>,
      Cell: ({ value }) => <TableCell>{getFormattedDate(value)}</TableCell>
    }
    const validUntilColumn = {
      accessor: 'valid_until',
      Header: () => <HeaderCell>{i18n('VALID_UNTIL')}</HeaderCell>,
      Cell: ({ value }) => <TableCell>{getFormattedDate(value)}</TableCell>
    }
    const percentageColumn = {
      accessor: 'discount_percentage',
      Header: () => <HeaderCell>{i18n('DISCOUNT_PERCENTAGE')}</HeaderCell>,
      Cell: ({ value }) => <TableCell>{`${value}%`}</TableCell>
    }
    const priceColumn = {
      accessor: 'price',
      Header: () => <HeaderCell>{i18n('DISCOUNT_PRICE')}</HeaderCell>,
      Cell: ({ value }) => <TableCell>{`€ ${value}`}</TableCell>
    }

    const deleteColumn = {
      Header: () => <HeaderCell>{''}</HeaderCell>,
      width: 75,
      Cell: data => (
        <TableCell>
          <IconWrapper
            onClick={() => {
              if (this.props.active == 1) {
                this.props.onActivate(data.row)
              } else {
                this.props.onDeactivate(data.row)
              }
            }}
          >
            <Icon
              size={20}
              name={this.props.active == 1 ? IconNames['Percent'] : IconNames['Delete']}
              color={this.props.active == 1 ? theme.colors.green : theme.colors.red}
            />
          </IconWrapper>
        </TableCell>
      )
    }
    return [
      idColumn,
      validFromColumn,
      validUntilColumn,
      percentageColumn,
      priceColumn,
      deleteColumn
    ]
  }

  handlePrev = () => this.props.onPageChange(this.props.actualPage - 1)

  handleNext = () => this.props.onPageChange(this.props.actualPage + 1)

  render() {
    const { discounts, onPageChange, actualPage, hasMore } = this.props
    const pageSize = this.props.browser.lessThan.widescreen ? 19 : 13
    return (
      <TableContainer>
        <Table
          data={discounts}
          columns={this.generateColumns()}
          defaultPageSize={pageSize}
          onPageChange={onPageChange}
          withoutPagination
        />
        <PaginationContainer>
          <PaginationButton disabled={this.props.actualPage === 1} onClick={this.handlePrev}>
            ANTERIOR
          </PaginationButton>
          <div>{actualPage}</div>
          <PaginationButton disabled={!hasMore} onClick={this.handleNext}>
            SIGUIENTE
          </PaginationButton>
        </PaginationContainer>
      </TableContainer>
    )
  }
}

const mapStateToProps = ({ browser }) => ({
  browser
})

export default connect(mapStateToProps)(DiscountsTable)
