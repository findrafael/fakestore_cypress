var faker = require('faker-br');

export default class auxiliar{

    static geraProduto(){

        return {
            'nome': faker.commerce.productName(),
            'preco': parseFloat(faker.commerce.price()),
            'descricao': faker.commerce.productAdjective(),
            'imagem': 'https://linkdoproduto.com/aso12jk3jidnd',
            'categoria': faker.commerce.department()
        }

    }

    static geraUsuario(){
        return {
            email: faker.internet.email(),
            username: faker.internet.userName(),
            password: faker.internet.password(),
            name: {
            firstname: faker.name.firstName(),
            lastname: faker.name.lastName()
            },
            address: {
            city: faker.address.city(),
            street: faker.address.streetName(),
            number: faker.random.number({min: 1, max: 1000}),
            zipcode: faker.address.zipCode(),
            geolocation: {
                lat: faker.address.latitude(),
                long: faker.address.longitude()
            }
            },
            phone: faker.phone.phoneNumber()
        }
    }



}
