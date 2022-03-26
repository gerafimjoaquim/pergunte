const express = require('express')
const bodyParser = require('body-parser')
const connection = require('./database/database')
const Pergunta = require('./database/Pergunta')
const { redirect, get } = require('express/lib/response')
const app = express()


//connection.authenticate()
    //.then(() => {
        //console.log('Autenticado')
    //})
    //.catch(error => console.log(`Erro na autenticação: ${error}`))

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

        res.render('pergunta',{
            pergunta:pergunta
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

app.listen(8181, () => {console.log('App rodando...')})