import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection, getDocs, query } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface ContactsInterface {
  name: string;
  email: string;
  phone: string;
  id: string;
}

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})

export class ContactsComponent implements OnInit {
  form!: FormGroup;

  contacts: ContactsInterface[] = [];

  addContacts: boolean = false;
  editContacts: boolean = false
  updatedContacts: boolean = false;
  contactInList: boolean = true;
  currentUser!: void;


  constructor(
    private firestore: Firestore,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
    });
    this.showContactInList();
  }

  addContact() {
    this.addContacts = true;
  }

  newColor() {
    var randomColor = "#000000".replace(/0/g, () => {
      return (~~(Math.random() * 16)).toString(16);
    });

    return randomColor;
  }

  async createContacts() {
    if (this.form.valid) {
      const contactsCollectionRef = collection(this.firestore, 'contacts');
      await addDoc(contactsCollectionRef, this.form.value);
      this.cancelContactsForm();
      this.showContactInList();
    }
  }

  cancelContactsForm() {
    this.addContacts = false;
    this.form.reset();
  }

  async showContactInList() {
    if (this.contactInList !== null) {
      try {
        const contactsCollection = collection(this.firestore, 'contacts');
        const q = query(contactsCollection);
        const querySnapshotfromContacts = await getDocs(q);

        const storedContactData: ContactsInterface[] = [];

        querySnapshotfromContacts.forEach((doc) => {
          const data = doc.data();
          const { name, email, phone } = data;
          const contact: ContactsInterface = {
            id: doc.id,
            name: name,
            email: email,
            phone: phone,
          };
          storedContactData.push(contact);
          console.log(storedContactData);
        });

        this.contacts = storedContactData;

      } catch (error) {
        console.log('Error logging in:', error);
      }
    }
  }

  toggleBetweenContacts(userID: any) {
    var currentUser = this.getUserById(userID);
    if(this.currentUser !== null) {
      this.updatedContacts = true;
    }
    console.log(currentUser);
  }

  getUserById(userID: any) {
    var currentUser = this.contacts.filter((v) =>
      v != null && v.id == userID
    );
    console.log(currentUser);

    return currentUser.length > 0 ? currentUser[0] : null;
  }

  saveContactData() {

  }

  editContact() {

  }

  renderTaskOverlay() {

  }

  closeContactDataMobile() {

  }
}
