
it('Deve obter todos os usuários', () => {

    cy.buscarUsuarios().then(res => {

        // Validar o tamanho da lista de usuários
        expect(res.body).to.have.length.above(0);

        // Iterar sobre a lista de usuários e validar cada usuário individualmente
        (res.body).forEach((user) => {
        // Validar que o id do usuário é um número maior ou igual a 1
        expect(user.id).to.be.a('number');
        expect(user.id).to.be.at.least(1);

        // Validar que o email do usuário é uma string válida de email
        expect(user.email).to.be.a('string');
        expect(user.email).to.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/);

        // Validar que o username do usuário é uma string não vazia
        expect(user.username).to.be.a('string');
        expect(user.username).to.have.length.above(0);

        // Validar que o password do usuário é uma string não vazia
        expect(user.password).to.be.a('string');
        expect(user.password).to.have.length.above(0);

        // Validar que o nome do usuário é um objeto com as propriedades firstname e lastname
        expect(user.name).to.be.an('object');
        expect(user.name).to.have.property('firstname');
        expect(user.name.firstname).to.be.a('string');
        expect(user.name.firstname).to.have.length.above(0);
        expect(user.name).to.have.property('lastname');
        expect(user.name.lastname).to.be.a('string');
        expect(user.name.lastname).to.have.length.above(0);

        // Validar que o endereço do usuário é um objeto com as propriedades city, street, number, zipcode e geolocation
        expect(user.address).to.be.an('object');
        expect(user.address).to.have.property('city');
        expect(user.address.city).to.be.a('string');
        expect(user.address.city).to.have.length.above(0);
        expect(user.address).to.have.property('street');
        expect(user.address.street).to.be.a('string');
        expect(user.address.street).to.have.length.above(0);
        expect(user.address).to.have.property('number');
        expect(user.address.number).to.be.a('number');
        expect(user.address.number).to.be.at.least(1);
        expect(user.address).to.have.property('zipcode');
        expect(user.address.zipcode).to.be.a('string');
        expect(user.address.zipcode).to.match(/^\d{5}(?:[-\s]\d{4})?$/);
        expect(user.address).to.have.property('geolocation');
        expect(user.address.geolocation).to.be.an('object');
        expect(user.address.geolocation).to.have.property('lat');
        expect(user.address.geolocation.lat).to.be.a('string');
        expect(user.address.geolocation.lat).to.match(/^[-+]?\d+(\.\d+)?$/);
        expect(user.address.geolocation).to.have.property('long');
        expect(user.address.geolocation.long).to.be.a('string');
        expect(user.address.geolocation.long).to.match(/^[-+]?\d+(\.\d+)?$/);

        // Validar que o telefone do usuário é uma string não vazia
        expect(user.phone).to.be.a('string');
        expect(user.phone).to.have.length.above(0);
        });
    })

})

it('Deve obter um usuário aleatório', () => {

    cy.buscarUsuarioAleatorio().then(res => {

        // validar o id do usuário
        expect(res.body.id).to.be.a('number');
        expect(res.body.id).to.be.at.least(1);

        // validar o email do usuário
        expect(res.body.email).to.be.a('string');
        expect(res.body.email).to.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

        // validar o username do usuário
        expect(res.body.username).to.be.a('string');
        expect(res.body.username).to.have.length.of.at.least(1);

        // validar a senha do usuário
        expect(res.body.password).to.be.a('string');
        expect(res.body.password).to.have.length.of.at.least(1);

        // validar o nome do usuário
        expect(res.body.name).to.be.an('object');
        expect(res.body.name).to.have.keys(['firstname', 'lastname']);
        expect(res.body.name.firstname).to.be.a('string');
        expect(res.body.name.firstname).to.have.length.of.at.least(1);
        expect(res.body.name.lastname).to.be.a('string');
        expect(res.body.name.lastname).to.have.length.of.at.least(1);

        // validar o endereço do usuário
        expect(res.body.address).to.be.an('object');
        expect(res.body.address).to.have.keys(['city', 'street', 'number', 'zipcode', 'geolocation']);
        expect(res.body.address.city).to.be.a('string');
        expect(res.body.address.city).to.have.length.of.at.least(1);
        expect(res.body.address.street).to.be.a('string');
        expect(res.body.address.street).to.have.length.of.at.least(1);
        expect(res.body.address.number).to.be.a('number');
        expect(res.body.address.number).to.be.at.least(1);
        expect(res.body.address.zipcode).to.be.a('string');
        expect(res.body.address.zipcode).to.match(/^\d{5}(?:[-\s]\d{4})?$/);
        expect(res.body.address.geolocation).to.be.an('object');
        expect(res.body.address.geolocation).to.have.keys(['lat', 'long']);
        expect(res.body.address.geolocation.lat).to.be.a('string');
        expect(res.body.address.geolocation.lat).to.match(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/);
        expect(res.body.address.geolocation.long).to.be.a('string');
        expect(res.body.address.geolocation.long).to.match(/^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/);

        // validar o telefone do usuário
        expect(res.body.phone).to.be.a('string');
        expect(res.body.phone).to.match(/^\d{1}-\d{3}-\d{3}-\d{4}$/);

    })

})

