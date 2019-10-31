import React from 'react'
import Cropper from 'react-easy-crop'
import Slider from '@material-ui/lab/Slider'
import i18n from 'services/i18n'
import { capitalizeFirstLetter } from 'utils/strings'
import { SuccessButton, CancelButton } from 'components/Button'
import { getBase64Value, getCroppedImg } from 'utils/fileManager'
import { CropContainer, CropWrapper, ConfigContainer, SliderWrapper, ButtonWrapper } from './styled'

class ImageCropper extends React.Component {
  state = {
    crop: { x: 0, y: 0 },
    zoom: 1,
    aspect: 4 / 4,
    croppedAreaPixels: null,
    croppedImage: null
  }

  onCropChange = crop => {
    this.setState({ crop })
  }

  onCropComplete = (croppedArea, croppedAreaPixels) => {
    this.setState({ croppedAreaPixels })
  }

  onZoomChange = zoom => {
    this.setState({ zoom })
  }

  handleCrop = async () => {
    const url = await getCroppedImg(this.props.img, this.state.croppedAreaPixels)
    const base64Value = getBase64Value(url)
    this.props.onCrop({ url, base64Value, extension: 'png' })
  }

  render() {
    return (
      <CropContainer>
        <CropWrapper>
          <Cropper
            image={this.props.img}
            crop={this.state.crop}
            zoom={this.state.zoom}
            aspect={this.state.aspect}
            onCropChange={this.onCropChange}
            onCropComplete={this.onCropComplete}
            onZoomChange={this.onZoomChange}
          />
        </CropWrapper>
        <ConfigContainer>
          <SliderWrapper>
            <Slider
              value={this.state.zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e, zoom) => this.onZoomChange(zoom)}
              classes={{ container: 'slider' }}
            />
          </SliderWrapper>
          <ButtonWrapper>
            <CancelButton onClick={this.props.onCancel} type={'button'} small>
              {capitalizeFirstLetter(i18n('CANCEL'))}
            </CancelButton>
          </ButtonWrapper>
          <ButtonWrapper>
            <SuccessButton onClick={this.handleCrop} type={'button'} small>
              {capitalizeFirstLetter(i18n('CROP'))}
            </SuccessButton>
          </ButtonWrapper>
        </ConfigContainer>
      </CropContainer>
    )
  }
}

export default ImageCropper
