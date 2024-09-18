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

    sortTasks(option) {
        const sortingFunctions = {
            contentAsc: (a, b) => a.title.localeCompare(b.title),
            contentDesc: (a, b) => b.title.localeCompare(a.title),
        };
        this.tasks.sort(sortingFunctions[option]);
    }
}