it('Deve exibir uma lista de usuários limitados em: 3', () => {

    const limite = 3
    cy.buscarUsuarios(limite).then(res => {
        // validar o comprimento da lista de usuarios
        cy.wrap(res.body).should('have.length', limite);

        // validar cada usuario
        cy.wrap(res.body).each((usuario) => {

        // validar o id do usuário
        expect(usuario.id).to.be.a('number');
        expect(usuario.id).to.be.at.least(1);
        expect(usuario.id).to.be.at.most(limite);

        // validar o email do usuário
        expect(usuario.email).to.be.a('string');
        expect(usuario.email).to.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

        // validar o username do usuário
        expect(usuario.username).to.be.a('string');
        expect(usuario.username).to.have.length.of.at.least(1);

        // validar a senha do usuário
        expect(usuario.password).to.be.a('string');
        expect(usuario.password).to.have.length.of.at.least(1);

        // validar o nome do usuário
        expect(usuario.name).to.be.an('object');
        expect(usuario.name).to.have.keys(['firstname', 'lastname']);
        expect(usuario.name.firstname).to.be.a('string');
        expect(usuario.name.firstname).to.have.length.of.at.least(1);
        expect(usuario.name.lastname).to.be.a('string');
        expect(usuario.name.lastname).to.have.length.of.at.least(1);

        // validar o endereço do usuário
        expect(usuario.address).to.be.an('object');
        expect(usuario.address).to.have.keys(['city', 'street', 'number', 'zipcode', 'geolocation']);
        expect(usuario.address.city).to.be.a('string');
        expect(usuario.address.city).to.have.length.of.at.least(1);
        expect(usuario.address.street).to.be.a('string');
        expect(usuario.address.street).to.have.length.of.at.least(1);
        expect(usuario.address.number).to.be.a('number');
        expect(usuario.address.number).to.be.at.least(1);
        expect(usuario.address.zipcode).to.be.a('string');
        expect(usuario.address.zipcode).to.match(/^\d{5}(?:[-\s]\d{4})?$/);
        expect(usuario.address.geolocation).to.be.an('object');
        expect(usuario.address.geolocation).to.have.keys(['lat', 'long']);
        expect(usuario.address.geolocation.lat).to.be.a('string');
        expect(usuario.address.geolocation.lat).to.match(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/);
        expect(usuario.address.geolocation.long).to.be.a('string');
        expect(usuario.address.geolocation.long).to.match(/^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/);

        // validar o telefone do usuário
        expect(usuario.phone).to.be.a('string');
        expect(usuario.phone).to.match(/^\d{1}-\d{3}-\d{3}-\d{4}$/);
        })
    })
})

