import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  goBack(): void {
    this.location.back();
  }
  constructor(
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
  }

}
