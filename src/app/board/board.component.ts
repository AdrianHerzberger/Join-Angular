import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Firestore, collection, doc, getDocs, query, updateDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


interface TaskInterface {
  title: string;
  description: string;
  date: Date | string;
  newCategory: string;
  newSubtask: string;
  color: any;
}

interface ContactsInterface {
  name: string;
  email: string;
  phone: string;
  id: string;
  selected: boolean;
  initials: any;
  color: any;
  tasks: TaskInterface[] | undefined;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {
  @ViewChild('dropAreaOne', { static: true }) dropAreaOne!: ElementRef;

  taskForm!: FormGroup;

  contacts: ContactsInterface[] = [];
  selectedContact: ContactsInterface | null | undefined = null;

  tasks: TaskInterface[] = [];

  addContacts: boolean = false;
  editContacts: boolean = false;
  updatedContacts: boolean = false;
  contactInList: boolean = true;
  openAssignedTo:boolean = false;
  addTaskToBoard: boolean = false;
  openCategory: boolean = false;

  openSubtask: boolean = false;
  editingCategory: boolean = false;
  addCategory: boolean = false;
  addSubtask: boolean = false;
  showInput: boolean = false;

  categories = ["New Category", "Sales", "Marketing"];
  subtasks: string[] = [];

  categoryColors: string[] = [];
  selectedColorClass: string = '';
  selectedTargetIndex: number = -1;

  constructor(
    private firestore: Firestore,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      newCategory: ['', Validators.required],
      newSubtask: ['', Validators.required],
    });
    this.showContactTaskArray();
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  

  searchTask() {

  }

  addTask(section: string) {
    if (section === 'todo'|| this.dropAreaOne) {
      const cardsTodo = this.dropAreaOne.nativeElement;
      cardsTodo.classList.add('task-card');
      this.addTaskToBoard = true;  
    } else if (section === 'inProgress') {
      this.addTaskToBoard = true;
    } else if (section === 'awaitingFeedback') {
      this.addTaskToBoard = true;
    } else if (section === 'done') {
      this.addTaskToBoard = true;
    } else if (section === 'generell') {
      this.addTaskToBoard = true;
    }
  }

  cancelCategory() {
    this.addCategory = false;
    this.showInput = false;
  }

  confirmCategory() {
    if (this.taskForm.get('newCategory')?.value) {
      this.categories.push(this.taskForm.get('newCategory')?.value);
      this.categoryColors.push('');
      this.addCategory = false;
      this.showInput = false;
      /* this.taskForm.get('newCategory')?.patchValue(''); */
    }
  }

  toggleEditCategory() {
    this.openCategory = !this.openCategory;
  }

  toggleAssignedToContact() {
    this.openAssignedTo = !this.openAssignedTo;
  }

  toggleShowInput() {
    this.showInput = !this.showInput;
    if (this.showInput) {
      this.addCategory = true;
    }
  }

  toggleBetweenContacts(userID: any) {
    this.selectedContact = this.getUserById(userID);
    console.log(this.selectedContact);
  }

  getUserById(userID: any) {
    return this.contacts.find(contact => contact.id === userID) || null;
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

  createInitials(name: string) {
    let matches = name.match(/\b\w/g) || [];
    return (
      (matches[0] || "") + (matches[matches.length - 1] || "")
    ).toUpperCase();
  }

  newColor() {
    var randomColor = "#000000".replace(/0/g, () => {
      return (~~(Math.random() * 16)).toString(16);
    });

    return randomColor;
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

  cancelSubtask() {
    this.taskForm.get('newSubtask')?.patchValue('');
  }

  confirmSubtask() {
    if (this.taskForm.get('newSubtask')?.value) {
      this.openSubtask = !this.openSubtask;
      if (!this.subtasks.includes((this.taskForm.get('newSubtask')?.value))) {
        this.subtasks.push(this.taskForm.get('newSubtask')?.value);
      }
      this.openSubtask = true;
    }
  }

  clearTaskForm() {
    this.addTaskToBoard = false;
    this.taskForm.reset();
  }

  async createTask() {
    if (this.taskForm.valid && this.selectedContact) {
      const task: TaskInterface = {
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        date: this.taskForm.value.date,
        newCategory: this.taskForm.value.newCategory,
        newSubtask: this.taskForm.value.newSubtask,
        color: this.selectedContact.color,
      }

      this.selectedContact.tasks = this.selectedContact.tasks || [];
      this.selectedContact.tasks.push(task);
      console.log(this.selectedContact);

      const contactsCollectionRef = collection(this.firestore, 'contacts');
      await updateDoc(doc(contactsCollectionRef, this.selectedContact.id), {
        tasks: this.selectedContact.tasks,
      });

      this.taskForm.reset();
      this.addTaskToBoard = false;
    }
  }

  async showContactTaskArray() {
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
            color: this.newColor(),
            tasks: undefined
          };
          storedContactData.push(contact);
        });

        this.contacts = storedContactData;

      } catch (error) {
        console.log('Error logging in:', error);
      }
    }
  }

}
