import React, { Fragment } from 'react'
import NoFile from 'assets/icons/empty-document.png'
import CheckedImg from 'assets/icons/checked.png'
import inputTypes from 'constants/inputTypes'
import { readFile } from 'utils/fileManager'
import ImageCropper from 'components/ImageCropper'
import i18n from 'services/i18n'
import {
  AttachedContainer,
  CheckedElement,
  DocumentImg,
  FileInputWrapper,
  StyledFileInput,
  ErrorLabel
} from './styled'

class FileInput extends React.Component {
  state = {
    attachFile: this.props.value
  }

  componentDidUpdate = prevProps => {
    if (this.props.value !== prevProps.value) this.setState({ attachFile: this.props.value })
  }

  hasAttachedContent = () => this.state.attachFile && this.state.attachFile.url

  fileSelectedHandler = async event => {
    const attachFile = await readFile(event)

    if (this.props.withImgCrop) {
      this.setState({ showImgCropper: true, imgToCrop: attachFile })
    } else {
      this.handleOnChange(attachFile)
    }
  }

  handleOnChange = attachFile => {
    this.setState({ attachFile })
    this.props.onChange && this.props.onChange(attachFile)
  }

  deleteContent = () => {
    this.setState({ attachFile: undefined })
    if (this.props.onChange) this.props.onChange(undefined)
  }

  handleCrop = attachFile => {
    this.handleOnChange(attachFile)
    this.closeCropper()
  }

  handleCancel = () => {
    this.closeCropper()
  }

  closeCropper = () =>
    this.setState({
      showImgCropper: false,
      imgToCrop: undefined
    })

  render() {
    return (
      <Fragment>
        <FileInputWrapper>
          {this.props.onChange && (
            <StyledFileInput type={inputTypes.FILE} title="" onChange={this.fileSelectedHandler} />
          )}
          <AttachedContainer>
            {this.hasAttachedContent() && <CheckedElement src={CheckedImg} />}
            <DocumentImg src={this.hasAttachedContent() ? this.hasAttachedContent() : NoFile} />
          </AttachedContainer>
          {this.hasAttachedContent() && (
            <ErrorLabel onClick={this.deleteContent}>{i18n('DELETE')}</ErrorLabel>
          )}
        </FileInputWrapper>
        {this.state.showImgCropper && (
          <ImageCropper
            img={this.state.imgToCrop.url}
            onCrop={this.handleCrop}
            onCancel={this.handleCancel}
          />
        )}
      </Fragment>
    )
  }
}

export default FileInput
