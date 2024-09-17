
export class Board {
    constructor(columns = []) {
        this.columns = columns;
    }

    addColumn(column) {
        this.columns.push(column);
    }

    removeColumn(columnId) {
        this.columns = this.columns.filter(column => column.id !== columnId);
    }

    updateColumnName(columnId, newName) {
        const column = this.columns.find(col => col.id === columnId);
        if (column) {
            column.updateName(newName);
        } else {
            console.error('Column not found');
        }
    }

    addTaskToColumn(columnId, task) {
        const column = this.columns.find(col => col.id === columnId);
        if (column) {
            column.addTask(task);
        } else {
            console.error('Column not found');
        }
    }

    moveTask(taskId, fromColumnId, toColumnId) {
        const fromColumn = this.columns.find(col => col.id === fromColumnId);
        const toColumn = this.columns.find(col => col.id === toColumnId);

        if (!fromColumn || !toColumn) {
            console.error('Column not found');
            return;
        }

        const taskIndex = fromColumn.tasks.findIndex(task => task.id === taskId);
        if (taskIndex === -1) {
            console.error('Task not found in fromColumn');
            return;
        }

        const [task] = fromColumn.tasks.splice(taskIndex, 1);
        toColumn.addTask(task.title, task.description);
    }
}
