var express = require('express');

var router = express.Router();

router.post('/join',function(req,res,next){
console.log(req);
console.log('API CALLED' + req.body);


if(req.body.room!=null)
{
    res.io.use(function(socket,next) {
    
    // once a client has connected, we expect to get a ping from them saying what room they want to join
        console.log('joned server name : ' + req.body.room);
        socket.join(req.body.room);
        socket.on('add-message',(data)=>{
        console.log('Data recieved: ' + data.server);
    //    var room = io.sockets.adapter.rooms[data.server];
      //  console.log("Room Count "  + room.length);
       // io.of(data.server).emit('message',{type:'new-message',text:data.msg});
         //io.emit('message',{type:'new-message',text:data.msg});
         socket.in(data.server).emit('message',{type:'new-message',text:data.msg});

    });
});

}

var returnobj= { 
        data :'success'
}
      res.json(returnobj);
});


router.get('/',function(req,res,next){
   
      res.send('API WORKS');
    //res.send('TODOS API ');

});



router.post('/send',function(req,res,next){

    var servername =req.body.servername;
    console.log('servername'+ servername);

    var message = req.body.msg;

//console.log(res.io);
//res.io.sockets.in(servername).emit('message',{type:'new-message',text:message}); //-worked

//res.io.in(servername).emit('message',{type:'new-message',text:message}); //-worked//
//  console.log(res.io.sockets.connected);
//  var ios = res.io.of('/');

//  console.log('IOS' + ios);

//  ios.on("connection", function(socket) {
//    // socket.volatile.emit('data');
//     ios.in(servername).emit('message',{type:'new-message',text:message})
// });

// res.io.of(res.io.sockets).in(servername).emit('message',{type:'new-message',text:message});

//     // res.io.in(servername).emit('message',{type:'new-message',text:message});


    var clients = res.io.sockets.adapter.rooms[servername].sockets;   

//to get the number of clients
var numClients = (typeof clients !== 'undefined') ? Object.keys(clients).length : 0;

for (var clientId in clients ) {

     //this is the socket of each client in the room.
     var clientSocket = res.io.sockets.connected[clientId];

     //you can do whatever you need with this
     clientSocket.emit('message',{type:'new-message',text:message});

}

     res.json(true);

});

module.exports =router;

