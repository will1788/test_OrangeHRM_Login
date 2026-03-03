const loginData = require('./cypress.env.json')

module.exports = {
  chromeWebSecurity: false,
  allowCypressEnv: false,

  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config.env = {
        ...loginData
      }
      return config
    }
  }
}
