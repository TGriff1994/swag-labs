describe('Checkout zero items', () => {
  
  const usernames = ['standard_user','problem_user','performance_glitch_user']
  usernames.forEach(($type) =>{
  it($type, () => {
    cy.fixture('urlLink').then(urlLink => {
      cy.visit(urlLink.swaglabsLogin)
    })
    
    cy.fixture('login').then(login => {
      cy.get('#user-name').type($type)
      cy.get('#password').type(login.password)
      cy.get('#login-button').click()

      cy.fixture('items').then(items =>{
        cy.get('#inventory_filter_container > div').should('have.text','Products')
        cy.get('#shopping_cart_container').click()
        cy.get('div[class="subheader"]').should('have.text','Your Cart')
        cy.get('a[class="btn_action checkout_button"]').click()
        cy.get('#checkout_info_container').should('not.exist')   
      })
    })
  })    
})
})