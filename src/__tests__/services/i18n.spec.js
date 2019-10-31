import i18n from 'services/i18n'

describe('Internationalization module test', () => {
  it('returns the value asociated to the provided key', () => {
    expect(i18n('DANONE')).toBe('Danone')
    expect(i18n()).toBeFalsy()
  })
})
