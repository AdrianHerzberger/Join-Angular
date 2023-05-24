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
  newCategory!:string;

  openDropdown: boolean = false;
  editingCategory:boolean  = false;
  addCategory: boolean = false;
  showInput: boolean = false;

  categories = ["New Category", "Sales", "Marketing"];
  assignedColors: (ElementRef<any> | null)[] = [];
  selectedColor: string | null = null;

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
      this.colorDot1,
      this.colorDot2
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

  customizeCategory(event: any) {
    if (this.editingCategory) {
      event.preventDefault();
      const target = event.target;
      const colorDot = target as HTMLElement;
      const selectedColorClass = colorDot.className;
      console.log('Selected color class:', selectedColorClass);
      if (selectedColorClass !== null) {
        const categoryIndex = parseInt(colorDot.parentElement?.getAttribute('data-target')?? '', 10);
        if (!isNaN(categoryIndex) && categoryIndex < this.categories.length) {
          this.categories[categoryIndex] = selectedColorClass;
        }
      }
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


  

