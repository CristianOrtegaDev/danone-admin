import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Page, { ContentContainer, ContentWrapper, ListWrapper, DetailWrapper } from 'components/Page'
import { setSelectedResource, resetSelectedResource } from 'actions/selectedResource'
import { fetchClients } from 'actions/clients'
import { fetchInactiveClients } from 'actions/inactiveClients'
import ResourceList from 'components/ResourceList'
import ClientDetail from 'components/ClientDetail'
import ClientForm from 'components/ClientForm'
import PageLoader from 'components/PageLoader'
import StyledTabs from 'components/StyledTabs'
import PageEmpty from 'components/PageEmpty'
import Section from 'components/Section'
import Client from 'components/Client'
import i18n from 'services/i18n'

class Clients extends React.Component {
  state = {
    active: 0,
    isClientFormActive: false,
    clientToEdit: null
  }

  componentDidMount = () => {
    this.fetchInitialData()
  }

  componentWillUnmount = () => this.props.resetSelectedResource()

  fetchInitialData = () => {
    this.props.fetchClients()
    this.props.fetchInactiveClients()
  }

  isActiveEnabled = () => this.state.active === 0

  isLoading = () =>
    (this.props.clients.isFetching || this.props.inactiveClients.isFetching) &&
    !this.isContentAvaiable()

  isContentAvaiable = () =>
    this.props.clients.values.length || this.props.inactiveClients.values.length

  toggleClientForm = reset => {
    this.setState({ isClientFormActive: !this.state.isClientFormActive })
    if (reset) {
      this.fetchInitialData()
    }
  }

  handleTabChange = (event, value) => {
    this.props.resetSelectedResource()
    this.setState({ active: value })
  }

  checkPageContent = () =>
    this.isContentAvaiable() ? (
      this.renderContent()
    ) : (
      <PageEmpty message={i18n('NO_CLIENTS_AVAIABLE')} />
    )

  renderContent = () => (
    <ContentWrapper>
      <ListWrapper>
        <ResourceList
          dataLength={
            this.isActiveEnabled()
              ? this.props.clients.values.length
              : this.props.inactiveClients.values.length
          }
          fetchMoreContent={this.handleMoreContentFetching}
          noMoreContentMsg={i18n('NO_MORE_CLIENTS')}
          hasMore={
            this.isActiveEnabled() ? this.props.clients.hasMore : this.props.inactiveClients.hasMore
          }
        >
          {this.renderClients(
            this.isActiveEnabled() ? this.props.clients.values : this.props.inactiveClients.values
          )}
        </ResourceList>
      </ListWrapper>
      <DetailWrapper>
        <ClientDetail
          client={this.props.selectedResource}
          active={this.isActiveEnabled()}
          onClientEdit={() => this.fetchInitialData()}
          editClient={() => this.setState({ clientToEdit: this.props.selectedResource })}
        />
      </DetailWrapper>
    </ContentWrapper>
  )

  renderClients = clients =>
    clients.map((client, i) => (
      <Client
        key={i}
        selected={this.props.selectedResource && this.props.selectedResource.id === client.id}
        onClick={() => this.props.setSelectedResource(client)}
        {...client}
      />
    ))

  handleEditClose = () => {
    this.setState({ clientToEdit: null, isClientFormActive: false })
    this.props.resetSelectedResource()
    this.fetchInitialData()
  }

  render() {
    return (
      <Page withHeader>
        <Section
          title={i18n('CLIENTS')}
          btnContent={i18n('NEW_CLIENT')}
          onBtnClick={this.toggleClientForm}
        >
          <ContentContainer>
            <StyledTabs
              value={this.state.active}
              tabs={[
                {
                  label: i18n('ACTIVE'),
                  value: this.props.clients.values.length
                },
                {
                  label: i18n('INACTIVE'),
                  value: this.props.inactiveClients.values.length
                }
              ]}
              handleTabChange={this.handleTabChange}
            />
            {this.isLoading() ? <PageLoader /> : this.checkPageContent()}
          </ContentContainer>
        </Section>
        {(this.state.isClientFormActive || this.state.clientToEdit) && (
          <ClientForm onClose={this.handleEditClose} client={this.state.clientToEdit} />
        )}
      </Page>
    )
  }
}

const mapStateToProps = ({ clients, inactiveClients, selectedResource }) => ({
  clients,
  inactiveClients,
  selectedResource
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchClients,
      fetchInactiveClients,
      setSelectedResource,
      resetSelectedResource
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Clients)
