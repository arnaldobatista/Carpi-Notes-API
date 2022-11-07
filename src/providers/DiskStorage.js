// esse arquivo serve para fazer as configurações de salvar e deletar dos aquivos vindos do frontend

const fs = require('fs')
const path = require('path')
const uploadConfig = require('../configs/upload')

class DiskStorage { // essa função vai receber o arquivo do front
    async saveFile(file) { // config para salvar o arquivo.
        await fs.promises.rename( // configs de onde eu vou pegar o arquivo e pra onde eu vou leva-lo -- o rename do FS serve para renomear ou mover o arquivo de lugar. precisamos usar o promisses para esperar que o arquivo seja de fato alterado de lugar.
            path.resolve(uploadConfig.TMP_FOLDER, file), // aqui eu estou pegando o arquivo de dentro do TMP.
            path.resolve(uploadConfig.UPLOADS_FOLDER, file) // aqui eu estou mandando ele para o UPLOADS.
        ) // precisamos usar dois parametros dento desse rename. o primeiro é para falar onde o querivo esta e o outro é para dizer onde o aquivo vai.
        return file // retornar as informacoes do arquivo.
    }
    async deleteFile(file) { // config para deletar o arquivo. aqui ele recebe o arquivo.
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)// estamos buscando pelo arquivo na pasta de uploads

        try { // nao entendi isso .. acho que isso seria somente para saber se vai ter algum erro no arquivo ou nao.
            await fs.promises.stat(filePath) // o stat serve para ver o estao do arquivo. se ele esta corrompido, se ele esta la, se tem algum processo usando esse arquivoß
        } catch {
            return // caso tenha algum problema com o arquivo, ele ja vai dar esse retorno.
        }
        await fs.promises.unlink(filePath) // o .unlink serve para deletar o aquivo. precisamos passar o endereco do arquivo.
    }
}

module.exports = DiskStorage