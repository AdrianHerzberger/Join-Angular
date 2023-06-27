import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor( private router: Router,) {

  }

  ngOnInit(): void {
  }

  renderSummary() {
    this.router.navigateByUrl('/summary');
  }

  renderAddTask() {
    this.router.navigateByUrl('/addTask');
  }

  renderBoard() {
    this.router.navigateByUrl('/board');
  }

  renderContacts() {
    this.router.navigateByUrl('/contacts');
  }

  renderLegalNotice() {
    this.router.navigateByUrl('/summary');
  }

}
