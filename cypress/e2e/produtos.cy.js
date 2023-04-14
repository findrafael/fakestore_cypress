import auxiliar from "../support/auxiliar";


describe('Cliente', () => {

  it('Deve exibir todos os produtos', () => {

    cy.buscarProdutos().then(res => {

      // validar cada produto
      cy.wrap(res.body).each((product) => {

        // validar o id do produto
        expect(product.id).to.be.a('number');
        expect(product.id).to.be.at.least(1);

        // validar o título do produto
        expect(product.title).to.be.a('string');
        expect(product.title).to.have.length.of.at.least(1);

        // validar o preço do produto
        expect(product.price).to.be.a('number');
        expect(product.price).to.match(/^\d+(\.\d{1,2})?$/);

        // validar a categoria do produto
        expect(product.category).to.be.a('string');
        expect(product.category).to.have.length.of.at.least(1);

        // validar a descrição do produto
        expect(product.description).to.be.a('string');
        expect(product.description).to.have.length.of.at.least(1);

        // validar a imagem do produto
        expect(product.image).to.be.a('string');
        expect(product.image).to.match(/^https?:\/\/.+$/);

      });

    })

  })

  it('Deve exibir um único produto', () => {

    cy.buscarProdutoAleatorio().then(res => {

      // validar o conteúdo do produto
      expect(res.body).to.have.property('id').that.is.a('number');
      expect(res.body.id).to.be.at.least(1);

      expect(res.body).to.have.property('title').that.is.a('string');
      expect(res.body.title).to.have.length.of.at.least(1);

      expect(res.body).to.have.property('price').that.is.a('number');
      expect(res.body.price).to.match(/^\d+(\.\d{1,2})?$/);

      expect(res.body).to.have.property('category').that.is.a('string');
      expect(res.body.category).to.have.length.of.at.least(1);

      expect(res.body).to.have.property('description').that.is.a('string');
      expect(res.body.description).to.have.length.of.at.least(1);

      expect(res.body).to.have.property('image').that.is.a('string');
      expect(res.body.image).to.match(/^https?:\/\/.+$/);

    })

  })

  it('Deve exibir uma lista de produtos limitados em: 3', () => {

    const tamanhobusca = 3
    cy.buscarProdutosLimitando(tamanhobusca).then(res => {

      // validar o comprimento da lista de produtos
      cy.wrap(res.body).should('have.length', tamanhobusca);

      // validar cada produto
      cy.wrap(res.body).each((product) => {
        // validar o id do produto
        expect(product.id).to.be.a('number');
        expect(product.id).to.be.at.least(1);
        expect(product.id).to.be.at.most(tamanhobusca);

        // validar o título do produto
        expect(product.title).to.be.a('string');
        expect(product.title).to.have.length.of.at.least(1);

        // validar o preço do produto
        expect(product.price).to.be.a('number');

        // validar a categoria do produto
        expect(product.category).to.be.a('string');
        expect(product.category).to.have.length.of.at.least(1);

        // validar a descrição do produto
        expect(product.description).to.be.a('string');
        expect(product.description).to.have.length.of.at.least(1);

        // validar a imagem do produto
        expect(product.image).to.be.a('string');
        expect(product.image).to.match(/^https?:\/\/.+$/);
      });

    })

  })

  it('Deve exibir e ordenar os produtos em ordem: CRESCENTE', () => {

    cy.buscarProdutosOrdem('asc').then(res => {

      // validar o comprimento da lista de produtos
      cy.wrap(res.body).should('have.length', (res.body).length);

      // ordenar a lista de produtos pelo campo "id"
      const sortedProducts = res.body.sort((a, b) => a.id - b.id);

      // validar cada produto e verificar se eles estão em ordem crescente
      cy.wrap(sortedProducts).each((product, index) => {
        // validar o id do produto
        expect(product.id).to.be.a('number');
        expect(product.id).to.be.at.least(1);
        expect(product.id).to.be.at.most((res.body).length);
        
        // validar o índice do produto
        expect(index).to.equal(product.id - 1);

        // validar o título do produto
        expect(product.title).to.be.a('string');
        expect(product.title).to.have.length.of.at.least(1);

        // validar o preço do produto
        expect(product.price).to.be.a('number');

        // validar a categoria do produto
        expect(product.category).to.be.a('string');
        expect(product.category).to.have.length.of.at.least(1);

        // validar a descrição do produto
        expect(product.description).to.be.a('string');
        expect(product.description).to.have.length.of.at.least(1);

        // validar a imagem do produto
        expect(product.image).to.be.a('string');
        expect(product.image).to.match(/^https?:\/\/.+$/);
      });


    })

  })

  it('Deve exibir e ordenar os produtos em ordem: DECRESCENTE', () => {

    cy.buscarProdutosOrdem('desc').then(res => {

      // validar o comprimento da lista de produtos
      cy.wrap(res.body).should('have.length', (res.body).length);

      // ordenar a lista de produtos em ordem decrescente pelo campo "id"
      const sortedProducts = res.body.sort((a, b) => b.id - a.id);

      // validar cada produto e verificar se eles estão em ordem decrescente
      cy.wrap(sortedProducts).each((product, index) => {
        // validar o id do produto
        expect(product.id).to.be.a('number');
        expect(product.id).to.be.at.least(1);
        expect(product.id).to.be.at.most((res.body).length);
        
        // validar a ordem decrescente dos usuários
        if (index < sortedProducts.length - 1) {
          expect(product.id).to.be.greaterThan(sortedProducts[index + 1].id);
        }

        // validar o título do produto
        expect(product.title).to.be.a('string');
        expect(product.title).to.have.length.of.at.least(1);

        // validar o preço do produto
        expect(product.price).to.be.a('number');

        // validar a categoria do produto
        expect(product.category).to.be.a('string');
        expect(product.category).to.have.length.of.at.least(1);

        // validar a descrição do produto
        expect(product.description).to.be.a('string');
        expect(product.description).to.have.length.of.at.least(1);

        // validar a imagem do produto
        expect(product.image).to.be.a('string');
        expect(product.image).to.match(/^https?:\/\/.+$/);
      });


    })

  })

  it('Deve exibir todas as categorias dos produtos', () => {

    cy.buscarCategorias().then(res => {

      expect(res.body).to.be.an('array');
      cy.wrap(res.body).each((category) => {
        expect(category).to.be.a('string');
        expect(category).to.have.length.of.at.least(1);
      });
      
    })

  })

  it('Dexe exibir todos os produtos de uma categoria', () => {
    const categoria = 'jewelery'
    cy.buscarCategorias(categoria).then(res => {

      cy.wrap(res.body).each((product) => {

              // validar o id do produto
              expect(product.id).to.be.a('number');
              expect(product.id).to.be.at.least(1);
        
              // validar o título do produto
              expect(product.title).to.be.a('string');
              expect(product.title).to.have.length.of.at.least(1);
        
              // validar o preço do produto
              expect(product.price).to.be.a('number');
              expect(product.price).to.match(/^\d+(\.\d{1,2})?$/);
        
              // validar a categoria do produto
              expect(product.category).to.be.a('string');
              expect(product.category).to.equal(categoria);
              expect(product.category).to.have.length.of.at.least(1);
        
              // validar a descrição do produto
              expect(product.description).to.be.a('string');
              expect(product.description).to.have.length.of.at.least(1);
        
              // validar a imagem do produto
              expect(product.image).to.be.a('string');
              expect(product.image).to.match(/^https?:\/\/.+$/);

      });

    })
  })

})

