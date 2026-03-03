describe('Funcional Test Login in OrangeHRM', () => {
  beforeEach(() => {
    // Load the fixture data and visit the login page before each test
    cy.visit('/web/index.php/auth/login')
  })
  //it('Test Login', () => {
  //cy.get('[name="username"]').type('Admin')
  //cy.get('[name="password"]').type('admin123')
  //})
  it('Sucess Login with wait', () => {
    // Intercept the login validation request to assert on it later
    cy.intercept('POST', '**/auth/validate').as('loginValidate')
    // Use the custom command to perform login with credentials from the environment variable
    cy.env(['userSuccess']).then(env => {
      const { username, password } = env.userSuccess
      cy.login(username, password)
    })

    // Assert that the login was successful
    cy.wait('@loginValidate').then(interception => {
      expect(interception.response.statusCode).to.eq(302)
      // Assert that the response contains a redirect to the dashboard
      expect(interception.response.headers.location).to.include('/dashboard')
    })

    cy.get('.oxd-topbar-header-title').should('have.text', 'Dashboard')
  })
  it('Failed Login', () => {
    cy.intercept('POST', '**/auth/validate').as('loginValidate')
    // Use the custom command to perform login with credentials from the environment variable
    cy.env(['userFail']).then(env => {
      const { username, password } = env.userFail
      cy.login(username, password)
    })

    // Assert that the login was successful
    cy.wait('@loginValidate').then(interception => {
      expect(interception.response.statusCode).to.eq(302)

      expect(interception.response.headers.location).to.include('/login')
    })
    cy.get('.oxd-alert-content').should('be.visible').and('contain', 'Invalid')
  })
})
