describe('Funcional Test Login in OrangeHRM', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('/web/index.php/auth/login')
  })

  // Test case for successful login
  it('Sucess Login - Validate redirect and dashboard rendering', () => {
    // Intercept the login request to validate the response
    cy.intercept('POST', '**/auth/validate').as('loginValidate')

    // Recover credentials from the environment variable and perform login using the custom command
    cy.env(['userSuccess']).then(env => {
      const { username, password } = env.userSuccess
      cy.login(username, password)
    })

    // Assert that the login was successful
    cy.wait('@loginValidate').then(interception => {
      // Assert that the response status code is 302 (redirect)
      expect(interception.response.statusCode).to.eq(302)

      // Assert that the redirect location is the dashboard
      expect(interception.response.headers.location).to.include('/dashboard')
    })

    // Assert that the dashboard is rendered
    cy.get('.oxd-topbar-header-title').should('have.text', 'Dashboard')
  })

  // Test case for failed login
  it('Failed Login', () => {
    // Intercept the login request to validate the response
    cy.intercept('POST', '**/auth/validate').as('loginValidate')

    // Recover credentials from the environment variable and perform login using the custom command
    cy.env(['userFail']).then(env => {
      const { username, password } = env.userFail
      cy.login(username, password)
    })

    // Assert that the login was successful
    cy.wait('@loginValidate').then(interception => {
      expect(interception.response.statusCode).to.eq(302)

      // Assert that the redirect location is the login
      expect(interception.response.headers.location).to.include('/login')
    })

    // Assert that the error message is displayed
    cy.get('.oxd-alert-content').should('be.visible').and('contain', 'Invalid')
  })
})
