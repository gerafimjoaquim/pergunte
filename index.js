const express = require('express')
const bodyParser = require('body-parser')
const connection = require('./database/database')
const Pergunta = require('./database/Pergunta')
const Resposta = require('./database/Resposta')
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    Pergunta.findAll({ raw:true, order:[
        ['id','DESC']
    ]}).then(perguntas => {
        res.render('index',{
            perguntas: perguntas
        })
    })
})

app.get('/pergunta/:id',(req,res) =>{
    const id =  req.params.id

    Pergunta.findOne({
        where: {id:id}
    }).then(pergunta => {

        if(!pergunta){
            res.redirect('/')
            return
        }

        Resposta.findAll({
            where: {idPergunta: pergunta.id},
            order:[['id','DESC']]
        }).then(respostas => {
            res.render('pergunta',{
                pergunta: pergunta,
                respostas: respostas
            })
        })
    })
})


app.get('/perguntar', (req, res) => {
    res.render('perguntar')
})

app.post('/gravarpergunta', (req, res) => {
    const titulo = req.body.titulo
    const descricao = req.body.descricao

    Pergunta.create({
        titulo:titulo,
        descricao:descricao
    }).then(() => {
        res.redirect('/')
    })
})

app.post('/responder',(req, res) => {
    const pergunta = req.body.pergunta
    const corpo = req.body.corpo

    Resposta.create({
        idPergunta:pergunta,
        corpo:corpo
    }).then(() => {
        res.redirect(`/pergunta/${pergunta}`)
    })
})

app.listen(8181, () => {console.log('App rodando...')})