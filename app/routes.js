var Todo = require('./models/todo');

//expose the routes to our app with modules.exports
module.exports = function(app) {
        //routes ===============================================================

    //api ----------------------------------------------------

    //get all todos
    app.get('/api/todos', function(req,res) {
        //Use mongoose to all todos in the database
        Todo.find(function(err,todos) {

            //if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if(err) {
                res.send(err);
            }

            res.json(todos);  //return all todos in JSON format
        });
    });

    app.post('/api/todos', function(req,res) {

        //create a todo, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
            done: false
        }, function(err,todo) {
            if(err) res.send(err);

            Todo.find(function(err,todos) {
                if(err) res.send(err);
                res.json(todos);
            });
        });

    });

    //delete a tod
    app.delete('/api/todos/:todo_id', function(req,res) {
        Todo.remove({
            _id:req.params.todo_id
        }, function(err, todo) {
            if (err)
                    res.send(err);

                // get and return all the todos after deletion
                Todo.find(function(err, todos) {
                    if (err)
                        res.send(err)
                    res.json(todos);
                });
            });
        });
    //application
    app.get('*', function(req,res) {
        res.sendfile('./public/index.html');  //load the single view file (angular will handle the page changes on the frontend)
    });
};