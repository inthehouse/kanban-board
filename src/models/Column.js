export class Column {
    constructor(id, name, tasks = []) {
        this.id = id;
        this.name = name;
        this.tasks = tasks;
    }

    addTask(task) {
        this.tasks.push(task);
    }

    updateName(newName) {
        this.name = newName;
    }
}
