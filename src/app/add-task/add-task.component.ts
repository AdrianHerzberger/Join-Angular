import { Component, OnInit } from '@angular/core';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Category{
  name: string,
  color: string
}

interface TaskInterface {
  title: string,
  description: string,
  date: Date | string,
  newCategory: string,
  newSubtask: string,
}

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})

export class AddTaskComponent implements OnInit {
  form!: FormGroup;

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

  createdTaskArray:TaskInterface[] = [];

  constructor(
    private firestore: Firestore,
    private fb: FormBuilder,
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

  toggleAssignedToContact() {

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

  confirmCategory() {
    if (this.form.get('newCategory')?.value) {
      this.categories.push(this.form.get('newCategory')?.value);
      this.categoryColors.push('');
      this.addCategory = false;
      this.showInput = false;
      /* this.form.get('newCategory')?.patchValue(''); */
    }
  }

  cancelCategory() {
    this.addCategory = false;
    this.showInput = false;
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
      this.createdTaskArray.push(this.form.value);
      console.log(this.form.value)
      const tasksCollectionRef = collection(this.firestore, 'tasks');
      await addDoc(tasksCollectionRef, this.form.value);
      this.clearTaskForm();
    }
  }

  clearTaskForm() {
    this.form.reset();
  }

}




