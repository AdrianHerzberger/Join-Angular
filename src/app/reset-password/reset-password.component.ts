import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private firestore: Firestore,
  ) {}

  ngOnInit(): void {
    
  }

  renderLogin() {

  }

  resetPassword() {
    
  }

}
