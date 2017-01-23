// var express = require('express');
// var http = require('http').Server(express);
// var io = require('socket-io')(http);
// //ar io = require('socket.io').listen(http);
// // http.listen(8000,() =>{
// //     console.log('server running on 8000');

// // });

// io.on('connection', (socket)=> {
//     console.log('User Connected......' );

//     socket.on('disconnect',()=>{
//             console.log('User disconnect');
//     });

//     socket.on('add-message',(message)=>{
//         io.emit('message',{type:'new-message',text:message});
//     });
// });


// // var router = express.Router();


// // router.get('/',function(req,res,next){

// //     res.render('index.html');

// // });


// // module.exports =router;



// module.exports = function(io) {
//   var routes = {};
//   routes.index = function (req, res) {
//     io.sockets.emit('payload');
//     res.render('index', {
//       title: "Awesome page"
//     });
//   };
//   return routes;
// };