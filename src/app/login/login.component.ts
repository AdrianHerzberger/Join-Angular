import { Component, OnInit } from '@angular/core';
import { Firestore, collection, query, where, getDocs, doc, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface UserInterface {
  name?: string;
  email: string;
  password: string;
  loggedIn: boolean;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  forgotPw: boolean = false;

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

  async login() {
    const email = this.form.value.email;
    const password = this.form.value.password;

    try {
      const usersCollection = collection(this.firestore, 'users');
      const q = query(usersCollection, where('email', '==', email), where('password', '==', password));
      const querySnapshotfromUsers = await getDocs(q);

      const userDoc = querySnapshotfromUsers.docs[0];
      const userRef = doc(this.firestore, 'users', userDoc.id);
      await setDoc(userRef, { loggedIn: true }, { merge: true });

      this.router.navigateByUrl('/summary');
    } catch (error) {
      console.log('Error logging in:', error);
    }
  }
  
  renderSignUp() {
    this.router.navigateByUrl('/signup');
  }

  renderForgotPassword() {
    this.router.navigateByUrl('/forgotpw');
  }

  guestLogin() {
    const password = (document.getElementById('login-password') as HTMLInputElement);
    const email = (document.getElementById('login-mail') as HTMLInputElement);
    password.value = 'guest';
    email.value = 'guest@mail.de';
    setTimeout(() => {
      this.router.navigateByUrl('/summary');
    }, 250);
  }
}

