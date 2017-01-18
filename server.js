var express = require('express');
var path  = require('path');
var bodyParser = require('body-parser');
var util = require('util');
var expressValidator = require('express-validator');


var index = require('./routes/index');
var todos = require('./routes/todos');
var chat = require('./routes/chat');

//var sockets= require('./routes/socketer');
var app = express();



var server = require('http').Server(app);
var io = require('socket.io')(server);





io.on('connection', (socket)=> {
    console.log('User Connected......' );
    console.log("Socket ID On server "+ socket.client.id);
    socket.emit('clientId',socket.id);
    socket.on('disconnect',()=>{
            console.log('User disconnect');
    });
     socket.on('connect',()=>{
            console.log('connected');
    });
    

    socket.on('join',(data)=>{
            console.log('joined' + data);
        socket.join(data);
    });
    socket.on('add-message',(data)=>{
        console.log('Data recieved: ' + data.server);
    //    var room = io.sockets.adapter.rooms[data.server];
      //  console.log("Room Count "  + room.length);
       // io.of(data.server).emit('message',{type:'new-message',text:data.msg});
         //io.emit('message',{type:'new-message',text:data.msg});
        // socket.in(data.server).emit('message',{type:'new-message',text:data.msg});
        io.in(data.server).emit('message',{type:'new-message',text:data.msg});
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
app.use(expressValidator());


app.use('/',index);
app.use('/api/v1/',todos);
app.use('/chats/',chat);

//app.use('/socket/',sockets);

// app.listen(3000,function(){
//         console.log('server started on port 3000');
// });

server.listen(3000),function(){
        console.log('server started on port 3300');
};

module.exports= server;
