import { Component,OnInit,OnDestroy } from '@angular/core';
import {ChatService} from '../../services/chat.service';

@Component({
moduleId: module.id,
  selector: 'chat',
  templateUrl: 'chat.component.html'
})
export class ChatComponent  implements OnInit,OnDestroy{
    messages: any = [];
    message : string;
    connection:any;

    constructor(private _chatService:ChatService){

    }

sendMessage(){
    console.log(this.message);
    this._chatService.sendMessage(this.message);
    this.message= '';

}

    ngOnInit(){
    this.connection= this._chatService.getMessage().subscribe(message => {
        console.log(message);
        this.messages.push(message);
    });
    }

    ngOnDestroy(){
        this.connection.unsubscribe();

    }
  }
