import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Page, { ContentContainer, ContentWrapper, ListWrapper, DetailWrapper } from 'components/Page'
import { setSelectedResource, resetSelectedResource } from 'actions/selectedResource'
import { fetchAdministrators } from 'actions/administrators'
import { fetchInactiveAdministrators } from 'actions/inactiveAdministrators'
import ResourceList from 'components/ResourceList'
import StyledTabs from 'components/StyledTabs'
import PageLoader from 'components/PageLoader'
import AdminForm from 'components/AdminForm'
import PageEmpty from 'components/PageEmpty'
import Section from 'components/Section'
import i18n from 'services/i18n'
import Administrator from 'components/Administrator'
import AdministratorDetail from 'components/AdministratorDetail'

class Admins extends React.Component {
  state = {
    active: 0,
    isAdminFormActive: false
  }

  componentDidMount = () => {
    this.fetchInitialData()
  }

  fetchInitialData = () => {
    this.props.fetchAdministrators()
    this.props.fetchInactiveAdministrators()
  }

  componentWillUnmount = () => this.props.resetSelectedResource()

  isActiveEnabled = () => this.state.active === 0

  toggleAdminForm = reset => {
    this.setState({ isAdminFormActive: !this.state.isAdminFormActive })
    if (reset) {
      this.fetchInitialData()
    }
  }

  isLoading = () => this.props.administrators.isFetching && !this.isContentAvaiable()

  isContentAvaiable = () =>
    this.props.administrators.values.length || this.props.inactiveAdministrators.values.length

  renderAdministrators = administrators =>
    administrators.map((admin, i) => (
      <Administrator
        key={i}
        selected={this.props.selectedResource && this.props.selectedResource.id === admin.id}
        onClick={() => this.props.setSelectedResource(admin)}
        {...admin}
      />
    ))

  checkPageContent = () =>
    this.isContentAvaiable() ? (
      <ContentWrapper>
        <ListWrapper>
          <ResourceList
            dataLength={
              this.isActiveEnabled()
                ? this.props.administrators.values.length
                : this.props.inactiveAdministrators.values.length
            }
            fetchMoreContent={this.handleMoreContentFetching}
            noMoreContentMsg={i18n('NO_MORE_ADMINISTRATORS')}
            hasMore={
              this.isActiveEnabled()
                ? this.props.administrators.hasMore
                : this.props.inactiveAdministrators.hasMore
            }
          >
            {this.renderAdministrators(
              this.isActiveEnabled()
                ? this.props.administrators.values
                : this.props.inactiveAdministrators.values
            )}
          </ResourceList>
        </ListWrapper>
        <DetailWrapper>
          <AdministratorDetail
            admin={this.props.selectedResource}
            active={this.isActiveEnabled()}
            onAdminEdit={() => this.fetchInitialData()}
          />
        </DetailWrapper>
      </ContentWrapper>
    ) : (
      <PageEmpty message={i18n('NO_ADMINS_AVAIABLE')} />
    )

  handleTabChange = (event, value) => {
    this.props.resetSelectedResource()
    this.setState({ active: value })
  }

  render() {
    return (
      <Page withHeader>
        <Section
          title={i18n('ADMINISTRATORS')}
          btnContent={i18n('NEW_ADMINISTRATOR')}
          onBtnClick={this.toggleAdminForm}
        >
          <ContentContainer>
            <StyledTabs
              value={this.state.active}
              tabs={[
                {
                  label: i18n('ACTIVE'),
                  value: this.props.administrators.values.length
                },
                {
                  label: i18n('INACTIVE'),
                  value: this.props.inactiveAdministrators.values.length
                }
              ]}
              handleTabChange={this.handleTabChange}
            />
            {this.isLoading() ? <PageLoader /> : this.checkPageContent()}
          </ContentContainer>
        </Section>
        {this.state.isAdminFormActive && <AdminForm onClose={this.toggleAdminForm} />}
      </Page>
    )
  }
}

const mapStateToProps = ({ administrators, inactiveAdministrators, selectedResource }) => ({
  administrators,
  inactiveAdministrators,
  selectedResource
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchAdministrators,
      fetchInactiveAdministrators,
      setSelectedResource,
      resetSelectedResource
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admins)
