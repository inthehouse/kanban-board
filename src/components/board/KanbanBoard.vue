<template>
    <div class="kanban-board-wrapper">
        <button class="add-task-button" @click="showTaskPopup = true">Add Task</button>

        <div class="kanban-board">
            <DraggableBoardColumn v-for="column in columns" :key="column.id" :column="column"
                @taskMoved="handleTaskMoved" @deleteColumn="handleDeleteColumn"
                @updateColumnName="handleUpdateColumnName" />
        </div>

        <TaskPopup v-if="showTaskPopup" :columns="columns" :showPopup="showTaskPopup" @addTask="addNewTask"
            @closePopup="closeTaskPopup" />
    </div>
</template>

<script>
import DraggableBoardColumn from '@/components/column/DraggableBoardColumn.vue';
import TaskPopup from '@/components/task/TaskPopup.vue';

export default {
    components: {
        DraggableBoardColumn,
        TaskPopup,
    },
    data() {
        return {
            columns: [],
            showTaskPopup: false,
        };
    },
    methods: {
        loadState() {
            const savedState = localStorage.getItem('kanbanBoardState');
            if (savedState) {
                this.columns = JSON.parse(savedState);
            } else {
                this.columns = [
                    { id: '1', name: 'To Do', tasks: [] },
                    { id: '2', name: 'In Progress', tasks: [] },
                    { id: '3', name: 'Done', tasks: [] },
                ];
            }
        },
        saveState() {
            localStorage.setItem('kanbanBoardState', JSON.stringify(this.columns));
        },
        handleCardMoved({ cardId, fromColumnId, toColumnId }) {
            const fromColumn = this.columns.find((col) => col.id === fromColumnId);
            const toColumn = this.columns.find((col) => col.id === toColumnId);

            if (!fromColumn || !toColumn) {
                console.error('Column not found');
                return;
            }

            const cardIndex = fromColumn.tasks.findIndex((card) => card.id === cardId);

            if (cardIndex === -1) {
                console.error('Card not found in fromColumn');
                return;
            }

            const [card] = fromColumn.tasks.splice(cardIndex, 1);
            toColumn.tasks.push(card);
            this.saveState();
        },
        handleDeleteColumn({ columnId }) {
            this.columns = this.columns.filter((column) => column.id !== columnId);
            this.saveState();
        },
        handleUpdateColumnName({ columnId, newName }) {
            const column = this.columns.find((col) => col.id === columnId);
            if (column) {
                column.name = newName;
                this.saveState();
            } else {
                console.error('Column not found');
            }
        },
        addNewTask(task) {
            const column = this.columns.find((col) => col.id === task.columnId);
            if (column) {
                column.tasks.push({
                    id: Date.now().toString(),
                    title: task.title,
                    description: task.description,
                });
                this.saveState();
                this.closeTaskPopup();
            } else {
                console.error('Column not found');
            }
        },
        closeTaskPopup() {
            this.showTaskPopup = false;
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

.kanban-board {
    display: flex;
    overflow-x: auto;
}

.add-task-button {
    margin-bottom: 10px;
}
</style>
