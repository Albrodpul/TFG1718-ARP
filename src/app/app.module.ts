import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';
import { ROUTES } from './app.routes';

import { HomeComponent } from './home/home.component';
import { AuthService } from './auth/auth.service';
import { ProfileComponent } from './profile/profile.component';
import { CallbackComponent } from './callback/callback.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DataComponent } from './data/data.component';
import { JqueryComponent } from './RESTClient/jquery/jquery.component';

@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent,
    ProfileComponent, 
    AboutComponent,   
    CallbackComponent, 
    AboutComponent, NavbarComponent, DataComponent, JqueryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,    
    MaterializeModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
