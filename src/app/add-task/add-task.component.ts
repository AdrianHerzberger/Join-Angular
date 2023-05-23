import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  @ViewChild('addCategoryIcon') addCategoryIcon: any;
  @ViewChild('newCategory', { static: false }) newCategoryRef!: ElementRef;

  form!: FormGroup;
  title!: string;
  description!: string;
  editCategory!: string;
  addCategory!: string;
  newCategoryValue: string = '';

  openDropdown = false;
  editingCategory = false;

  categories = ["New Category", "Sales", "Marketing"];
  colorDots = document.getElementsByClassName("color-dot");
  assignedColors = [null, this.colorDots[1], this.colorDots[2]];

  constructor(
    private firestore: Firestore,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.updateEditCategory();
  }

  toggleEditCategory() {
    this.openDropdown = !this.openDropdown;
    if (this.openDropdown) {
      this.updateEditCategory();
    }
  }

  updateEditCategory() {
    this.editCategory = /*html*/`
      <div class="category" (click)="selectCategory($event)">
        <div class="category-text">${this.categories[0]}</div>
      </div>
    `;

    if (this.categories.length > 1) {
      for (let i = 1; i < this.categories.length; i++) {
        let color = this.assignedColors[i];
        if (color != null) {
          color.classList.remove("selected");
          this.editCategory += /*html*/`
            <div class="category" (click)="selectCategory($event)"><div class="category-text">${this.categories[i]}</div> ${color.outerHTML}</div>
          `;
        } else {
          this.editCategory += /*html*/`
            <div class="category" (click)="selectCategory($event)"><div class="category-text">${this.categories[i]}</div></div>
          `;
        }
      }
    }
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!this.editingCategory && !target.closest('.categoryOninput')) {
      this.editCategory = '';
    }
  }

  selectCategory(event: Event) {
    if (this.editingCategory) {
      const target = event.currentTarget as HTMLElement;
      const categoryText = target.querySelector('.category-text')?.textContent;
      this.addCategory = /*html*/`
        <div class="categoryOninput">
          <input type="text" [(ngModel)]="newCategoryValue" value="${categoryText}">
          <img src="assets/img/icon_clear.png" id="clearCategory">
          <img src="assets/img/icon_done.png" id="addCategory" (click)="addNewCategory()">
        </div>
      `;
    }
  }

  addNewCategory() {
    if (this.newCategoryValue.trim() !== '') {
      this.categories.push(this.newCategoryValue);
    }
    this.editingCategory = false;
  }
  
  createTask() { }

  clearTaskForm() { }
}
