import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

const CheckBox = ({ checked, onChange, label, ...otherProps }) => (
  <FormControlLabel
    control={<Checkbox checked={checked} onChange={onChange} color="primary" {...otherProps} />}
    label={label}
  />
)

export default CheckBox
