import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: any;
  tProfile: any;
  constructor(public auth: AuthService) { }

  ngOnInit() {
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
      this.socialProfile(this.profile);
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
        this.socialProfile(profile);
      });
    }
  }

  public socialProfile(profile): void{
    if(profile.sub.match("google")){
      this.tProfile = "google";
      
    }else if(profile.sub.match("twitter")){
      this.tProfile = "twitter";
      
    }else if(profile.sub.match("facebook")){
      this.tProfile = "facebook";
    }
  }

}
