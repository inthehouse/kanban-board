export class Column {
    constructor(id, name, tasks = []) {
        this.id = id;
        this.name = name;
        this.tasks = tasks;
    }
    updateName(newName) {
        this.name = newName;
    }
}
