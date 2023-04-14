
it('Deve fazer login com um usuário aleatório', () => {

    cy.buscarUsuarioAleatorio().then(res => {
        cy.fazerLogin(res.body.username, res.body.password).then(res => {
            expect(res.status).to.be.equals(200)
            expect(res.body).to.have.property('token').to.be.a('string');
            expect(res.body.token).to.have.length.of.at.least(1);
        })
    })

})