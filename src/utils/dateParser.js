import dayjs from 'dayjs'
import 'dayjs/locale/es'

dayjs.locale('es')

export const getFormattedDate = date => {
  const guestDate = dayjs(date)
  return `${guestDate.format('DD/MM/YY')}`
}

export const toISOString = date => new Date(date).toISOString()
