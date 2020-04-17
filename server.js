const express = require('express')

const { db } = require('./db')

const taskRoute = require('./routes/todos')
var bodyParser = require("body-parser");

const app = express()
const PORT= process.env.PORT||2222


app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true })); 

app.use('/', express.static(__dirname + '/public'))



app.use('/todos', taskRoute)

module.exports = app;

db.sync()

  .then(() => {

    app.listen(PORT,function(){
      console.log('server successfully started on port'+PORT)
    });

  })

  .catch((err) => {

    console.error(err)

  })
