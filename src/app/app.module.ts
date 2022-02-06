import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AdoptComponent } from './adopt/adopt.component';
import { DonateComponent } from './donate/donate.component';
import { NewseventComponent } from './newsevent/newsevent.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdoptdetailComponent } from './adopt/adoptdetail/adoptdetail.component';
import { SildeDirective } from './adopt/adoptdetail/silde.directive';
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    AdoptComponent,
    DonateComponent,
    NewseventComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    AdoptdetailComponent,
    SildeDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
