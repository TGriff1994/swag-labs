describe('Checkout two items', () => {
  
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
        cy.get('div[class="inventory_item"]:nth-child(2) div[class="inventory_item_name"]').should('have.text',items.BikeLight.name)
        const item_1 = cy.get('div[class="inventory_item"]:nth-child(1) button')
        item_1.should('have.text',items.cart)
        item_1.click()
        item_1.should('have.text',items.added)
        const item_2 = cy.get('div[class="inventory_item"]:nth-child(2) button')
        item_2.should('have.text',items.cart)
        item_2.click()
        item_2.should('have.text',items.added)
        cy.get('span[class="fa-layers-counter shopping_cart_badge"]').should('have.text','2')
        cy.get('#shopping_cart_container').click()
  
        cy.get('div[class="subheader"]').should('have.text','Your Cart')
        cy.get('#item_4_title_link > div').should('have.text',items.backpack.name)
        cy.get('#cart_contents_container > div > div.cart_list > div:nth-child(3) > div.cart_item_label > div.item_pricebar > div').should('have.text',items.backpack.price)
        cy.get('#item_0_title_link > div').should('have.text',items.BikeLight.name)
        cy.get('#cart_contents_container > div > div.cart_list > div:nth-child(4) > div.cart_item_label > div.item_pricebar > div').should('have.text',items.BikeLight.price)
        cy.get('a[class="btn_action checkout_button"]').click()
        
        cy.get('div[class="subheader"]').should('have.text','Checkout: Your Information')
        cy.get('#first-name').type('test')
        cy.get('#last-name').type('user')
        cy.get('#postal-code').type('BS3 3NA')
        cy.get('input[class="btn_primary cart_button"]').click()
  
        cy.get('div[class="subheader"]').should('have.text','Checkout: Overview')
        cy.get('#item_4_title_link > div').should('have.text',items.backpack.name)
        cy.get('#checkout_summary_container > div > div.cart_list > div:nth-child(3) > div.cart_item_label > div.inventory_item_price').should('have.text','$'+items.backpack.price)
        cy.get('#item_0_title_link > div').should('have.text',items.BikeLight.name)
        cy.get('#checkout_summary_container > div > div.cart_list > div:nth-child(4) > div.cart_item_label > div.inventory_item_price').should('have.text','$'+items.BikeLight.price)
        
        var subtotal_no = Number(items.backpack.price) + Number(items.BikeLight.price)
        cy.get('div[class="summary_subtotal_label"]').should('have.text','Item total: $'+subtotal_no.toString())
        
        var tax = subtotal_no *0.08
        var tax_no = tax.toFixed(2)
        var total = Number(tax_no)+ Number(subtotal_no)
        
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