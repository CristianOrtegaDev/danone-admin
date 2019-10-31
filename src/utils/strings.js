export const capitalizeFirstLetter = string => `${string.charAt(0).toUpperCase()}${string.slice(1)}`

export const lowerFirsLetter = string => `${string.charAt(0).toLowerCase()}${string.slice(1)}`

export const removeLastCharacter = string => string.slice(0, string.length - 1)

export const getUrlExtension = url => url.split('.').pop()
