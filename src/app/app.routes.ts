import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { CallbackComponent } from './callback/callback.component';
import { AboutComponent } from './about/about.component';
import { DataComponent } from './data/data.component';
import { RestclientComponent } from './restclient/restclient.component';
import { BirtheditComponent } from './restclient/birthedit/birthedit.component';
import { SimplerestclientComponent } from './simplerestclient/simplerestclient.component';
import { JqueryclientComponent } from './jqueryclient/jqueryclient.component';


export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'callback', component: CallbackComponent },
  { path: 'about', component: AboutComponent },
  { path: 'data', component: DataComponent },
  { path: 'RESTClient', component: RestclientComponent },  
  { path: 'RESTClient/:region/:year', component: BirtheditComponent },
  { path: 'SimpleRESTClient', component: SimplerestclientComponent },
  { path: 'jquery', component: JqueryclientComponent },
  { path: '**', redirectTo: '' }
];