var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var Mafia = require("../models/mafia");

describe('MongoTest', function () {
    before(function (done) {
        // runs before all tests in this block
        Mafia.remove({ server: "server" }, function (err) {
            console.log('collection removed')
            done();
        });
    });


    it('Add User', function (done) {
        var servername = "server";
        var user = {
            username: "Murtaza",
            userId: "useridasdas",
            connected: true
        }
        Mafia.addUserToServer(servername, user, function (err, server) {
            expect(server.server).to.equal(servername);
            expect(server.userList[0].username).to.equal(user.username);
            done();

        });


    });
    it('Add Another User to Same Server', function (done) {
        var servername = "server";
        var user = {
            username: "Hamza",
            userId: "useridasdas123",
            connected: true
        }
        Mafia.addUserToServer(servername, user, function (err, server) {
            // console.log(server);
            expect(server.server).to.equal(servername);
            expect(server.userList[0].username).to.equal("Murtaza");
            expect(server.userList[1].username).to.equal(user.username);
            done();
        });
    });

    it('Add Message To Server', function (done) {
        var servername = "server";
        var user = {
            username: "Hamza",
            userId: "useridasdas123",
            connected: true
        }
        var message = {
            userId: user.userId,
            message: 'test message'
        }
        Mafia.addMessage(servername, message, function (err, server) {
            expect(server.server).to.equal(servername);
            expect(server.messageList[0].message).to.equal(message.message);
            expect(server.messageList[0].userId).to.equal(message.userId);
            done();
        });
    });



    it('Get Messages From Server', function (done) {
        var servername = "server";
        Mafia.getMessages(servername, function (messages) {

            expect(messages).to.not.be.null;

            done();
        });
    });

    it('Get Messages From Server Fail', function (done) {
        var servername = "server5";
            Mafia.getMessages(servername, function (messages) {
                  //  console.log("message:+" + messages);
                expect(messages).to.be.null;
                        done();
              
            })
        
    });

    it('Get Messages From Server Fail Null', function (done) {
        var servername = null;
        
            Mafia.getMessages(servername, function (messages) {
                console.log("message:+" + messages);
                expect(messages).to.be.null;
                done();
            });
        
        
    });


    it('Add Message To Server Fail', function (done) {
        var servername = "server123";
        var user = {
            username: "Hamza",
            userId: "useridasdas123",
            connected: true
        }
        var message = {
            userId: user.userId,
            message: 'test message'
        }
        Mafia.addMessage(servername, message, function (err, server) {
           // expect(server).to.be.null;
            expect(err).to.not.be.null;
            expect(err).to.deep.equal(new Error('server not found'));
            done();
        });
    });



});