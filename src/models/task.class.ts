export class Task {
    title: string;
    description: string;
    date: string;
    newCategory: string;
    newSubtask: string;

    constructor(obj?: any) {
        this.title = obj ? obj.title : '';
        this.description = obj ? obj.description : '';
        this.date = obj ? obj.date : '';
        this.newCategory = obj ? obj.newCategory : '';
        this.newSubtask = obj ? obj.newSubtask : '';
    }

    public toTaskJson() {
        return {
            title: this.title,
            description: this.description,
            date: this.date,
            newCategory: this.newCategory,
            newSubtask: this.newSubtask,
        }
    }

}