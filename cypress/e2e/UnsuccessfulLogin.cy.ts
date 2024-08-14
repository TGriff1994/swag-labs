describe('Login with wrong username & password', () => {
  beforeEach('Load data to fixture', () => {
    cy.fixture('urlLink').then(urlLink => {
      cy.visit(urlLink.swaglabsLogin)
      cy.get('#user-name').should('have.attr','data-test','username')
      cy.get('#password').should('have.attr','data-test','password')
      cy.get('#login-button').should('have.value','LOGIN')
    })
  })
  
  const usernames = ['standard_user','problem_user','performance_glitch_user','locked_out_user']
    usernames.forEach(($type) =>{
    it('Wrong password using '+$type, () => {
      const username_input = cy.get('#user-name')
      const password_input = cy.get('#password')
      const login_btn = cy.get('#login-button')
      
      username_input.type($type)
      username_input.should('have.value',$type)
      password_input.type('password123')
      password_input.should('have.value','password123')
      login_btn.click()
      cy.fixture('login').then(login => {
        cy.get('h3').should('have.text',login.error.do_not_match)
      })
    })    
  })

  it('wrong username', () => {
    cy.fixture('login').then(login =>{
      const username_input = cy.get('#user-name')
      const password_input = cy.get('#password')
      const login_btn = cy.get('#login-button')
      
      username_input.type('username')
      username_input.should('have.value','username')
      password_input.type(login.password)
      password_input.should('have.value',login.password)
      login_btn.click()
      cy.get('h3').should('have.text',login.error.do_not_match)
    })
  })
})