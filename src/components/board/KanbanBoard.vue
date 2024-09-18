<template>
    <div class="kanban-board-wrapper">
        <div class="button-container">
            <button class="add-task-button" @click="showTaskPopup = true">Add Task</button>
            <button class="add-column-button" @click="showColumnPopup = true">Add Column</button>
        </div>

        <div class="kanban-board">
            <DraggableBoardColumn v-for="column in board.columns" :key="column.id" :column="column"
                @taskMoved="handleTaskMoved" @deleteColumn="handleDeleteColumn"
                @updateColumnName="handleUpdateColumnName" @saveState="saveState" />
        </div>

        <TaskPopup v-if="showTaskPopup" :columns="board.columns" :showPopup="showTaskPopup" @addTask="addNewTask"
            @closePopup="closeTaskPopup" />
        <AddColumnPopup v-if="showColumnPopup" @addColumn="addNewColumn" @closePopup="closeColumnPopup" />
    </div>
</template>

<script>
import DraggableBoardColumn from '@/components/column/DraggableBoardColumn.vue';
import TaskPopup from '@/components/task/AddTaskCardPopup.vue';
import AddColumnPopup from '@/components/column/AddColumnPopup.vue';
import { Board } from '@/models/Board';
import { Column } from '@/models/Column';

export default {
    components: {
        DraggableBoardColumn,
        TaskPopup,
        AddColumnPopup,
    },
    data() {
        return {
            board: new Board(),
            showTaskPopup: false,
            showColumnPopup: false,
        };
    },
    methods: {
        loadState() {
            const savedState = localStorage.getItem('kanbanBoardState');
            if (savedState) {
                const columnsData = JSON.parse(savedState);
                this.board.columns = columnsData.map(col => new Column(col.id, col.name, col.tasks));
            } else {
                this.board = new Board([
                    new Column('1', 'To Do', []),
                    new Column('2', 'In Progress', []),
                    new Column('3', 'Done', []),
                ]);
            }
        },
        saveState() {
            localStorage.setItem('kanbanBoardState', JSON.stringify(this.board.columns));
        },
        handleTaskMoved({ taskId, fromColumnId, toColumnId }) {
            this.board.moveTask(taskId, fromColumnId, toColumnId);
            this.saveState();
        },
        handleDeleteColumn({ columnId }) {
            this.board.removeColumn(columnId);
            this.saveState();
        },
        handleUpdateColumnName({ columnId, newName }) {
            this.board.updateColumnName(columnId, newName);
            this.saveState();
        },
        addNewTask(task) {
            this.board.addTaskToColumn(task.columnId, {
                ...task
            });
            this.saveState();
            this.closeTaskPopup();
        },
        addNewColumn(columnName) {
            const newColumnId = Date.now().toString();
            const newColumn = new Column(newColumnId, columnName, []);
            this.board.addColumn(newColumn);
            this.saveState();
            this.closeColumnPopup();
        },
        closeTaskPopup() {
            this.showTaskPopup = false;
        },
        closeColumnPopup() {
            this.showColumnPopup = false;
        },
    },
    mounted() {
        this.loadState();
    },
};
</script>

<style scoped>
.kanban-board-wrapper {
    padding: 20px;
}

.button-container {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
}

.kanban-board {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.add-task-button,
.add-column-button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    color: white;
    background-color: #007bff;
    cursor: pointer;
    font-size: 16px;
    margin-left: 10px;
}

.add-task-button:hover,
.add-column-button:hover {
    background-color: #0056b3;
}
</style>
