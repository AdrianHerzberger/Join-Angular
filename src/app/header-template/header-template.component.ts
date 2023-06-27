import { Component, Input, OnInit } from '@angular/core';
import { Firestore, collection, doc, getDocs, query, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-template',
  templateUrl: './header-template.component.html',
  styleUrls: ['./header-template.component.scss']
})

export class HeaderTemplateComponent implements OnInit {
  userDoc: any;
  tooltips: boolean = false;

  constructor(
    private router: Router,
    private firestore: Firestore
  ) { }

  ngOnInit(): void {
  }

  tooltip() {
    this.tooltips = !this.tooltips;
  }

  async logout() {
    if (this.userDoc && this.userDoc.id) {
      try {
        const usersCollection = collection(this.firestore, 'users');
        const querySnapshotfromUsers = await getDocs(usersCollection);
    
        const userDoc = querySnapshotfromUsers.docs[0];
        const userRef = doc(this.firestore, 'users', userDoc.id);
        await setDoc(userRef, { loggedIn: false }, { merge: true });
    
        this.router.navigateByUrl('/signin');
      } catch (error) {
        console.log('Error logging out:', error);
      }
    }
    this.router.navigateByUrl('/signin');
  }
}
