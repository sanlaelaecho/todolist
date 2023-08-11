// /controllers/api/todos
const Todo = require('../../models/todo')

module.exports = {
    create,
    indexComplete,
    indexNotComplete,
    show,
    update,
    destroy,
    jsonTodos,
    jsonTodo
}

//jsonTodos, jsonTodo - viewControllers
// _ means not using req but can't remove it or 'res' will be thought of as req
function jsonTodo (_, res) {
    res.json(res.locals.data.todo)
}

function jsonTodos (_, res) {
    res.json(res.locals.data.todos)
}

//create
async function create (req, res, next) {
    try {
        const todo = await Todo.create(req.body)
        console.log(todo)
        res.locals.data.todo = todo
        next()
    } catch(error) {
        res.status(400).json({ msg: error.message })
    }
}

//read - index, show
async function indexComplete(_, res, next) {
    try {
        const todos = await Todo.find({ completed: true })
        res.locals.data.todos = todos
        next()
    } catch(error) {
        res.status(400).json({ msg: error.message })
    }
}

async function indexNotComplete(_, res, next) {
    try {
        const todos = await Todo.find({ completed: false })
        res.locals.data.todos = todos
        next()
    } catch(error) {
        res.status(400).json({ msg: error.message })
    }
}

async function show(req, res, next){
    try{
        const todo = await Todo.findById(req.params.id)
        res.locals.data.todo = todo
        next()
    } catch(error) {
        res.status(400).json({ msg: error.message })
    }
}

//update
async function update(req, res, next) {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.locals.data.todo = todo
        next()
    } catch(error) {
        res.status(400).json({ msg: error.message })
    }
}

//destroy
async function destroy(req, res, next){
    try{
        const todo = await Todo.findByIdAndDelete(req.params.id)
        res.locals.data.todo = todo
        next()
    } catch(error) {
        res.status(400).json({ msg: error.message })
    }
}