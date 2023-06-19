import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDocs, query, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  arrayBoardServie: { [key: string]: any }[] = [];

  constructor(
    private firestore: Firestore,
  ) { }

  async getTasks() {
    const contactsCollection = collection(this.firestore, 'contacts');
    const q = query(contactsCollection);
    const querySnapshotFromContacts = await getDocs(q);

    querySnapshotFromContacts.forEach((doc) => {
      const data = doc.data();
      this.arrayBoardServie.push(data);
    });

    console.log(this.arrayBoardServie);
  }
}
