var express = require('express');
var path  = require('path');
var bodyParser = require('body-parser');


var index = require('./routes/index');
var todos = require('./routes/todos');
//var sockets= require('./routes/socketer');
var app = express();



var server = require('http').Server(app);
var io = require('socket.io')(server);





io.on('connection', (socket)=> {
    console.log('User Connected......' );

    socket.on('disconnect',()=>{
            console.log('User disconnect');
    });

    socket.on('add-message',(message)=>{
        io.emit('message',{type:'new-message',text:message});
    });
});

//View Engine

app.use(function(req, res, next){
  res.io = io;
  next();
});


app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);
app.use(express.static(path.join(__dirname,'client')));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended:false }));


app.use('/',index);
app.use('/api/v1/',todos);
//app.use('/socket/',sockets);

// app.listen(3000,function(){
//         console.log('server started on port 3000');
// });

server.listen(3000),function(){
        console.log('server started on port 3300');
};

