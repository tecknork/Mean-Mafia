import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } 
    from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {ChatService} from '../../services/chat.service';


@Component({
 moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.component.html'
})


export class HomeComponent implements OnInit{
    myForm : FormGroup;


    constructor( private _chatService:ChatService,private _formbuilder:FormBuilder,
    private route: ActivatedRoute,
    private router: Router)
    {

    }


    ngOnInit():any{
//        this.
    this.myForm = this._formbuilder.group({
            "username": ["", Validators.required],
            "serverName":["", Validators.required]
        });

    }

    username:string;
    serverName:string;

    onSubmit(){
        this.username = this.myForm.value['username'];
        this.serverName = this.myForm.value['serverName'];
        this._chatService.setUsername(this.username);
        console.log("username " + this.username );
        console.log("serverName " + this.serverName );
        this.router.navigate(['/chat',this.serverName]);
    }

}