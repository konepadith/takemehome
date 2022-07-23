import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdoptComponent } from './adopt/adopt.component';
import { AdoptdetailComponent } from './adopt/adoptdetail/adoptdetail.component';
import { ContactComponent } from './contact/contact.component';
import { DonateComponent } from './donate/donate.component';
import { HomeComponent } from './home/home.component';
import { NewseventComponent } from './newsevent/newsevent.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path: '',   redirectTo: '/home', pathMatch: 'full' },
  {path:'home',component:HomeComponent},
  {path:'adopt',component:AdoptComponent},
  {path:'donate',component:DonateComponent},
  {path:'news_event',component:NewseventComponent},
  {path:'contact',component:ContactComponent},
  {path:'adoptdetail/:id',component:AdoptdetailComponent},
  {path:'profile/:name',component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents= [HomeComponent,AdoptComponent,DonateComponent,NewseventComponent,ContactComponent,AdoptdetailComponent,ProfileComponent]
