const knex = require('../database/knex') // chamando todas as configurações, conexão e o knex de uma vez.

class NotesController {
    async create(req, res) { // criar uma nova nota
        const { title, description, tags, links } = req.body // estou desestruturando o que esta vindo em json do front
        const user_id = req.user.id // estou desestruturando o que esta vindo do link

        const note_id = await knex('notes').insert({ // estou criando uma variavel que tem o poder de mandar para o banco de dados, as informações de titulo...
            title,
            description,
            user_id
        })
        const linksInsert = links.map(link => { //agora, eu estou criando uma variavel que vai passar em cada informação do array que vem de links e estou atribuindo a cada um, o node_id e a url passada no obj link
            return {
                note_id,
                url: link
            }
        })
        await knex('links').insert(linksInsert) //aqui, estou dando o poder de enviar para o banco de dados, a variavel que eu montei com todas as informações da nova nota.

        const tagsInsert = tags.map(name => { // aqui, estou percorrendo cada item do array enviado pela tags e passando nela, o note_id...
            return {
                note_id,
                name, // cada vez que eu passar dentro do array, vou tirar o que tem lá e vou passar para o nome.
                user_id
            }
        })
        await knex('tags').insert(tagsInsert) // aqui, estou dando o poder de enviar para o banco de dados, a variavel que eu montei com todas as informações da tag

        return res.json() // estou passando uma informação vazia para o front entender que algo aconteceu. por padrão, ele vai mandar um 200
    }
    async show(req, res) { // mostrar as notas criadas por um id
        const { id } = req.params // pegar o id do link
        const note = await knex('notes').where({ id }).first() //estou dizendo para o knex pesquisar a primeira nota usando um id
        const tags = await knex('tags').where({ note_id: id }).orderBy('name') // estou dizendo para o knex ir no banco de dados e pegar as informações das tags conforme o ID que o usuario solicitou e ordenar em ordem alfabetica
        const links = await knex('links').where({ note_id: id }).orderBy('created_at')
        return res.json({ // aqui, eu estou mandado para o front, uma resposta do resultado que veio na variavel note, tags e links.
            ...note, // estou passando todos os detalhes das notas
            tags,
            links
        })
    }
    async delete(req, res) { // responsavel em deletar as notas.
        const { id } = req.params // preciso pegar o id que esta sendo passado para mim pelo front

        await knex('notes').where({ id }).delete() // estou falando para o knex pesquisar o id de dentro do notes e mando ele deletar através da função de delete()

        return res.json() // estou passando uma informação vazia para o front entender que algo aconteceu. por padrão, ele vai mandar um 200
    }
    async index(req, res) { // responsavel em mostrar as notas
        const { title, tags } = req.query // estou falando que eu vou pegar o ID do usuario passado em uma query.

        const user_id = req.user.id

        let notes // estou criando uma variavel sem nada, para eu poder usar dps do if

        if (tags) {
            const filterTags = tags.split(',').map(tag => tag.trim()) // aqui eu pego as informações vindas da tag com separação de virgulas, e então eu um vetor com ela
            notes = await knex('tags') // mudando a forma em que a variavel notes trabalha.
                .select([ // estou selecionando no banco de dados, dentro de notes, o ID, TITULO E O USER_ID
                    'notes.id',
                    'notes.title',
                    'notes.user_id'
                ])
                .where('notes.user_id', user_id)
                .whereLike('notes.title', `%${title}%`)
                .whereIn('name', filterTags)
                .innerJoin('notes', 'notes.id', 'tags.note_id')
                .groupBy('notes.id')
                .orderBy('notes.title')
        } else { // se não existir, ele vai fazer a pesquisa usando o titulo
            notes = await knex('notes') // estou criando uma variavel notes, e mandando o knex pesquisar dentro no notes no banco de dados.
                .where({ user_id }) // passando para ele filtrar primeiro somente as notas criadas por esse usuario, pois eu não quero que o cliente veja as notas de outros usuarios.
                .whereLike('title', `%${title}%`)
                .orderBy('title') // ordenar por titulo
        }
        const userTags = await knex('tags').where({ user_id })
        const notesWithTags = notes.map(note => {
            const noteTags = userTags.filter(tag => tag.note_id === note.id)

            return {
                ...note,
                tags: noteTags
            }
        })
        return res.json(notesWithTags) // retornar para o front, o resultado da pesquisa feita no banco de dados
    }
}
module.exports = NotesController