import React from 'react'

import IconNames from './iconNames'
import Icons from './icons'

import { StyledIcon } from './styled'

const Icon = props => {
  if (!props.name || !Icons[props.name]) {
    return null
  }

  const { className, name, color = 'black', size } = props
  const { element, height = 24, width = 24 } = Icons[name]

  return (
    <StyledIcon
      className={className}
      iconColor={color}
      width={size || width}
      height={size || height}
      viewBox={'0 0 ' + width + ' ' + height}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      {element}
    </StyledIcon>
  )
}

export default Icon

export { IconNames, Icons }
