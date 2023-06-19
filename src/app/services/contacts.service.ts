import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDocs, query, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  Data_Contacts_All: { [key: string]: any }[] = [];

  constructor(
    private firestore: Firestore,
  ) { }

  async getContactData() {
    const contactsCollection = collection(this.firestore, 'contacts');
    const q = query(contactsCollection);
    const querySnapshotFromContacts = await getDocs(q);

    querySnapshotFromContacts.forEach((doc) => {
      const data = doc.data();
      this.Data_Contacts_All.push(data);
    });

    console.log(this.Data_Contacts_All);
  }
}
