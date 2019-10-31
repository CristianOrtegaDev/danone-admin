import mediaQueries, { breakpoints } from 'config/media-queries'

describe('Testing media-queries module', () => {
  it('returns the defined breakpoints', () => {
    expect(Object.keys(breakpoints)).toHaveLength(3)
  })
  const mediaRegex = /media/
  it('returns the mobile breakpoint', () => {
    const tablet = `${mediaQueries.mobile`justify-content: flex-end;`}`
    expect(tablet).toMatch(mediaRegex)
    expect(tablet).toMatch(/767/)
  })
  it('returns the tablet breakpoint', () => {
    const tablet = `${mediaQueries.tablet`justify-content: flex-end;`}`
    expect(tablet).toMatch(mediaRegex)
    expect(tablet).toMatch(/1023/)
  })
  it('returns the laptop breakpoint', () => {
    const tablet = `${mediaQueries.laptop`justify-content: flex-end;`}`
    expect(tablet).toMatch(mediaRegex)
    expect(tablet).toMatch(/1366/)
  })
})
