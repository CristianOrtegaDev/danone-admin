import { getPage } from 'utils/url'

describe('', () => {
  it('returns the actual page based on provided url path', () => {
    const urlPath = '/test/item/1'
    expect(getPage(urlPath)).toBe('test')
    expect(getPage(urlPath)).not.toBe('item')
  })
  // it('returns an empty url path', () => {
  //   const urlPath = undefined
  //   expect(getPage(urlPath)).toBe('')
  // })
})
