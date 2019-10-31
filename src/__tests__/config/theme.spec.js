import theme from 'config/theme'

describe('Testing theme module', () => {
  it('test the content of the theme', () => {
    expect(Object.keys(theme)).toHaveLength(2)
    expect(Object.keys(theme)[0]).toBe('colors')
    expect(Object.keys(theme)[1]).toBe('fonts')
  })
  it('checks that colors has the correct formatt', () => {
    Object.values(theme.colors).forEach(color => {
      expect(color).toMatch(/^#|^r/)
    })
  })
})
