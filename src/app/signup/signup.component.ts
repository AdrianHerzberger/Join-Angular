import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  user = new User();

  constructor(
    private router: Router,
    private firestore: Firestore,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  renderLogin() {
    this.router.navigateByUrl('/signin');
  }

  submit() {

    const userRef = collection(this.firestore, 'users');
    const addUserRef = addDoc(userRef, this.user.toJson());
    this.router.navigateByUrl('/signin');

    if (this.form.invalid) {
      
      return;
    }

  }

  clear() {
    this.user.name = '';
    this.user.email = '';
    this.user.password = '';
  }
}
