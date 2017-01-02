import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from "@angular/forms";
import { AppComponent }  from './app.component';
import {ChatComponent } from './components/chat/chat.component';
import {HomeComponent} from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

// const appRoutes: Routes = [
//   { path: 'chat', component: ChatComponent ,}
//   // { path: '**', component: PageNotFoundComponent }
// ];


@NgModule({
  imports:      [ BrowserModule ,FormsModule,ReactiveFormsModule,AppRoutingModule],
  declarations: [ AppComponent,ChatComponent,HomeComponent ],
  bootstrap:    [ AppComponent ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppModule { }
