import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-template',
  templateUrl: './header-template.component.html',
  styleUrls: ['./header-template.component.scss']
})

export class HeaderTemplateComponent implements OnInit {
  tooltips: boolean = false;

  constructor() {

  }
  ngOnInit(): void {

  }

  tooltip() {
    this.tooltips = !this.tooltips;
  }

  logout() {
    
  }
}
