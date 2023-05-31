import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})


export class ContactsComponent implements OnInit {
  form!: FormGroup;

  name!:string;
  email!: string;
  phone!: number;

  contacts:{name: string, email:string; phone: number}[] = [];

  addContacts:boolean = false;
  editContacts:boolean = false
  updatedContacts:boolean = false;

  constructor(
    private firestore: Firestore,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
  }

  addContact() {
    this.addContacts = true;
  }

  createContactData() {
    if(this.form.valid) {
      var formData = this.form.value;
      formData.createdTime = new Date().getTime();
      formData.color = this.newColor();
      this.contacts.push(formData);
      console.log("Form field", this.contacts);
    }
  }

  newColor() {
    var randomColor = "#000000".replace(/0/g, () => {
      return (~~(Math.random() * 16)).toString(16);
    });

    return randomColor;
  }

  cancelContactData() {
    this.addContacts = false;
    console.log("Cliked");
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
