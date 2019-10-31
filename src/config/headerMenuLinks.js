import i18n from 'services/i18n'
import { capitalizeFirstLetter } from 'utils/strings'

const MENUHEADER_LINKS = [
  {
    label: capitalizeFirstLetter(i18n('ORDERS')),
    link: ''
  },
  {
    label: capitalizeFirstLetter(i18n('BRANDS')),
    link: i18n('BRANDS')
  },
  {
    label: capitalizeFirstLetter(i18n('RECOMMENDATIONS')),
    link: i18n('RECOMMENDATIONS')
  },
  {
    label: capitalizeFirstLetter(i18n('DISCOUNTS')),
    link: i18n('DISCOUNTS')
  },
  {
    label: capitalizeFirstLetter(i18n('CLIENTS')),
    link: i18n('CLIENTS')
  }
]

export default MENUHEADER_LINKS
