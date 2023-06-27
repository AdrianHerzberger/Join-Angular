import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs, query } from '@angular/fire/firestore';

interface UserInterface {
  name: string;
  email?: string;
  password?: string
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})

export class SummaryComponent implements OnInit {

  users: UserInterface[] = [];
  
  constructor(
    private firestore: Firestore,
  ) {}

  ngOnInit(): void {
    this.getUserDataAll();
  }
   
  ngAfterViewInit(): void {

  }

  async getUserDataAll() {
    try {
      const userCollection = collection(this.firestore, 'users');
      const q = query(userCollection);
      const querySnapshotfromTasks = await getDocs(q);
  
      const storedUserData: UserInterface[] = [];
  
      querySnapshotfromTasks.forEach((doc) => {
        const data = doc.data();
        const { email, name, password, loggedIn } = data;
        if (loggedIn) {
          const user: UserInterface = {
            email: email,
            name: name,
            password: password,
          };
          storedUserData.push(user);
        }
      });
  
      this.users = storedUserData;
    } catch(error) {
      console.log(error);
    }
  }
  
}
