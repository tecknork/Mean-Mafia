import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import {ChatComponent } from './components/chat/chat.component';
import {HomeComponent} from './components/home/home.component';

const appRoutes: Routes = [
  { path: 'chat/:servername', component: ChatComponent },
    { path: 'home', component: HomeComponent },
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
