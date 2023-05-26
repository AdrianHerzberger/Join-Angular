import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})

export class AddTaskComponent implements OnInit {
  @ViewChild('colorDot1') colorDot1!: ElementRef;
  @ViewChild('colorDot2') colorDot2!: ElementRef;

  form!: FormGroup;
  title!: string;
  description!: string;
  date!:string;

  newCategory!:string;
  newSubtask!:string;

  openCategory: boolean = false;
  openSubtask:boolean = false;

  editingCategory:boolean  = false;
  addCategory: boolean = false;
  addSubtask:boolean = false;
  showInput: boolean = false;

  categories = ["New Category", "Sales", "Marketing"];
  subtasks: string[] = [];
  assignedColors: (ElementRef<any> | null)[] = [];
  selectedCategoryIndex: number | null = null;

  task:[] = [];

  constructor(
    private firestore: Firestore,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title:  ['', [Validators.required]],
      description: ['', [Validators.required]],
      date:  ['', [Validators.required]],
      newCategory: ['', [Validators.required]],
      newSubtask: ['', [Validators.required]]
    });

    this.assignedColors = [
      null,
      this.colorDot1,
      this.colorDot2
    ];
  }

  toggleEditCategory() {
    this.openCategory = !this.openCategory;
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

  customizeCategory(event: any) {
    if (this.editingCategory && this.selectedCategoryIndex !== null) {
      event.preventDefault();
      const target = event.target;
      const colorDot = target as HTMLElement;
      const selectedColorClass = colorDot.className;
      if (selectedColorClass !== null) {
        const categoryIndex = this.selectedCategoryIndex;
        if (categoryIndex < this.categories.length) {
          this.categories[categoryIndex] = selectedColorClass;
          colorDot.style.backgroundColor = selectedColorClass;
        }
      }
    }
  }

  cancelCategory() {
    this.showInput = false;
  }

  confirmCategory() {
    if (this.newCategory) {
      this.categories.push(this.newCategory);
    }
  }

  cancelSubtask() {
    this.newSubtask = '';
  }

  confirmSubtask() {
    if (this.newSubtask) {
      this.openSubtask = !this.openSubtask;
      if (!this.subtasks.includes(this.newSubtask)) {
        this.subtasks.push(this.newSubtask);
      }
      this.newSubtask = ''; 
      this.openSubtask = true;
    }
  }
  
  createTask() { 
    if(this.title) {

    }
  }

  clearTaskForm() { 
    this.title = '';
    this.description = '';
    this.description = '';
  }

}


  

