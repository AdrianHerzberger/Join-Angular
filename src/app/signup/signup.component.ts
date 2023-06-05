import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form!: FormGroup;

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
      const userRef = collection(this.firestore, 'users');
      await addDoc(userRef, this.form.value);
      this.router.navigateByUrl('/signin');
    }
    this.clear();
  }

  clear() {
    this.form.reset();
  }
}
