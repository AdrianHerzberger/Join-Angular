import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDocs, query, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  Data_Tasks: { [key: string]: any }[] = [];
  
  constructor(
    private firestore: Firestore,
  ) { }

  async getTaskData() {
    const taskCollection = collection(this.firestore, 'tasks');
    const q = query(taskCollection);
    const querySnapshotFromTasks = await getDocs(q);

    querySnapshotFromTasks.forEach((doc) => {
      const data = doc.data();
      this.Data_Tasks.push(data);
    });

    console.log(this.Data_Tasks);
  }
}
