import { Component, OnInit } from '@angular/core';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private firestore: Firestore,
  ) {}

  ngOnInit(): void {
    
  }

  renderSignUp() {
    this.router.navigateByUrl('/signup');
  }

}
