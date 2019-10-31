import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Container, IconWrapper, Image } from './styled'
import Icon, { IconNames } from 'components/Icons'
import theme from 'config/theme'

class LazyImage extends React.Component {
  state = {
    loaded: false,
    error: false
  }

  componentDidUpdate = prevProps => {
    if (prevProps.src !== this.props.src) {
      this.setState({ error: false, loaded: false })
    }
  }

  render() {
    return (
      <Container size={this.props.size || 40}>
        {!this.state.error && !this.state.loaded ? <CircularProgress size={20} /> : null}
        {this.state.error && (
          <IconWrapper>
            <Icon size={30} name={IconNames['NoImage']} color={theme.colors.blue} />
          </IconWrapper>
        )}
        <Image
          src={this.props.src}
          size={this.props.size || 40}
          loaded={this.state.loaded}
          onLoad={() => this.setState({ loaded: true })}
          onError={() => this.setState({ error: true })}
          withOutMargin={this.props.withOutMargin}
        />
      </Container>
    )
  }
}

export default LazyImage
