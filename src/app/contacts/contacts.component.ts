import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection, getDocs, query } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface ContactsInterface {
  name: string;
  email: string;
  phone: string;
  id: string;
  selected: boolean;
  initials: any;
  color:any;
}

interface TaskInterface {
  title: string,
  description: string,
  date: Date | string,
  newCategory: string,
  newSubtask: string,
}

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})

export class ContactsComponent implements OnInit {
  form!: FormGroup;

  contacts: ContactsInterface[] = [];
  selectedContact: ContactsInterface | null = null;

  addContacts: boolean = false;
  editContacts: boolean = false;
  updatedContacts: boolean = false;
  contactInList: boolean = true;

  addTaskToContact: boolean = false;
  openCategory: boolean = false;
  openSubtask: boolean = false;
  editingCategory: boolean = false;
  addCategory: boolean = false;
  addSubtask: boolean = false;
  showInput: boolean = false;

  categories: any;
  subtasks: string[] = [];

  categoryColors: string[] = [];
  selectedColorClass: string = '';
  selectedTargetIndex: number = -1;

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
    this.showTaskInContacts();
  }

  addContact() {
    this.editContacts = false;
    this.addContacts = true;
  }

  async createContacts() {
    if (this.form.valid) {
      const contactsCollectionRef = collection(this.firestore, 'contacts');
      await addDoc(contactsCollectionRef, this.form.value);
      this.form.reset();
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
            selected: false,
            initials: this.createInitials(name),
            color: this.newColor()
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

  async showTaskInContacts() {
    try {
      const taskCollection = collection(this.firestore, 'tasks');
      const q = query(taskCollection);
      const querySnapshotfromTasks = await getDocs(q);

      const storedTaskData: TaskInterface[] = [];

      querySnapshotfromTasks.forEach(() => {

      }) 


    } catch (error) {
      console.log('Error logging tasks:', error);
    }
  }

  toggleBetweenContacts(userID: any) {
    this.selectedContact = this.getUserById(userID);
    this.updatedContacts = true;
  }

  toggleToEdit() {
    this.editContacts = true;
  }

  editContact(userID: any) {
    this.selectedContact = this.getUserById(userID);
    this.form.patchValue({
      name: this.selectedContact?.name,
      email: this.selectedContact?.email,
      phone: this.selectedContact?.phone
    });
    this.toggleToEdit();
  }
  
  getUserById(userID: any) {
    return this.contacts.find(contact => contact.id === userID) || null;
  }

  newColor() {
    var randomColor = "#000000".replace(/0/g, () => {
      return (~~(Math.random() * 16)).toString(16);
    });

    return randomColor;
  }

  createInitials(name: string) {
    let matches = name.match(/\b\w/g) || [];
    return (
      (matches[0] || "") + (matches[matches.length - 1] || "")
    ).toUpperCase();
  }

  async updateContacts() {
    if (this.form.valid) {
      const contactsCollectionRef = collection(this.firestore, 'contacts');
      await addDoc(contactsCollectionRef, this.form.value);
      this.form.reset();
      this.showContactInList();
    }
  }

  closeEditContats() {
    this.editContacts = false;
    this.form.reset();
  }

  renderTaskOverlay() {
    if(this.addTaskToContact = true) {
      this.showTaskInContacts();
    }
  }

  toggleEditCategory() {
    this.openCategory = !this.openCategory;
  }

  updateEditCategory(event: any) {
    event.preventDefault();
    const target = event.target;
    const categoryIndex = target.getAttribute('data-target');
    if (categoryIndex !== null) {
      let index = parseInt(categoryIndex, 10);
      for (let i = 0; i < this.categories.length; i++) {
        if (i === index) {
          if (i === 0) {
            this.toggleShowInput();
          } else if (i <= 1) {
            this.editingCategory = true;
          } else {
            this.editingCategory = true;
          }
          break;
        }
      }
    }
  }

  toggleShowInput() {
    this.showInput = !this.showInput;
    if (this.showInput) {
      this.addCategory = true;
    }
  }

  confirmCategory() {
    if (this.form.get('newCategory')?.value) {
      this.categories.push(this.form.get('newCategory')?.value);
      this.categoryColors.push('');
      this.addCategory = false;
      this.showInput = false;
      this.form.get('newCategory')?.patchValue('');
    }
  }

  cancelCategory() {
    this.addCategory = false;
    this.showInput = false;
  }

  getColorClass(index: number) {
    const selectedColor = this.categoryColors[index];
    return {
      'color-dot-orange': selectedColor === 'step0',
      'color-dot-red': selectedColor === 'step1',
      'color-dot-blue': selectedColor === 'step2',
      'color-dot-lightblue': selectedColor === 'step3',
      'color-dot-pink': selectedColor === 'step4',
      'color-dot-lightpink': selectedColor === 'step5',
      'color-dot-green': selectedColor === 'step6',
      'color-dot-turquo': selectedColor === 'step7',
    };
  }

  selectColor(index: number) {
    this.selectedTargetIndex = index;
  }

  customizeColor(event: any) {
    if (this.editingCategory && this.selectedTargetIndex !== null) {
      event.preventDefault();
      const target = event.target;
      const colorDotElement = target as HTMLElement;
      const selectedColorClass = colorDotElement.className.split(' ');
      if (selectedColorClass.length > 0) {
        const colorIndex = this.selectedTargetIndex;
        if (colorIndex >= 0 && colorIndex < selectedColorClass.length) {
          const previousColorClass = selectedColorClass[colorIndex];
          colorDotElement.classList.remove(previousColorClass);
          const newColorClass = 'color-dot-orange';
          colorDotElement.classList.add(newColorClass);
          selectedColorClass[colorIndex] = newColorClass;
          this.categoryColors[colorIndex] = 'step' + colorIndex;
        }
      }
    }
  }

  toggleAssignedToContact() {

  }

  cancelSubtask() {
    this.form.get('newSubtask')?.patchValue('');
  }

  confirmSubtask() {
    if (this.form.get('newSubtask')?.value) {
      this.openSubtask = !this.openSubtask;
      if (!this.subtasks.includes((this.form.get('newSubtask')?.value))) {
        this.subtasks.push(this.form.get('newSubtask')?.value);
      }
      this.openSubtask = true;
    }
  }

  async createTask() {
    if (this.form.valid) {
      const tasksCollectionRef = collection(this.firestore, 'tasks');
      await addDoc(tasksCollectionRef, this.form.value);
      this.clearTaskForm();
    }
  }

  clearTaskForm() {
    this.form.reset();
  }


  closeContactDataMobile() {

  }
}
