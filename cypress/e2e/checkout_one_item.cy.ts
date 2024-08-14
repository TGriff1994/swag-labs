describe('Checkout one item', () => {
  
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
        cy.get('div[class="inventory_item"]:nth-child(1) div[class="inventory_item_name"]').should('have.text',items.backpack.name)
        const item_add = cy.get('div[class="inventory_item"]:nth-child(1) button')
        item_add.should('have.text',items.cart)
        item_add.click()
        item_add.should('have.text',items.added)
        cy.get('span[class="fa-layers-counter shopping_cart_badge"]').should('have.text','1')
        cy.get('#shopping_cart_container').click()

        cy.get('div[class="subheader"]').should('have.text','Your Cart')
        cy.get('div[class="inventory_item_name"]').should('have.text',items.backpack.name)
        cy.get('div[class="inventory_item_price"]').should('have.text',items.backpack.price)
        cy.get('a[class="btn_action checkout_button"]').click()
    
        cy.get('div[class="subheader"]').should('have.text','Checkout: Your Information')
        cy.get('#first-name').type('test')
        cy.get('#last-name').type('user')
        cy.get('#postal-code').type('BS3 3NA')
        cy.get('input[class="btn_primary cart_button"]').click()

        cy.get('div[class="subheader"]').should('have.text','Checkout: Overview')
        cy.get('div[class="inventory_item_name"]').should('have.text',items.backpack.name)
        cy.get('div[class="inventory_item_price"]').should('have.text','$'+items.backpack.price)

        cy.get('div[class="summary_subtotal_label"]').should('have.text','Item total: $'+items.backpack.price)
        var price_no = Number(items.backpack.price)
        var tax = price_no *0.08
        var tax_no = tax.toFixed(2)
        var total = Number(tax_no)+ Number(price_no)
    
        cy.get('div[class="summary_tax_label"]').should('have.text','Tax: $'+ tax_no.toString())
        cy.get('div[class="summary_total_label"]').should('have.text','Total: $'+ total.toString())
        cy.get('a[class= "btn_action cart_button"]').click()

        cy.get('div[class="subheader"]').should('have.text','Finish')
        cy.get('h2[class="complete-header"]').should('have.text','THANK YOU FOR YOUR ORDER')
        cy.get('div[class="complete-text"]').should('contain.text','Your order has been dispatched, and will arrive just as fast as the pony can get\u000A                there!')   
      })
    })
  })    
})
})