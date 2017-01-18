var mongoose = require('mongoose');
//mongoose.createConnection('mongodb://localhost/mafias');
mongoose.connect('mongodb://localhost/mafias');
var db = mongoose.connection;


var Users = mongoose.Schema({
    username   : String,  //username
    userId   : String,   //socketId
    group : {
        type:String , enums:['admin','mafias','villager','medic','police','all'], default:'all'
    },
    connected: Boolean
});

var Message = mongoose.Schema({
    userId: String,  //socketId
    group : {
        type:String , enums:['admin','mafias','villager','medic','police','all'], default:'all'
    },
    message :String,
    created_at :{
        type:Date,
        default : Date.now
    }
});

var MafiaSchema = mongoose.Schema({

        server: String,
        serverId: mongoose.Schema.ObjectId,
        userList:[Users],
        messageList:[Message]

});

var Mafia = module.exports = mongoose.model('Mafia',MafiaSchema);



function findServer(servername,callback){
  
    Mafia.findOne({server: servername},function (err, mafia){
                
             //   console.log(err);
                if(err)   
                    throw err;
               // console.log(mafia)
                if(mafia!=null)
                {
                    callback(mafia)
                }
                else{
                    callback(null)
                }
    })  
}



module.exports.addUserToServer = function(serverName,user,callback){
            findServer(serverName,function(server){
                if(server){
                    server.userList.push(user);
                    server.save(callback);
                }
                else{
                var newServer = new Mafia({
                        server: serverName,
                        userList: [user]
                });
                newServer.save(callback);
                }
                    
            });
}

module.exports.addMessage = function(serverName,message,callback){
            
            findServer(serverName,function(server){
                if(server){
                    server.messageList.push(message);
                    server.save(callback);
                }
                else{
                //throw error server not found//
                    throw new Error('server not found');
                }
            })
}

module.exports.getMessages = function(serverName,callback){

            findServer(serverName,function(server){
                if(server){
                    callback(server.messageList)
                }
                else{
                //throw error server not found//
                    throw new Error('server not found');
                }
            })
}