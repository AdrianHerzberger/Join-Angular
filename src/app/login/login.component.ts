import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Firestore, getDoc, doc } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  user = new User();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private firestore: Firestore
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  logIn() {
    const auth = getAuth();
    const email = this.user.email;
    const password = this.user.password;

    const userDocRef = doc(this.firestore, 'users', email);
    getDoc(userDocRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              const user = userCredential.user;
              console.log("The user email is", email);
              console.log("The user password is", password);
              this.router.navigateByUrl('/board');
            })
        } else {
          console.log("User does not exist");
        }
      })
  }
  
  renderSignUp() {
    this.router.navigateByUrl('/signup');
  }

  renderForgotPassword() {

  }
}

