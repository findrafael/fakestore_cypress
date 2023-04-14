
it('Deve obter todos os carrinhos', () => {
    cy.buscarCarrinhos().then(res => {
        expect(res.status).to.eq(200);
        expect(res.body).to.be.an('array').that.has.lengthOf.at.least(1);
      
        res.body.forEach(carrinho => {
          expect(carrinho).to.have.property('id').to.be.a('number').that.is.at.least(1);
          expect(carrinho).to.have.property('userId').to.be.a('number').that.is.at.least(1);
      
          expect(carrinho).to.have.property('products').to.be.an('array').that.has.lengthOf.at.least(1);
      
          carrinho.products.forEach(produto => {
            expect(produto).to.have.property('productId').to.be.a('number').that.is.at.least(1);
            expect(produto).to.have.property('quantity').to.be.a('number').that.is.at.least(1);
          });
        });
    })
})

it('Deve obter o carrinho de ID = 2', () => {
    cy.buscarCarrinhos(2).then(res => {
        expect(res.body).to.have.property('id').to.be.a('number').that.is.at.least(1);
        expect(res.body).to.have.property('userId').to.be.a('number').that.is.at.least(1);
    
        expect(res.body).to.have.property('products').to.be.an('array').that.has.lengthOf.at.least(1);
    
        (res.body.products).forEach(produto => {
          expect(produto).to.have.property('productId').to.be.a('number').that.is.at.least(1);
          expect(produto).to.have.property('quantity').to.be.a('number').that.is.at.least(1);
        });
    })
})

it('Deve obter um carrinho aleatório', () => {
    cy.buscarCarrinhoAleatorio().then(res => {
        expect(res.body).to.have.property('id').to.be.a('number').that.is.at.least(1);
        expect(res.body).to.have.property('userId').to.be.a('number').that.is.at.least(1);
    
        expect(res.body).to.have.property('products').to.be.an('array').that.has.lengthOf.at.least(1);
    
        (res.body.products).forEach(produto => {
          expect(produto).to.have.property('productId').to.be.a('number').that.is.at.least(1);
          expect(produto).to.have.property('quantity').to.be.a('number').that.is.at.least(1);
        });
    })
})

it('Deve obter os carrinhos limitando em: 5', () => {

    const limite = 5

    cy.buscarCarrinhoLimitando(limite).then(res => {
        
      // validar o comprimento da lista de produtos
      cy.wrap(res.body).should('have.length', limite);

      // validar cada produto
      cy.wrap(res.body).each((carrinho) => {
        expect(carrinho).to.have.property('id').to.be.a('number').that.is.at.least(1);
        expect(carrinho).to.have.property('userId').to.be.a('number').that.is.at.least(1);
    
        expect(carrinho).to.have.property('products').to.be.an('array').that.has.lengthOf.at.least(1);
    
        carrinho.products.forEach(produto => {
          expect(produto).to.have.property('productId').to.be.a('number').that.is.at.least(1);
          expect(produto).to.have.property('quantity').to.be.a('number').that.is.at.least(1);
      })
    })
})

})