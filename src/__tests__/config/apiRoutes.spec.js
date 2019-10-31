describe('Test the apiRoutes module', () => {
  const OLD_ENV = process.env
  beforeEach(() => {
    jest.resetModules() // this is important
    process.env = { ...OLD_ENV }
    delete process.env.NODE_ENV
  })

  afterEach(() => {
    process.env = OLD_ENV
  })

  it('returns the prod url', () => {
    process.env.REACT_APP_ENVIROMENT = 'prod'
    const apiRoutes = require('config/apiRoutes').default
    expect(apiRoutes.BASE_URL).toBe('PROD_URL')
  })

  it('returns the staging url', () => {
    process.env.REACT_APP_ENVIROMENT = 'staging'
    const apiRoutes = require('config/apiRoutes').default
    expect(apiRoutes.BASE_URL).toBe('STAGING_URL')
  })

  it('returns the default dev url', () => {
    const apiRoutes = require('config/apiRoutes').default
    expect(apiRoutes.BASE_URL).toBe('https://jsonplaceholder.typicode.com')
  })
})
