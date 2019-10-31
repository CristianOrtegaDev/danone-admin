import MENU_HEADER_LINKS from 'config/headerMenuLinks'

describe('Testing headerMenuLinks module', () => {
  it('returns the app menu links', () => {
    expect(MENU_HEADER_LINKS).toHaveLength(2)
    expect(MENU_HEADER_LINKS[0].link).toBe('')
    expect(MENU_HEADER_LINKS[1].link).toBe('marcas')
  })
})
