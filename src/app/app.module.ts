import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
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
import { NgxCaptchaModule } from 'ngx-captcha';
import { ProfileComponent } from './profile/profile.component';
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CachingInterceptor } from './interceptor/caching.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdoptComponent,
    DonateComponent,
    NewseventComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    AdoptdetailComponent,
    SildeDirective,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxCaptchaModule,
    MatTabsModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass: CachingInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
