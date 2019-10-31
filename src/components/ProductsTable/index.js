import React from 'react'
import { connect } from 'react-redux'
import i18n from 'services/i18n'
import { capitalizeFirstLetter } from 'utils/strings'
import Table, { HeaderCell, TableCell } from 'components/Table'

class ProductsTable extends React.Component {
  generateColumns = () => {
    const idColumn = {
      accessor: 'product.sku',
      Header: () => <HeaderCell>{'SKU'}</HeaderCell>,
      width: 75,
      Cell: ({ value }) => <TableCell>{value}</TableCell>
    }
    const nameColumn = {
      accessor: 'product.name',
      Header: () => <HeaderCell>{capitalizeFirstLetter(i18n('NAME'))}</HeaderCell>,
      Cell: ({ value }) => <TableCell>{value}</TableCell>
    }
    const priceColumn = {
      accessor: 'product.price',
      Header: () => <HeaderCell>{i18n('UNIT_PRICE')}</HeaderCell>,
      width: 110,
      Cell: ({ value }) => <TableCell>{`€ ${value}`}</TableCell>
    }
    const amountColumn = {
      accessor: 'amount',
      Header: () => <HeaderCell>{capitalizeFirstLetter(i18n('AMOUNT'))}</HeaderCell>,
      width: 80,
      Cell: ({ value }) => <TableCell>{value}</TableCell>
    }
    const netPriceColumn = {
      accessor: 'netprice',
      Header: () => <HeaderCell>{i18n('NET_PRICE')}</HeaderCell>,
      width: 90,
      Cell: ({ value }) => <TableCell>{`€ ${value}`}</TableCell>
    }
    const totalPriceColumn = {
      accessor: 'total_price',
      Header: () => <HeaderCell>{i18n('TOTAL_PRICE')}</HeaderCell>,
      width: 90,
      Cell: ({ value }) => <TableCell>{`€ ${value}`}</TableCell>
    }
    return this.props.extended
      ? [idColumn, nameColumn, priceColumn, amountColumn, netPriceColumn, totalPriceColumn]
      : [idColumn, nameColumn, priceColumn, amountColumn, totalPriceColumn]
  }

  getPageSize = () => (this.props.browser.lessThan.widescreen ? 5 : 7)

  getPageSizeExtended = () => (this.props.browser.lessThan.widescreen ? 14 : 18)

  render() {
    const { products, extended } = this.props
    const pageSize = extended ? this.getPageSizeExtended() : this.getPageSize()
    return <Table data={products} columns={this.generateColumns()} defaultPageSize={pageSize} />
  }
}

const mapStateToProps = ({ browser }) => ({
  browser
})

export default connect(mapStateToProps)(ProductsTable)
