import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface UserInterface {
  name?: string;
  email?: string;
  password: string
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  form!: FormGroup;

  user: UserInterface[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private firestore: Firestore,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      password: ['', [Validators.required]],
    });
  }

  renderLogin() {

  }

  resetPassword() {

  }

}
