import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import * as io from 'socket.io-client';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ChatService{

    private url:'http://localhost:3000'
    private chatApi:'http://localhost:3000/chat'
    private socket:any;
    private username:string;
    private servername:string;


  constructor(private _http:Http){
        this.socket = io(this.url);
    }

    setUsername(name:string){
        this.username= name;
    }

    getUsername(){
        return this.username;
    }

    setServername(server:string){
        this.servername= server;
        console.log('starts join ' + this.servername);
        // this.joinroom(this.servername);    
        this.joinroom(this.servername);
        // result.subscribe(x => {
        //         console.log(x);
        // });
        }

    getServername(){
        return this.servername;
    }

    sendMessage(message:string)
    {
        
        this.socket.emit('add-message',{msg:message,server:this.servername});
    }


    getMessage(){
        let observable = new Observable((observer:any) => {
             this.socket = io(this.url);
            this.socket.on('message',(data:any) => {

                observer.next(data);    
            });
            return () =>{
                this.socket.disconnect();
            }
        });
        return observable;
    }



    joinroom(room:string){
        // var headers = new Headers();
        // var object = {"rooms":room};
        // console.log('Json' + JSON.stringify(object));
        // headers.append('Content-Type', 'application/json');
        // return this._http.post('/chats/join', object, {headers: headers})
        //     .map(res => res.json());
        // //this.socket = io(this.url);
        this.socket.emit('join',room);
    }
}
 