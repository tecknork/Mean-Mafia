import { Component,OnInit,OnDestroy } from '@angular/core';
import {ChatService} from '../../services/chat.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Subscription } from 'rxjs';
//To-Do - Get Parameters from Router 

@Component({
moduleId: module.id,
  selector: 'chat',
  templateUrl: 'chat.component.html'
})
export class ChatComponent  implements OnInit,OnDestroy{
    messages: any = [];
    message : string;
    connection:any;
    serverName: string;
    username:string;

    constructor(private _chatService:ChatService,private route: ActivatedRoute,
    private router: Router){
     
       }

sendMessage(){
    console.log(this.message);
    console.log('servername:' + this.serverName);
    this._chatService.sendMessage(this.message);
    this.message= '';
   
}

    ngOnInit(){
        this.username= this._chatService.getUsername();
    this.connection= this._chatService.getMessage().subscribe(message => {
        console.log(message);
        this.messages.push(message);
    });
  this.route.params.subscribe(
      (param: any) => {
        this.serverName = param['servername'];
          this._chatService.setServername(this.serverName);
      //  console.log(this.serverName);
      }); 

    
      console.log(this.username);
    }

    ngOnDestroy(){
        this.connection.unsubscribe();

    }
  }
