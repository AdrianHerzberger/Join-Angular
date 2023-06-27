import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, query } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface UserInterface {
  name?: string;
  email: string;
  password?: string
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})

export class ForgotPasswordComponent implements OnInit {
  form!: FormGroup;

  users: UserInterface[] = [];

  constructor (
    private router: Router,
    private fb: FormBuilder,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  
  async findUserMail() {
    try {
      const { email } = this.form.value;
      const userEmail = email; 

      const userCollection = collection(this.firestore, 'users');
      const q = query(userCollection);
      const querySnapshotfromTasks = await getDocs(q);

      const storedUserData: UserInterface[] = [];

      querySnapshotfromTasks.forEach((doc) => {
        const data = doc.data();
        const { email, name, password } = data;
        const user: UserInterface = {
          email: email,
          name: name,
          password: password,
        }
        storedUserData.push(user);
      })

      const userExists = storedUserData.find((user) => user.email === userEmail);

      if (userExists) {
        this.router.navigateByUrl('/resetpw');
      } else {
        console.log('User does not exist');
      }
    } catch (error) {
      console.log('Error logging tasks:', error);
    }
  }
  
  renderLogin() {
    this.router.navigateByUrl('/signin');
  }

}
