import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  form!: FormGroup;
  
  contacts:[] = [];

  updatedContacts:boolean = false;

  ngOnInit(): void {
    
  }

  addContact() {

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
