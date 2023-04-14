const URL_PRODUTOS = '/products'
const URL_CARRINHOS = '/carts'
const URL_USUARIOS = '/users'
const URL_LOGIN = '/auth/login'

import auxiliar from "../support/auxiliar";

// login

Cypress.Commands.add('fazerLogin', (usuario, senha)=>{
    cy.request({
        method: 'POST',
        url: URL_LOGIN,
        failOnStatusCode: false,
        body: {
            username: usuario,
            password: senha
        }
      })
})


// usuarios

Cypress.Commands.add('buscarUsuarios', (limite)=>{
    
    if(!limite){
        cy.request(URL_USUARIOS)
    } else {
        cy.request(URL_USUARIOS + '?limit=' + limite)
    }
    
})

Cypress.Commands.add('buscarUsuarioAleatorio', ()=>{
    
    cy.buscarUsuarios().then(res => {
        let tamanho = (res.body).length
        let numerorandom = Math.floor(Math.random() * tamanho)
        let idUserRandom = res.body[numerorandom].id

        cy.request(URL_USUARIOS+'/'+idUserRandom)
    })

})

Cypress.Commands.add('buscarUsuariosOrdem', (ordem) => {
    cy.request(URL_USUARIOS + '?sort=' + ordem)
})

Cypress.Commands.add('cadastrarUsuario', () => {

    const user = auxiliar.geraUsuario()
    cy.log(user)
    cy.request({
        method: 'POST',
        url: URL_USUARIOS,
        failOnStatusCode: false,
        body: {
            email: user.email,
            username:user.username,
            password:user.password,
            name:{
                firstname: user.name.firstname,
                lastname: user.name.lastname
                },
            address:{
                city: user.address.city,
                street: user.address.street,
                number: user.address.number,
                zipcode: user.address.zipcode,
                geolocation:{
                    lat: user.address.geolocation.lat,
                    long: user.address.geolocation.long
                }
            },
            phone: user.phone
        }
    })

})

Cypress.Commands.add('editarUsuario', (id) => {

    const usernovo = auxiliar.geraUsuario()

    cy.request({
        method: 'PUT',
        url: URL_USUARIOS+'/'+id,
        failOnStatusCode: false,
        body: {
            email: usernovo.email,
            username:usernovo.username,
            password:usernovo.password,
            name:{
                firstname: usernovo.name.firstname,
                lastname: usernovo.name.lastname
                },
            address:{
                city: usernovo.address.city,
                street: usernovo.address.street,
                number: usernovo.address.number,
                zipcode: usernovo.address.zipcode,
                geolocation:{
                    lat: usernovo.address.geolocation.lat,
                    long: usernovo.address.geolocation.long
                }
            },
            phone: usernovo.phone
        }
    })
})

Cypress.Commands.add('deletarUsuario', (id) => {
    cy.request({
        method: 'DELETE',
        url: URL_USUARIOS+'/'+id,
        failOnStatusCode: false
      })
})




// produtos

Cypress.Commands.add('buscarProdutos', ()=>{
    cy.request(URL_PRODUTOS)
})

Cypress.Commands.add('buscarProdutoAleatorio', () => {
    cy.buscarProdutos().then(res => {
        let tamanho = (res.body).length
        let numerorandom = Math.floor(Math.random() * tamanho)
        let idProdutoRandom = res.body[numerorandom].id

        cy.request(URL_PRODUTOS+'/'+idProdutoRandom)
    })
})

Cypress.Commands.add('buscarProdutosLimitando', (num) => {
    cy.request(URL_PRODUTOS + '?limit=' + num)
})

Cypress.Commands.add('buscarProdutosOrdem', (ordem) => {
    cy.request(URL_PRODUTOS + '?sort=' + ordem)
})

Cypress.Commands.add('buscarCategorias', (nomecategoria) => {

    if(!nomecategoria){
        cy.request(URL_PRODUTOS + '/categories')
    } else {
        cy.request(URL_PRODUTOS + '/category' + '/' + nomecategoria)
    }

    


})

Cypress.Commands.add('criarProduto', (nome, preco, descricao, imagem, categoria) => {
    cy.request({
        method: 'POST',
        url: URL_PRODUTOS,
        failOnStatusCode: false,
        body: {
          title: nome,
          price: preco,
          description: descricao,
          image: imagem,
          category: categoria
        }
      })
})

Cypress.Commands.add('editarProduto', (id, nome, preco, descricao, imagem, categoria) => {
    cy.request({
        method: 'PUT',
        url: URL_PRODUTOS+'/'+id,
        failOnStatusCode: false,
        body: {
          title: nome,
          price: preco,
          description: descricao,
          image: imagem,
          category: categoria
        }
      })
})

Cypress.Commands.add('deletarProduto', (id) => {
    cy.request({
        method: 'DELETE',
        url: URL_PRODUTOS+'/'+id,
        failOnStatusCode: false
      })
})






// carrinho

Cypress.Commands.add('buscarCarrinhos', (idcarrinho)=>{
    
    if(!idcarrinho){
        cy.request(URL_CARRINHOS)
    } else {
        cy.request(URL_CARRINHOS+'/'+idcarrinho)
    }
    

})

Cypress.Commands.add('buscarCarrinhoAleatorio', ()=>{

    cy.buscarCarrinhos().then(res => {
        let tamanho = (res.body).length
        let numerorandom = Math.floor(Math.random() * tamanho)
        let idCarrinhoRandom = res.body[numerorandom].id

        cy.request(URL_CARRINHOS+'/'+idCarrinhoRandom)
    })

})

Cypress.Commands.add('buscarCarrinhoLimitando', (limite) => {
    cy.request(URL_CARRINHOS + '?limit=' + limite)
})