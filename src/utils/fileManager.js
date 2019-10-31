export const readFile = event => {
  return new Promise((resolve, reject) => {
    const inputFile = event.target.files[0]
    let temporaryFileReader = new FileReader()
    temporaryFileReader.onloadend = () => {
      resolve({
        extension: getFileExtension(inputFile),
        url: temporaryFileReader.result,
        base64Value: getBase64Value(temporaryFileReader.result)
      })
    }
    temporaryFileReader.onerror = () => {
      reject()
    }
    if (inputFile) temporaryFileReader.readAsDataURL(inputFile)
  })
}

export const getFileExtension = file =>
  file.name
    .split('.')
    .pop()
    .toLowerCase()

export const getBase64Value = file => file.replace(/^data:image\/[a-z]+;base64,/, '')

/**
 * @param {File} image - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 */
export const getCroppedImg = async (imageSrc, pixelCrop) => {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext('2d')

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  // As Base64 string
  return canvas.toDataURL('image/png')
}

const createImage = url =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', error => reject(error))
    image.src = url
  })
