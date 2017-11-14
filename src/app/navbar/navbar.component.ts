import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  userImage: string;

  constructor(public auth: AuthService) { }

  public profilePicture():void{
    this.userImage=localStorage.getItem('imageUser');
  }

  ngOnInit() {
    this.profilePicture();
    this.auth.userImageChange$
      .subscribe(
      image => {
        this.userImage = image;
        localStorage.setItem('imageUser',this.userImage);
      });

  }

}
