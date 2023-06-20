import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDocs, query } from '@angular/fire/firestore';

interface TaskInterface {
  title: string;
  description: string;
  date: Date | string;
  newCategory: string;
  newSubtask: string;
  color: any;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: TaskInterface[] = [];

  constructor(public firestore: Firestore) {}

  async getTaskData() {
    try {
      const taskCollection = collection(this.firestore, 'tasks');
      const q = query(taskCollection);
      const querySnapshotfromTasks = await getDocs(q);

      const storedTaskData: TaskInterface[] = [];

      querySnapshotfromTasks.forEach((doc) => {
        const data = doc.data();
        const { newCategory, title, description, date, newSubtask, color } = data;
        const task: TaskInterface = {
          newCategory: newCategory,
          title: title,
          description: description,
          date: date,
          newSubtask: newSubtask,
          color: color,
        }
        storedTaskData.push(task);
        console.log(storedTaskData);
      })

    } catch (error) {
      console.log('Error logging tasks:', error);
    }
  }
}
