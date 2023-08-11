const express = require('express')
const app = express()
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const PORT = process.env.PORT || 3001

//middleware
app.use(express.json()) //req.body
app.use((req, res, next) => {
    res.locals.data = {}
    next()
})
//order of express and res.locals.data don't matter because here res.locals.data is just saving the json

app.use(logger('dev'))
//whatever machine you're in, windows or linux, path.join / in case forward slash backward slash
app.use(favicon(path.join(__dirname, 'public', 'img', 'logo.png')))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api/todos', require('./routes/api/todos'))
//http://localhost:8000/api/todos/completed
// doesn't want to clash with frontend routes, ***static files so route includes 'api/todos'
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

module.exports = app