it('Deve exibir e ordenar os usuários em ordem: CRESCENTE', () => {

    cy.buscarUsuariosOrdem('asc').then(res => {

        // validar o comprimento da lista de produtos
        cy.wrap(res.body).should('have.length', (res.body).length);

        // ordenar a lista de produtos pelo campo "id"
        const sortedUsers = res.body.sort((a, b) => a.id - b.id);

        // validar cada produto e verificar se eles estão em ordem crescente
        cy.wrap(sortedUsers).each((usuario, index) => {

        // validar o id do usuário
        expect(usuario.id).to.be.a('number');
        expect(usuario.id).to.be.at.least(1);

        // validar o índice do produto
        expect(index).to.equal(usuario.id - 1);

        // validar o email do usuário
        expect(usuario.email).to.be.a('string');
        expect(usuario.email).to.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

        // validar o username do usuário
        expect(usuario.username).to.be.a('string');
        expect(usuario.username).to.have.length.of.at.least(1);

        // validar a senha do usuário
        expect(usuario.password).to.be.a('string');
        expect(usuario.password).to.have.length.of.at.least(1);

        // validar o nome do usuário
        expect(usuario.name).to.be.an('object');
        expect(usuario.name).to.have.keys(['firstname', 'lastname']);
        expect(usuario.name.firstname).to.be.a('string');
        expect(usuario.name.firstname).to.have.length.of.at.least(1);
        expect(usuario.name.lastname).to.be.a('string');
        expect(usuario.name.lastname).to.have.length.of.at.least(1);

        // validar o endereço do usuário
        expect(usuario.address).to.be.an('object');
        expect(usuario.address).to.have.keys(['city', 'street', 'number', 'zipcode', 'geolocation']);
        expect(usuario.address.city).to.be.a('string');
        expect(usuario.address.city).to.have.length.of.at.least(1);
        expect(usuario.address.street).to.be.a('string');
        expect(usuario.address.street).to.have.length.of.at.least(1);
        expect(usuario.address.number).to.be.a('number');
        expect(usuario.address.number).to.be.at.least(1);
        expect(usuario.address.zipcode).to.be.a('string');
        expect(usuario.address.zipcode).to.match(/^\d{5}(?:[-\s]\d{4})?$/);
        expect(usuario.address.geolocation).to.be.an('object');
        expect(usuario.address.geolocation).to.have.keys(['lat', 'long']);
        expect(usuario.address.geolocation.lat).to.be.a('string');
        expect(usuario.address.geolocation.lat).to.match(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/);
        expect(usuario.address.geolocation.long).to.be.a('string');
        expect(usuario.address.geolocation.long).to.match(/^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/);

        // validar o telefone do usuário
        expect(usuario.phone).to.be.a('string');
        expect(usuario.phone).to.match(/^\d{1}-\d{3}-\d{3}-\d{4}$/);
        })
    })
})

it('Deve exibir e ordenar os usuários em ordem: DECRESCENTE', () => {

    cy.buscarUsuariosOrdem('desc').then(res => {
        
        cy.wrap(res.body).should('have.length', res.body.length);

        // ordenar a lista de usuários em ordem decrescente pelo campo "id"
        const sortedUsers = res.body.sort((a, b) => b.id - a.id);
      
        // validar cada usuário e verificar se eles estão em ordem decrescente
        cy.wrap(sortedUsers).each((user, index) => {

          // validar o id do usuário
          expect(user.id).to.be.a('number');
          expect(user.id).to.be.at.least(1);
          expect(user.id).to.be.at.most(res.body.length);
      
          // validar a ordem decrescente dos usuários
          if (index < sortedUsers.length - 1) {
            expect(user.id).to.be.greaterThan(sortedUsers[index + 1].id);
          }
      
          // validar o e-mail do usuário
          expect(user.email).to.be.a('string');
          expect(user.email).to.have.length.of.at.least(1);
          expect(user.email).to.match(/^.+@.+$/);
      
          // validar o nome do usuário
          expect(user.name).to.be.an('object');
          expect(user.name.firstname).to.be.a('string');
          expect(user.name.firstname).to.have.length.of.at.least(1);
          expect(user.name.lastname).to.be.a('string');
          expect(user.name.lastname).to.have.length.of.at.least(1);
      
          // validar o endereço do usuário
          expect(user.address).to.be.an('object');
          expect(user.address.city).to.be.a('string');
          expect(user.address.city).to.have.length.of.at.least(1);
          expect(user.address.street).to.be.a('string');
          expect(user.address.street).to.have.length.of.at.least(1);
          expect(user.address.number).to.be.a('number');
          expect(user.address.zipcode).to.be.a('string');
          expect(user.address.zipcode).to.have.length.of.at.least(1);
          expect(user.address.geolocation).to.be.an('object');
          expect(user.address.geolocation.lat).to.be.a('string');
          expect(user.address.geolocation.lat).to.match(/^[-+]?\d+(\.\d+)?$/);
          expect(user.address.geolocation.long).to.be.a('string');
          expect(user.address.geolocation.long).to.match(/^[-+]?\d+(\.\d+)?$/);
      
          // validar o telefone do usuário
          expect(user.phone).to.be.a('string');
          expect(user.phone).to.match(/^\d{1}-\d{3}-\d{3}-\d{4}$/);
        });
    })

})

it('Deve cadastrar um usuário', () => {
    cy.cadastrarUsuario().then(res => {

        // validar o username do usuário
        expect(res.body.username).to.be.a('string');
        expect(res.body.username).to.have.length.of.at.least(1);

    })
})

