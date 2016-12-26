var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todos');

var db = mongoose.connection;


// Todo Schema 


var TodoSchema = mongoose.Schema({

        title: {
            type:String
        },
        completed:{
                type:Boolean
        }
});



var Todo = module.exports = mongoose.model('Todo',TodoSchema);

module.exports.addTodo = function(newTodo, callback){

    newTodo.save(callback);


}