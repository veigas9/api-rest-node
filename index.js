//configuração inicial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

//forma de ler json/middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

//Rotas da API
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

//entregar porta da aplicação
const DB_USER = encodeURIComponent(process.env.DB_USER)
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)
mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.dxntrsk.mongodb.net/?retryWrites=true&w=majority&appName=apicluster`
)


.then(() => {
    console.log('conectado')
    app.listen(3000)
})

.catch((err) => console.log(err))



