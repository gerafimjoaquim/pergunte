const express = require('express')
const bodyParser = require('body-parser')
const connection = require('./database/database')
const app = express()


connection.authenticate()
    .then(() => {
        console.log('Autenticado')
    })
    .catch(error => console.log(`Erro na autenticação: ${error}`))

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/perguntar', (req, res) => {
    res.render('perguntar')
})

app.post('/gravarpergunta', (req, res) => {
    const titulo = req.body.titulo
    const descricao = req.body.descricao

    res.send(`<li>${titulo}</li><li>${descricao}</li>`)
})

app.listen(8080, () => {console.log('App rodando...')})