import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';
import { AboutComponent } from './../about/about.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  profile: any;
  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
