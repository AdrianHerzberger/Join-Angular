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
  ) { }

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

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); 
  
      const invalidControl = document.querySelector('.ng-invalid');
      if (invalidControl) {
        invalidControl.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (this.form.valid) {
      this.router.navigateByUrl('/signin');
      const userRef = collection(this.firestore, 'users');
      const addUserRef = await addDoc(userRef, this.user.toUserJson());
    }

    this.clear();
  }

  clear() {
    this.user.name = '';
    this.user.email = '';
    this.user.password = '';
  }
}