it('Deve editar um usuário', () => {

    cy.editarUsuario(3).then(res => {

        // validar o id do usuário
        expect(res.body.id).to.be.a('number');
        expect(res.body.id).to.be.at.least(1);

        // validar o email do usuário
        expect(res.body.email).to.be.a('string');
        expect(res.body.email).to.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

        // validar o username do usuário
        expect(res.body.username).to.be.a('string');
        expect(res.body.username).to.have.length.of.at.least(1);

        // validar a senha do usuário
        expect(res.body.password).to.be.a('string');
        expect(res.body.password).to.have.length.of.at.least(1);

        // validar o nome do usuário
        expect(res.body.name).to.be.an('object');
        expect(res.body.name).to.have.keys(['firstname', 'lastname']);
        expect(res.body.name.firstname).to.be.a('string');
        expect(res.body.name.firstname).to.have.length.of.at.least(1);
        expect(res.body.name.lastname).to.be.a('string');
        expect(res.body.name.lastname).to.have.length.of.at.least(1);

        // validar o endereço do usuário
        expect(res.body.address).to.be.an('object');
        expect(res.body.address).to.have.keys(['city', 'street', 'number', 'zipcode', 'geolocation']);
        expect(res.body.address.city).to.be.a('string');
        expect(res.body.address.city).to.have.length.of.at.least(1);
        expect(res.body.address.street).to.be.a('string');
        expect(res.body.address.street).to.have.length.of.at.least(1);
        expect(res.body.address.number).to.be.a('number');
        expect(res.body.address.number).to.be.at.least(1);
        expect(res.body.address.zipcode).to.be.a('string');
        expect(res.body.address.zipcode).to.match(/^\d{5}(?:[-\s]\d{4})?$/);
        expect(res.body.address.geolocation).to.be.an('object');
        expect(res.body.address.geolocation).to.have.keys(['lat', 'long']);
        expect(res.body.address.geolocation.lat).to.be.a('string');
        expect(res.body.address.geolocation.lat).to.match(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/);
        expect(res.body.address.geolocation.long).to.be.a('string');
        expect(res.body.address.geolocation.long).to.match(/^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/);

        // validar o telefone do usuário
        expect(res.body.phone).to.be.a('string');
        expect(res.body.phone).to.match(/^\d{1}-\d{3}-\d{3}-\d{4}$/);
    })
    
})

it('Deve deletar um usuário', () => {
    cy.deletarUsuario(7).then(res => {
        
        // validar o id do usuário
        expect(res.body.id).to.be.a('number');
        expect(res.body.id).to.be.at.least(1);

        // validar o email do usuário
        expect(res.body.email).to.be.a('string');
        expect(res.body.email).to.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

        // validar o username do usuário
        expect(res.body.username).to.be.a('string');
        expect(res.body.username).to.have.length.of.at.least(1);

        // validar a senha do usuário
        expect(res.body.password).to.be.a('string');
        expect(res.body.password).to.have.length.of.at.least(1);

        // validar o nome do usuário
        expect(res.body.name).to.be.an('object');
        expect(res.body.name).to.have.keys(['firstname', 'lastname']);
        expect(res.body.name.firstname).to.be.a('string');
        expect(res.body.name.firstname).to.have.length.of.at.least(1);
        expect(res.body.name.lastname).to.be.a('string');
        expect(res.body.name.lastname).to.have.length.of.at.least(1);

        // validar o endereço do usuário
        expect(res.body.address).to.be.an('object');
        expect(res.body.address).to.have.keys(['city', 'street', 'number', 'zipcode', 'geolocation']);
        expect(res.body.address.city).to.be.a('string');
        expect(res.body.address.city).to.have.length.of.at.least(1);
        expect(res.body.address.street).to.be.a('string');
        expect(res.body.address.street).to.have.length.of.at.least(1);
        expect(res.body.address.number).to.be.a('number');
        expect(res.body.address.number).to.be.at.least(1);
        expect(res.body.address.zipcode).to.be.a('string');
        expect(res.body.address.zipcode).to.match(/^\d{5}(?:[-\s]\d{4})?$/);
        expect(res.body.address.geolocation).to.be.an('object');
        expect(res.body.address.geolocation).to.have.keys(['lat', 'long']);
        expect(res.body.address.geolocation.lat).to.be.a('string');
        expect(res.body.address.geolocation.lat).to.match(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/);
        expect(res.body.address.geolocation.long).to.be.a('string');
        expect(res.body.address.geolocation.long).to.match(/^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/);

        // validar o telefone do usuário
        expect(res.body.phone).to.be.a('string');
        expect(res.body.phone).to.match(/^\d{1}-\d{3}-\d{3}-\d{4}$/);

    })
})