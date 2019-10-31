export const getPage = url => {
  const parsedUrl = url.replace('/', '')
  const pages = parsedUrl.split('/')

  return pages ? pages[0] : ''
}
