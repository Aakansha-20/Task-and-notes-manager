const Sequelize = require('sequelize')



const db = new Sequelize({

    dialect: 'sqlite',

    storage: __dirname + '/todos.db'

})



const Todos = db.define('todos', {

    id: {

        type: Sequelize.INTEGER,

        primaryKey: true,

        autoIncrement: true

    },

    title: {

        type: Sequelize.STRING(50),

        allowNull: false

    },

    description: {

        type: Sequelize.STRING(100),

        allowNull: true,


    },

    due: {

        type: Sequelize.DATEONLY,
        allowNull: false,
    },

    status: {

        type: Sequelize.STRING(100),
        allowNull: false,
    },

    priority: {

        type: Sequelize.STRING(50),
        allowNull: false,
    },

}), Notes = db.define('note',{
    note_id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: Sequelize.STRING
    }
})
Todos.hasMany(Notes,{foreignKey : 'task_id'});
module.exports = {

    db, Todos,Notes

}