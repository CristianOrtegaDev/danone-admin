import React from 'react'
import Input from 'components/Input'
import dayPickerLocalizationConfig from 'config/dayPickerLocalizationConfig'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import theme from 'config/theme'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;

  .DayPickerInput {
    width: 100%;
  }

  .DayPicker-Day--highlighted {
    background-color: ${theme.colors.blue};
    color: white;
    border-radius: 0;
  }

  .DayPicker-Day--highlighted:hover {
    background-color: ${theme.colors.blue} !important;
    color: white;
  }

  .DayPicker-Day--today {
    color: orange;
  }
`

const CalendarInput = ({ onChange, disabled, dayPickerProps, ...otherProps }) => (
  <Container>
    <DayPickerInput
      dayPickerProps={{
        locale: 'es',
        localeUtils: dayPickerLocalizationConfig,
        modifiersStyles: {
          initial: {
            borderTopLeftRadius: '50%',
            borderBottomLeftRadius: '50%',
            background: `${theme.colors.blue}`
          },
          final: {
            borderTopRightRadius: '50%',
            borderBottomRightRadius: '50%',
            background: `${theme.colors.blue}`
          }
        },
        ...dayPickerProps
      }}
      component={props => <Input disabled={disabled} {...props} />}
      onDayChange={onChange}
      {...otherProps}
    />
  </Container>
)

export default CalendarInput
