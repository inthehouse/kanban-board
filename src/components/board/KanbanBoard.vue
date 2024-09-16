<template>
    <div class="kanban-board-wrapper">
        <button class="add-task-button" @click="showTaskModal = true">Add Task</button>

        <div class="kanban-board">
            <DraggableBoardColumn v-for="column in columns" :key="column.id" :column="column"
                @cardMoved="handleCardMoved" @deleteColumn="handleDeleteColumn" />
        </div>

        <div v-if="showTaskModal" class="modal-overlay">
            <div class="modal-content">
                <h3>Add New Task</h3>
                <label for="taskName">Task Name:</label>
                <input v-model="newTask.name" id="taskName" placeholder="Task Name" />

                <label for="taskDescription">Task Description:</label>
                <input v-model="newTask.description" id="taskDescription" placeholder="Task Description" />

                <label for="columnSelect">Select Column:</label>
                <select v-model="selectedColumnId" id="columnSelect">
                    <option v-for="column in columns" :key="column.id" :value="column.id">{{ column.name }}</option>
                </select>

                <button @click="addNewTask">Add Task</button>
                <button @click="showTaskModal = false">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
import DraggableBoardColumn from '@/components/column/DraggableBoardColumn.vue';

export default {
    components: {
        DraggableBoardColumn,
    },
    data() {
        return {
            columns: [],
            showTaskModal: false,
            newTask: {
                name: '',
                description: '',
            },
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
        addNewTask() {
            if (this.newTask.name.trim() !== '' && this.selectedColumnId) {
                const column = this.columns.find((col) => col.id === this.selectedColumnId);
                if (column) {
                    column.cards.push({
                        id: Date.now().toString(),
                        content: this.newTask.name,
                        description: this.newTask.description,
                    });
                    this.saveState();
                }
                this.newTask = { name: '', description: '' };
                this.showTaskModal = false;
            }
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

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
}

.modal-content h3 {
    margin-bottom: 20px;
}

.modal-content label {
    display: block;
    margin-top: 10px;
}

.modal-content input,
.modal-content select {
    width: 100%;
    margin-top: 5px;
    padding: 8px;
    margin-bottom: 10px;
}

.modal-content button {
    margin-right: 10px;
    padding: 8px 12px;
}
</style>