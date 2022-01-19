import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AdoptComponent } from './adopt/adopt.component';
import { ContactComponent } from './contact/contact.component';
import { DonateComponent } from './donate/donate.component';
import { HomeComponent } from './home/home.component';
import { NewseventComponent } from './newsevent/newsevent.component';

const routes: Routes = [
  {path: '',   redirectTo: '/home', pathMatch: 'full' },
  {path:'home',component:HomeComponent},
  {path:'about',component:AboutComponent},
  {path:'adopt',component:AdoptComponent},
  {path:'donate',component:DonateComponent},
  {path:'news_event',component:NewseventComponent},
  {path:'contact',component:ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents= [HomeComponent,AboutComponent,AdoptComponent,DonateComponent,NewseventComponent,ContactComponent]
