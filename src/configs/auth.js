module.exports = { // aqui eu estou criando um modulo de confoguracao do modulo que vai gerar o token que vai ser mandado para o usuario dps que ele logar na aplicacao.
    jwt: {
        secret: process.env.AUTH_SECRET, // a senha de criptografia
        expiresIn: "1d" // tempo de expiracao
    }
}