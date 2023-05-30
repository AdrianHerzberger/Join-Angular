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
  date!: string;

  newCategory!: string;
  newSubtask!: string;

  openCategory: boolean = false;
  openSubtask: boolean = false;

  editingCategory: boolean = false;
  addCategory: boolean = false;
  addSubtask: boolean = false;
  showInput: boolean = false;

  categories = ["New Category", "Sales", "Marketing"];
  subtasks: string[] = [];

  selectedColorClass: string = '';
  selectedTargetIndex: number = -1;

  task: { title: string, description: string, date: string, newCategory: string, newSubtask: string }[] = [];

  constructor(
    private firestore: Firestore,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      date: ['', [Validators.required]],
      newCategory: ['', [Validators.required]],
      newSubtask: ['', [Validators.required]]
    });
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

  selectColor(index: number) {
    this.selectedTargetIndex = index;
  }
  
  customizeColor(event: any) {
    if (this.editingCategory && this.selectedTargetIndex !== null) {
      event.preventDefault();
      const target = event.target;
      const colorDotElement = target as HTMLElement;
      console.log(colorDotElement);
      const selectedColorClass = colorDotElement.className;
      console.log('Selected color class:', selectedColorClass);
      if (selectedColorClass !== null) {
        const categoryIndex = this.selectedTargetIndex;
        console.log('Selected category index:', categoryIndex);
        if (categoryIndex >= 0 && categoryIndex < this.selectedColorClass.length) {  
          colorDotElement.classList.remove(this.selectedColorClass);
          this.selectedColorClass = selectedColorClass;
          colorDotElement.classList.add(this.selectedColorClass);
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
      this.openSubtask = true;
    }
  }

  createTask() {
    if(this.form.valid) {
      const formData = this.form.value;
      formData.date = this.date;
      this.task.push(formData);
      console.log(this.task);
    } 
  }

  clearTaskForm() {
    this.title = '';
    this.description = '';
    this.newSubtask = '';
    this.date = '';
    this.newSubtask = '';
  }

}




