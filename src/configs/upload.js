const path = require('path') // path é responsavel por resolver os locais de arquivos de dentro de qualquer sistema operacional
const multer = require('multer') // esse modulo server para fazer o upload para o backend
const crypto = require('crypto')


const TMP_FOLDER = path.resolve(__dirname, '..', '..', 'tmp') // entrando na pasta temporaria.
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, 'uploads') // entrando na pasta de uploads


const MULTER = { // consifguracoes do multer
    storage: multer.diskStorage({ // configuracoes para o salvamento dos arquivos
        destination: TMP_FOLDER, // falando o local onde eu vou salvar os arquivos uploaded.
        filename(req, file, callback){ // configuracao de criacao de nome dos arquivos de upload -- ele vai pegar o arquivo, fazer o que tem que fazer e devolver o nome em callback
            const fileHash = crypto.randomBytes(10).toString('hex') // aqui eu estou mandando o crtpto hazer um random para gerar o nome do arquivo para nao ter arquivos com o mesmo nome. caso tenha algum arquivo com o mesmo nome, isso dara problema pois o arquivo mais atual sobrescrevera o antivo.
            const fileName = `${fileHash}-${file.originalname}` // aqui eu esou gerando riando o nome do arquivo usando o resultao do fileHash + o nome original do arquivo.

            return callback(null, fileName)// aqui, eu estou pegando o nome do arquivo e passando para o callback
        }
    })
}

module.exports = { // aqui eu estou exportando 3 informações de uma vez.
    TMP_FOLDER,
    UPLOADS_FOLDER,
    MULTER
}