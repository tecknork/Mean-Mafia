var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var Mafia = require("../models/mafia");
var server = require("../server");

var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);

var saveUser;
var getMessages;
var addMessages;
describe('Api Test', function () {

    before(function (done) {
        // runs before all tests in this block
        Mafia.remove({ server: "server" }, function (err) {
            console.log('collection removed')
            done();

        });
        saveUser = sinon.stub(Mafia, 'addUserToServer');
        getMessages = sinon.stub(Mafia, 'getMessages');
        addMessages = sinon.stub(Mafia, 'addMessage');

    });

    it('Join Room Success', function (done) {
        var expectedResult = {
            server: "server",
        }
        saveUser.yields(null, expectedResult);

        var req = {
            serverName: "server",
            user: {
                name: "username",
                id: "123123123123123"
            }
        }

        chai.request(server)
            .post('/chats/joinRoom')
            .send(req)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.not.be.null;
                expect(res.status).to.be.equal(200);
                expect(res.body.server).to.be.equal(expectedResult.server);
                done();
            });


    });

    it('Join Room Fail Request', function (done) {

        var expectedResult = {
            server: "server",
        }
        //    var saveUser = sinon.stub(Mafia,'addUserToServer');
        saveUser.yields(null, expectedResult);

        var req = {
            // serverName:"server",
            user: {
                name: "username",
                id: "123123123123123"
            }
        }

        chai.request(server)
            .post('/chats/joinRoom')
            .send(req)
            .end(function (err, res) {
                expect(err).to.not.be.null;
                expect(res.status).to.be.equal(400);
                expect(res.error).to.not.be.null;
                done();
            });


    });



    it('Join Room Fail Mongo', function (done) {

        var error = new Error("Error Expected");
        error.stack = "Something went wrong";
        error.message = "Error";
        // var expectedResult= {
        //     server : "server",   
        // }
        saveUser.yields(error, null);

        var req = {
            serverName: "server",
            user: {
                name: "username",
                id: "123123123123123"
            }
        }

        chai.request(server)
            .post('/chats/joinRoom')
            .send(req)
            .end(function (err, res) {
                expect(err).to.not.be.null;
                expect(res).to.not.be.null;
                expect(res.status).to.be.equal(400);
                expect(res.body.error).to.be.equal(error.message);
                expect(res.body.status).to.be.false;
                done();
            });


    });


    it('Get Messages Success', function (done) {

       
        getMessages.yields([]);

        var req = {
            serverName: "server"
        }

        chai.request(server)
            .get('/chats/messages')
            .query({serverName:req.serverName})
            .end(function (err, res) {
               // console.log(err);
               // console.log(res);
                expect(err).to.be.null;
                expect(res).to.not.be.null;
                expect(res.status).to.be.equal(200);
                expect(res.body.message).to.be.empty;
                expect(res.body.status).to.be.true;
                done();
            });


    });


    it('Get Messages Fail', function (done) {
       // var err = new Error('messages failed');
        
        getMessages.yields(null);

        var req = {
            serverName: "server"
        }

        chai.request(server)
            .get('/chats/messages')
            .query({serverName:req.serverName})
            .end(function (err, res) {
              //  console.log(err);
             //   console.log(res);
                expect(err).to.not.be.null;
                expect(res).to.not.be.null;
                expect(res.status).to.be.equal(400);
                expect(res.body.message).to.be.empty;
                expect(res.body.status).to.be.false;
                done();
            });
    });


    it('Add Messages Fail', function (done) {
        var errs = new Error('add messages failed');
        var expectedResult = {
            status: false
        }
        addMessages.yields(errs, expectedResult);
        var servername = "server";
        var user = {
            username: "Hamza",
            userId: "useridasdas123",
            connected: true
        }
        var messages = {
            userId: user.userId,
            message: 'test message'
        }
        var req = {
            serverName: "server",
            message: messages
        }
        chai.request(server)
            .post('/chats/addMessage')
            .send(req)
            .end(function (err, res) {
                console.log(res.body);

                expect(err).to.not.be.null;
                expect(res).to.not.be.null;
                expect(res.status).to.be.equal(400);
                expect(res.body.error).to.be.equal(errs.message);
                expect(res.body.status).to.be.false;
                done();
            });
    });

    it('Add Messages Succes', function (done) {

        var servername = "server";
        var user = {
            username: "Hamza",
            userId: "useridasdas123",
            connected: true
        }
        var messages = {
            userId: user.userId,
            message: 'test message'
        }

        var expectedResult = {
            server: "server",
            messageList: {
                userId: user.userId,
                message: 'test message'
            }
        }
        addMessages.yields(null, expectedResult);
        
        var req = {
            serverName: "server",
            message: messages
        }
        chai.request(server)
            .post('/chats/addMessage')
            .send(req)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.not.be.null;
                expect(res.status).to.be.equal(200);
                expect(res.body.server.server).to.be.equal(req.serverName);
                expect(res.body.server).to.deep.equal(expectedResult);
                expect(res.body.status).to.be.true;
                done();
            });
    });


    after(function (done) {
        // runs before all tests in this block
        Mafia.remove({ server: "server" }, function (err) {
            console.log('collection removed')
            done();

        });

        saveUser.restore();
        getMessages.restore();
        addMessages.restore();

    });





});
