import { Component, Pipe, PipeTransform } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userImage: string;
  
  constructor(public auth: AuthService) {
    auth.handleAuthentication();


  }

  ngOnInit() {
    this.auth.userImageChange$.subscribe(image => this.userImage = image);
  }
}

@Pipe({
  name: 'filterUnique',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    // Remove the duplicate elements
    // let uniqueArray = value.filter(function (el, index, array) { 
    //   return array.indexOf(el) == index;
    // });

    let uniqueArray = Array.from(new Set(value));

    return uniqueArray;
  }
}

