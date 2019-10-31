import React from 'react'
import Input from 'components/Input'
import InputMask from 'react-input-mask'

const handleBeforeMaskedValueChange = (newState, oldState) => {
  let { value, selection } = newState
  if (value > 100) {
    value = oldState.value
  } else if (value >= 1 && value <= 100) {
    value = `${value}%`
  }
  return { value, selection }
}

const PercentageInput = props => (
  <InputMask {...props} beforeMaskedValueChange={handleBeforeMaskedValueChange}>
    {inputProps => <Input {...inputProps} />}
  </InputMask>
)

export default PercentageInput
