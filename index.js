const express = require('express')
const app = express()
const session = require('express-session')

var perguntas = ['8 + 2 * 5 - 2 = ?', 'Que dia é hoje ?', '3x + 4 = 5x - 8 ?', 'Qual a sua idade ?']
var user = ['Joãozinho652', 'Vicente', 'Rafael53', 'Lucas615']

let perguntasRealizads = [];

app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: '12345678',
    resave: false,
    saveUninitialized: false,
}))

app.get('/', (req, res) => {
    res.render('login')
})

app.post('/Perguntas', (req, res) => {
    req.session.nome = req.body.nome;
    // aluno
    if (req.body.role == '1') {
        req.session.role = 'aluno'
        res.render('Perguntas', {role: req.session.role, nome:  req.session.nome, perguntasRealizads: perguntasRealizads})       
    }
    // professor
    else {
        req.session.role = 'professor'
        res.render('Perguntas', {role: req.session.role, nome: req.session.nome, perguntasRealizads: perguntasRealizads})    
    }   
})

app.get('/Perguntas', (req, res) => {
    res.render('Perguntas', {role: req.session.role, nome: req.session.nome, perguntasRealizads: perguntasRealizads})
})



app.post('/perguntas_realizadas', (req, res) => {
    const pergunta = req.body.input
    perguntasRealizads.push(pergunta);

});

app.get('/Respostas', (req, res) => {
    res.render('Respostas', {pergunta: perguntas, user: user, role: req.session.role})   
})

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.listen(3000, () => {
    console.log('Servidor estar no ar!')
})