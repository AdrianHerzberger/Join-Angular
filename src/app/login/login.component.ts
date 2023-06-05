import { Component, OnInit } from '@angular/core';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private firestore: Firestore,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async logIn() {
    const email = this.form.value.email;
    const password = this.form.value.password;

    try {
      const usersCollection = collection(this.firestore, 'users');
      const q = query(usersCollection, where('email', '==', email), where('password', '==', password));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log('Invalid email or password');
        return;
      }
      this.router.navigateByUrl('/board');
    } catch (error) {
      console.log('Error logging in:', error);
    }
  }
  
  renderSignUp() {
    this.router.navigateByUrl('/signup');
  }

  renderForgotPassword() {

  }
}

