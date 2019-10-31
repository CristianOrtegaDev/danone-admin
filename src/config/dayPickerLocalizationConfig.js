const WEEKDAYS_LONG = {
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  es: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
}

const WEEKDAYS_SHORT = {
  en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  es: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab']
}

const MONTHS = {
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  es: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septembre',
    'Octobre',
    'Noviembre',
    'Diciembre'
  ]
}

const FIRST_DAY = {
  en: 0,
  es: 1 // Use Monday as first day of the week
}

const DEFAULT_LOCALE = 'es'

function formatDay(d, locale = DEFAULT_LOCALE) {
  return `${WEEKDAYS_LONG[locale][d.getDay()]}, ${d.getDate()} ${
    MONTHS[locale][d.getMonth()]
  } ${d.getFullYear()}`
}

function formatMonthTitle(d, locale = DEFAULT_LOCALE) {
  return `${MONTHS[locale][d.getMonth()]} ${d.getFullYear()}`
}

function formatWeekdayShort(i, locale = DEFAULT_LOCALE) {
  return WEEKDAYS_SHORT[locale][i]
}

function formatWeekdayLong(i, locale = DEFAULT_LOCALE) {
  return WEEKDAYS_SHORT[locale][i]
}

function getFirstDayOfWeek(locale = DEFAULT_LOCALE) {
  return FIRST_DAY[locale]
}

export default {
  formatDay,
  formatMonthTitle,
  formatWeekdayShort,
  formatWeekdayLong,
  getFirstDayOfWeek
}
