import React, { Fragment } from 'react'

import { Container, PaginationButton } from './styled'

export default class Pagination extends React.Component {
  constructor(props) {
    super()

    this.changePage = this.changePage.bind(this)

    this.state = {
      visiblePages: this.getVisiblePages(null, props.pages)
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.pages !== nextProps.pages) {
      this.setState({
        visiblePages: this.getVisiblePages(null, nextProps.pages)
      })
    }

    this.changePage(nextProps.page + 1)
  }

  filterPages = (visiblePages, totalPages) => {
    return visiblePages.filter(page => page <= totalPages)
  }

  getVisiblePages = (page, total) => {
    if (total < 7) {
      return this.filterPages([1, 2, 3, 4, 5, 6], total)
    } else {
      if (page % 5 >= 0 && page > 4 && page + 2 < total) {
        return [1, page - 1, page, page + 1, total]
      } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
        return [1, total - 3, total - 2, total - 1, total]
      } else {
        return [1, 2, 3, 4, 5, total]
      }
    }
  }

  changePage(page) {
    const activePage = this.props.page + 1

    if (page === activePage || !page || this.props.pages === page - 1) {
      return
    }

    const visiblePages = this.getVisiblePages(page, this.props.pages)

    this.setState({
      visiblePages: this.filterPages(visiblePages, this.props.pages)
    })

    this.props.onPageChange(page - 1)
  }

  render() {
    const { visiblePages } = this.state
    const activePage = this.props.page + 1

    return (
      <Container>
        <PaginationButton
          onClick={() => this.changePage(activePage - 1)}
          disabled={activePage === 1}
        >
          {`<`}
        </PaginationButton>
        {visiblePages.map((page, index, array) => (
          <Fragment key={page}>
            {array[index - 1] + 2 < page && `...`}
            <PaginationButton active={activePage === page} onClick={() => this.changePage(page)}>
              {page}
            </PaginationButton>
          </Fragment>
        ))}
        <PaginationButton
          onClick={() => this.changePage(activePage + 1)}
          disabled={activePage === this.props.pages}
        >
          {`>`}
        </PaginationButton>
      </Container>
    )
  }
}

/**
  Pagination logic made in https://codesandbox.io/s/012ywx6mp0
**/
