var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mafias');

var db = mongoose.connection;


var Users = mongoose.Schema({
    username   : String,
    userId   : String,
    group : {
        type:String , enums:['admin','mafias','villager','medic','police','all'], default:'all'
    },
    connected: Boolean
});

var Message = mongoose.Schema({
    userId: String,
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
        serverId: Schema.ObjectId,
        userlist:[Users],
        messageList:[Message]

});

var Mafia = module.exports = mongoose.model('Mafia',MafiaSchema);



function findServer(servername,callback){

    Mafia.findOne({server: servername},function (err, mafia){
                if(err)   
                    throw err;
                if(mafia.length){
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
                        server: servername,
                        userlist: [user]
                });
                newServer.save(callback);
                }
                    
            })
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