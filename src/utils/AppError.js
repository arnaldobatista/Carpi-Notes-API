class AppError{
    message // se eu só escrever o nome das classes em cima, toda a aplicação vai ter acesso a ela.
    statusCode

    constructor(message, statusCode = 400) {
        this.message = message // quando eu coloco o this antes da parada, eu estou dizendo que eu quero fazer referencia ao message do contexo global.
        this.statusCode = statusCode
    }// o metodo construtor já é carregado automaticamente. aqui, quando eu for usar essa classe, eu quero saber do message e do statusCode --- estou dizendo também que, se eu não passar um status code no erro, ele vai me retornar um statusCode 400 como padão.
}

module.exports = AppError