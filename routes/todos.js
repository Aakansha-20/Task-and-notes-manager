const { Router } = require('express')

const { Todos } = require('../db')

const { Notes } = require('../db')

const server = Router()

server.get('/',async (req,res)=>{
  const todos = await Todos.findAll()
    res.send(todos)
})

server.post('/',async (req,res)=>{
 
  const newTodo = await Todos.create({

    title: req.body.title,

    description: req.body.description,

    due: req.body.due,

    status: req.body.status,

    priority: req.body.priority,


})
    
      res.status(201).send({ success: 'New task added', data: newTodo })

})

server.get('/:id',async (req,res)=>{

    if (isNaN(Number(req.params.id))) {

        return res.status(400).send({
    
          error: 'todo id must be an integer',
    
        })
    
      }
    
      const todo = await Todos.findByPk(req.params.id)

      if (!todo) {
    
        return res.status(404).send({
    
          error: 'No todo found with id = ' + req.params.id,
    
        })
    
      }
    
      res.send(todo)

})

server.patch('/:id', async (req, res) => {
 
  await Todos.update({
    title: req.body.title,
    description : req.body.description,
    due: req.body.due, //not getting updated
    status: req.body.status,
    priority: req.body.priority},
    {
      where : {id : req.params.id}
  }).catch(err =>
    console.error(err)
  )
})

server.get('/:id/notes',async (req,res)=>{
 
     const Note=await Notes.findAll({
       where: {task_id: req.params.id}
     })
     res.send(Note)
})

server.post('/:id/notes', async (req, res) => {
  const newNote = await Notes.create({
    task_id : req.params.id,
    text : req.body.text
  })
  .then((newNote) => {
    res.status(201).send({ success: 'New note added', data: newNote })
  })
  .catch((err) => {
    res.status(500).send({ error : 'Cannot add new note'})
  })
})

module.exports = server;