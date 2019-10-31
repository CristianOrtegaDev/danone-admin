import { css } from 'styled-components'

export const breakpoints = {
  mobile: 767,
  tablet: 1023,
  laptop: 1366
}

// Iterate through the sizes and create a media template
const mediaQueries = Object.keys(breakpoints).reduce((accumulator, label) => {
  accumulator[label] = (...args) => css`
    @media (max-width: ${breakpoints[label]}px) {
      ${css(...args)};
    }
  `
  return accumulator
}, {})

export default mediaQueries
