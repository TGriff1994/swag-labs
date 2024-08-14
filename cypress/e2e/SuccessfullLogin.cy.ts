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
    it('Login using '+$type, () => {
      cy.fixture('login').then(login =>{
        const username_input = cy.get('#user-name')
        const password_input = cy.get('#password')
        const login_btn = cy.get('#login-button')
        
        username_input.type($type)
        username_input.should('have.value',$type)
        
        password_input.type(login.password)
        password_input.should('have.value',login.password)
  
        login_btn.click()

        if($type==='locked_out_user'){
          cy.get('h3').should('have.text',login.error.locked)
        }
        else{
          cy.get('#inventory_filter_container > div').should('have.text','Products')
        }
      })
    })    
  })
})