<template>
    <div class="kanban-board-wrapper">
        <button class="add-task-button" @click="showTaskPopup = true">Add Task</button>

        <div class="kanban-board">
            <DraggableBoardColumn v-for="column in columns" :key="column.id" :column="column"
                @cardMoved="handleCardMoved" @deleteColumn="handleDeleteColumn" />
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
            selectedColumnId: null,
        };
    },
    methods: {
        loadState() {
            const savedState = localStorage.getItem('kanbanBoardState');
            if (savedState) {
                this.columns = JSON.parse(savedState);
            } else {
                this.columns = [
                    { id: '1', name: 'To Do', cards: [] },
                    { id: '2', name: 'In Progress', cards: [] },
                    { id: '3', name: 'Done', cards: [] },
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

            const cardIndex = fromColumn.cards.findIndex((card) => card.id === cardId);

            if (cardIndex === -1) {
                console.error('Card not found in fromColumn');
                return;
            }

            const [card] = fromColumn.cards.splice(cardIndex, 1);
            toColumn.cards.push(card);
            this.saveState();
        },
        handleDeleteColumn({ columnId }) {
            this.columns = this.columns.filter((column) => column.id !== columnId);
            this.saveState();
        },
        addNewTask({ columnId, task }) {
            const column = this.columns.find((col) => col.id === columnId);
            if (column) {
                column.cards.push({
                    id: Date.now().toString(),
                    content: task.name,
                    description: task.description,
                });
                this.saveState();
            }
            this.showTaskPopup = false; 
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
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.add-task-button {
    margin-bottom: 20px;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
}

.kanban-board {
    display: flex;
    overflow-x: auto;
}
</style>
