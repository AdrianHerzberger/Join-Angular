import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  form!: FormGroup;
  title!: string;
  description!: string;
  newCategory!:string;

  openDropdown: boolean = false;
  editingCategory:boolean  = false;
  addCategory: boolean = false;
  showInput: boolean = false;

  categories = ["New Category", "Sales", "Marketing"];
  assignedColors: (Element | null)[] = [];
  

  constructor(
    private firestore: Firestore,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      newCategory: ['', Validators.required]
    });

    this.assignedColors = [
      null,
      document.getElementsByClassName("color-dot")[1],
      document.getElementsByClassName("color-dot")[2]
    ];
  }

  toggleEditCategory() {
    this.openDropdown = !this.openDropdown;
  }
  
  toggleAssigned() {

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
  
  cancelInput() {
    this.showInput = false;
  }

  confirmInput() {
    if (this.newCategory) {
      this.categories.push(this.newCategory);
    }
  }
  
  createTask() { }

  clearTaskForm() { }

}


  

