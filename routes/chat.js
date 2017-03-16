"use strict";
var express = require('express');
var Mafia = require('../models/mafia');
var router = express.Router();

// router.post('/join', function (req, res, next) {
//     console.log(req);
//     console.log('API CALLED' + req.body);

//     if (req.body.room !== null) {
//         res.io.use(function (socket, next) {

//             // once a client has connected, we expect to get a ping from them saying what room they want to join
//             console.log('joned server name : ' + req.body.room);
//             socket.join(req.body.room);
//             socket.on('add-message', (data) => {
//                 console.log('Data recieved: ' + data.server);
//                 //    var room = io.sockets.adapter.rooms[data.server];
//                 //  console.log("Room Count "  + room.length);
//                 // io.of(data.server).emit('message',{type:'new-message',text:data.msg});
//                 //io.emit('message',{type:'new-message',text:data.msg});
//                 socket.in(data.server).emit('message', { type: 'new-message', text: data.msg });

//             });
//         });

//     }

//     var returnobj = {
//         data: 'success'
//     };
//     res.json(returnobj);
// });


router.get('/', function (req, res, next) {

    res.send('API WORKS');
    //res.send('TODOS API ');

});



// router.post('/send', function (req, res, next) {

//     var servername = req.body.servername;
//     console.log('servername' + servername);

//     var message = req.body.msg;

//     //console.log(res.io);
//     //res.io.sockets.in(servername).emit('message',{type:'new-message',text:message}); //-worked

//     //res.io.in(servername).emit('message',{type:'new-message',text:message}); //-worked//
//     //  console.log(res.io.sockets.connected);
//     //  var ios = res.io.of('/');

//     //  console.log('IOS' + ios);

//     //  ios.on("connection", function(socket) {
//     //    // socket.volatile.emit('data');
//     //     ios.in(servername).emit('message',{type:'new-message',text:message})
//     // });

//     // res.io.of(res.io.sockets).in(servername).emit('message',{type:'new-message',text:message});

//     //     // res.io.in(servername).emit('message',{type:'new-message',text:message});


//     var clients = res.io.sockets.adapter.rooms[servername].sockets;

//     //to get the number of clients
//     var numClients = (typeof clients !== 'undefined') ? Object.keys(clients).length : 0;

//     for (var clientId in clients) {

//         //this is the socket of each client in the room.
//         var clientSocket = res.io.sockets.connected[clientId];

//         //you can do whatever you need with this
//         clientSocket.emit('message', { type: 'new-message', text: message });

//     }

//     res.json(true);

// });


router.post('/joinRoom', function (req, res, next) {

    req.checkBody('serverName', 'server name cannot be null').notEmpty(); // servername
    req.checkBody('user.name', 'username cannot be null').notEmpty(); // username 
    req.checkBody('user.id', 'id cannot be null').notEmpty();  //Socket ID


    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            var error = result.useFirstErrorOnly().array();
            console.log("error :" + error);
            var response = {
                error: error,
                status: false
            };
            res.statusCode = 400;
            res.json(response);
            return;
        }

        var servername = req.body.serverName; // ServerName
        var user = {
            username: req.body.user.name, // Name
            userId: req.body.user.id, //SocketId
            connected: true
        };
        Mafia.addUserToServer(servername, user, function (err, server) {
            if (err) {
                var response = {
                    error: err.message,
                    status: false
                };
                res.statusCode = 400;
                res.json(response);
                return;
            }

            var responseSuccess = {
                status: true,
                server: server.server,
                user: server.userList,
                message: server.messageList
            };

            //TODOS: Send user info to all others 

            res.statusCode = 200;
            res.json(responseSuccess);

        });
    });
});


router.post('/addMessage', function (req, res, next) {
    req.checkBody('serverName', 'server name cannot be null').notEmpty(); // servername
    req.checkBody('message.message', 'message cannot be null').notEmpty(); // username 
    req.checkBody('message.userId', 'id cannot be null').notEmpty();  //Socket ID

    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            var error = result.useFirstErrorOnly().array();
            console.log("error :" + error);
            var response = {
                error: error,
                status: false
            };
            res.statusCode = 400;
            res.json(response);
            return;
        }

        var servername = req.body.serverName; // ServerName
        var message = {
            userId: req.body.message.userId,
            message: req.body.message.message
        };
        Mafia.addMessage(servername, message, function (err, server) {
            if (err) {
                var response = {
                    error: err.message,
                    status: false
                };
                res.statusCode = 400;
                res.json(response);
                return;
            }
            //TODO: Send Message To All users in Room 
            var responseSuccess = {
                status: true,
                server: server,

            };
            res.statusCode = 200;
            res.json(responseSuccess);
        });

    });


});


router.get('/messages', function (req, res, next) {
    
    req.checkQuery('serverName', 'server name cannot be null').notEmpty(); // servername
    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            var error = result.useFirstErrorOnly().array();
            console.log("error :" + error);
            var response = {
                error: error,
                status: false
            };
            res.statusCode = 400;
            res.json(response);
            return;
        }
        var servername = req.query.serverName; // ServerName
        Mafia.getMessages(servername, function (messages) {
            if(messages){

            
            var responseSuccess = {
                status: true,
                message: messages
            };
            res.statusCode = 200;
            res.json(responseSuccess);
            return;
            }
            else{
                let responseerror = {
                status: false,
                message: []
            };
            res.statusCode = 400;
            res.json(responseerror);
            }

        });

    });
});


module.exports = router;

