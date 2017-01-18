var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var Mafia = require("../models/mafia");
var server = require("../server");

var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);

var saveUser;

describe('Api Test', function () {

    before(function (done) {
        // runs before all tests in this block
        Mafia.remove({ server: "server" }, function (err) {
            console.log('collection removed')
           done();

        });
            saveUser = sinon.stub(Mafia,'addUserToServer');
            // saveUser.yields(null, expectedResult);

    });

    it('Join Room Success', function (done) {
        var expectedResult= {
            server : "server",   
        }
           saveUser.yields(null, expectedResult);

        var req= {
            serverName:"server",
            user: {
                name: "username",
                id: "123123123123123"
            }
        }

        chai.request(server)
        .post('/chats/joinRoom')
        .send(req)
        .end(function (err,res){
            expect(err).to.be.null;
            expect(res).to.not.be.null;
            expect(res.status).to.be.equal(200);
            expect(res.body.server).to.be.equal(expectedResult.server);
            done();
        });
           

    });
   
   it('Join Room Fail', function (done) {
        var expectedResult= {
            server : "server",   
        }
    //    var saveUser = sinon.stub(Mafia,'addUserToServer');
        saveUser.yields(null, expectedResult);

        var req= {
           // serverName:"server",
            user: {
                name: "username",
                id: "123123123123123"
            }
        }

        chai.request(server)
        .post('/chats/joinRoom')
        .send(req)
        .end(function (err,res){
            expect(err).to.not.be.null;
           expect(res.status).to.be.equal(400);
           expect(res.error).to.not.be.null;
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
    });


});
