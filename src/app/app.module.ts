import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { MaterializeModule } from 'angular2-materialize';

import { AppComponent  } from './app.component';
import { ROUTES } from './app.routes';

import { HomeComponent } from './home/home.component';
import { AuthService } from './auth/auth.service';
import { ProfileComponent } from './profile/profile.component';
import { CallbackComponent } from './callback/callback.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DataComponent } from './data/data.component';
import { RestclientComponent } from './restclient/restclient.component';
import { BirtheditComponent } from './restclient/birthedit/birthedit.component';
import { GeochartComponent } from './data/geochart/geochart.component';
import { CorechartComponent } from './data/corechart/corechart.component';
import { HighchartsComponent } from './data/highcharts/highcharts.component';
import { SimplerestclientComponent } from './simplerestclient/simplerestclient.component';
import { ArraySortByFieldPipe, ArraySortByNumberPipe, ArraySortByStringPipe } from './pipes/arraysort.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { BirthloadComponent } from './restclient/birthload/birthload.component';
import { BirthdeleteallComponent } from './restclient/birthdeleteall/birthdeleteall.component';
import { BirthgetComponent } from './restclient/birthget/birthget.component';
import { BirthpostComponent } from './restclient/birthpost/birthpost.component';
import { BirthdeleteComponent } from './restclient/birthdelete/birthdelete.component';
import { BirthsearchComponent } from './restclient/birthsearch/birthsearch.component';
import { BirthuploadComponent } from './restclient/birthcsv/birthupload/birthupload.component';
import { BirthtextareaComponent } from './restclient/birthcsv/birthtextarea/birthtextarea.component';
import { BirthfileComponent } from './restclient/birthcsv/birthfile/birthfile.component';
import { JqueryclientComponent } from './jqueryclient/jqueryclient.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    AboutComponent,
    CallbackComponent,
    AboutComponent,
    NavbarComponent,
    DataComponent,
    RestclientComponent,
    BirtheditComponent, BirthloadComponent, BirthdeleteallComponent, BirthgetComponent, BirthpostComponent, BirthdeleteComponent, BirthsearchComponent, BirthuploadComponent, BirthtextareaComponent,
    GeochartComponent,
    CorechartComponent,
    HighchartsComponent,
    FilterPipe,
    SimplerestclientComponent,
    ArraySortByFieldPipe, ArraySortByNumberPipe, ArraySortByStringPipe, JqueryclientComponent, FooterComponent, BirthfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterializeModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