describe('Administrador', () => {

  it('Deve adicionar um novo produto', () => {

    let produto = auxiliar.geraProduto()

    cy.criarProduto(produto.nome, produto.preco, produto.descricao, produto.imagem, produto.categoria)
    .then(res => {
        // validar o conteúdo do produto
        expect(res.body).to.have.property('id').that.is.a('number');
        expect(res.body.id).to.be.at.least(1);
  
        expect(res.body).to.have.property('title').that.is.a('string');
        expect(res.body.title).to.have.length.of.at.least(1);
  
        expect(res.body).to.have.property('price').that.is.a('number');
        expect(res.body.price).to.match(/^\d+(\.\d{1,2})?$/);
  
        expect(res.body).to.have.property('category').that.is.a('string');
        expect(res.body.category).to.have.length.of.at.least(1);
  
        expect(res.body).to.have.property('description').that.is.a('string');
        expect(res.body.description).to.have.length.of.at.least(1);
  
        expect(res.body).to.have.property('image').that.is.a('string');
        expect(res.body.image).to.match(/^https?:\/\/.+$/);
    })

  })

  it('Deve atualizar as informações de um produto existente', () => {
    const novoProduto = auxiliar.geraProduto()
    cy.editarProduto(20,
      novoProduto.nome,
      novoProduto.preco,
      novoProduto.descricao,
      novoProduto.imagem,
      novoProduto.categoria).then(res => {
          // validar o conteúdo do produto
          expect(res.body).to.have.property('id').that.is.a('number');
          expect(res.body.id).to.be.at.least(1);
    
          expect(res.body).to.have.property('title').that.is.a('string');
          expect(res.body.title).to.have.length.of.at.least(1);
    
          expect(res.body).to.have.property('price').that.is.a('number');
          expect(res.body.price).to.match(/^\d+(\.\d{1,2})?$/);
    
          expect(res.body).to.have.property('category').that.is.a('string');
          expect(res.body.category).to.have.length.of.at.least(1);
    
          expect(res.body).to.have.property('description').that.is.a('string');
          expect(res.body.description).to.have.length.of.at.least(1);
    
          expect(res.body).to.have.property('image').that.is.a('string');
          expect(res.body.image).to.match(/^https?:\/\/.+$/);
    })
  })

  it('Deve excluir um produto existente', () => {
    cy.deletarProduto(19).then(res => {
      // validar o conteúdo do produto
      expect(res.body).to.have.property('id').that.is.a('number');
      expect(res.body.id).to.be.at.least(1);

      expect(res.body).to.have.property('title').that.is.a('string');
      expect(res.body.title).to.have.length.of.at.least(1);

      expect(res.body).to.have.property('price').that.is.a('number');
      expect(res.body.price).to.match(/^\d+(\.\d{1,2})?$/);

      expect(res.body).to.have.property('category').that.is.a('string');
      expect(res.body.category).to.have.length.of.at.least(1);

      expect(res.body).to.have.property('description').that.is.a('string');
      expect(res.body.description).to.have.length.of.at.least(1);

      expect(res.body).to.have.property('image').that.is.a('string');
      expect(res.body.image).to.match(/^https?:\/\/.+$/);
    })
  })


})