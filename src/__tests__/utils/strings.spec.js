import { capitalizeFirstLetter, lowerFirsLetter } from 'utils/strings'

describe('Testing string module', () => {
  it('capitalize strings', () => {
    expect(capitalizeFirstLetter('hello')).toEqual('Hello')
    expect(capitalizeFirstLetter('test')).not.toEqual('test')
  })
  it('lowers first string letter', () => {
    expect(lowerFirsLetter('Hello')).toEqual('hello')
    expect(lowerFirsLetter('Test')).not.toEqual('Test')
  })
})
