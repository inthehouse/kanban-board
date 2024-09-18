<template>
    <BoardColumn>
        <template v-slot:header>
            <div class="column-header">
                <div v-if="isEditing">
                    <input v-model="editableColumnName" placeholder="Edit Column Name" />
                    <button @click="saveColumnName">💾</button>
                </div>
                <div v-else class="header-content">
                    <h3>{{ column.name }}</h3>
                    <button class="edit-button" @click="isEditing = true">✏️</button>
                    <div class="menu-container">
                        <button class="menu-button" @click="toggleMenu">⋮</button>
                        <div v-if="isMenuOpen" class="menu-dropdown">
                            <button @click="sortTasks('contentAsc')">Sort By Name (A-Z)</button>
                            <button @click="sortTasks('contentDesc')">Sort By Name (Z-A)</button>
                            <button @click="confirmDeleteColumn">🗑️ Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <div ref="sortableContainer" :data-column-id="column.id" class="sortable-container">
            <DraggableTaskCard v-for="task in sortedTasks" :key="task.id" :task="task" :data-id="task.id" />
        </div>
    </BoardColumn>
</template>

<script>
import BoardColumn from '@/components/column/BoardColumn.vue';
import DraggableTaskCard from '@/components/task/DraggableTaskCard.vue';
import Sortable from 'sortablejs';
import { Column } from '@/models/Column';

export default {
    components: {
        BoardColumn,
        DraggableTaskCard,
    },
    props: {
        column: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            isEditing: false,
            editableColumnName: this.column.name,
            isMenuOpen: false,
            sortOption: null,
        };
    },
    methods: {
        handleTaskMoved(event) {
            const taskId = event.item.dataset.id;
            const toColumnId = event.to.dataset.columnId;
            const fromColumnId = this.column.id;

            if (taskId && toColumnId) {
                this.$emit('taskMoved', { taskId, fromColumnId, toColumnId });
            } else {
                console.error('Task ID or column ID is missing.');
            }
        },
        confirmDeleteColumn() {
            this.isMenuOpen = false;
            if (confirm('Are you sure you want to delete this column?')) {
                this.$emit('deleteColumn', { columnId: this.column.id });
            }
        },
        sortTasks(option) {
            this.column.sortTasks(option);
            this.$emit('saveState'); 
        },
        saveColumnName() {
            if (this.editableColumnName.trim()) {
                this.isEditing = false;
                const column = new Column(this.column.id, this.editableColumnName, this.column.tasks);
                this.$emit('updateColumnName', {
                    columnId: column.id,
                    newName: column.name,
                });
            }
        },
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        },
    },
    mounted() {
        this.$nextTick(() => {
            Sortable.create(this.$refs.sortableContainer, {
                group: 'tasks',
                animation: 150,
                onEnd: (event) => {
                    if (!event.item) {
                        console.error('event.item is undefined');
                        return;
                    }

                    const taskId = event.item?.dataset?.id;
                    const fromColumnId = event.from?.dataset?.columnId;
                    const toColumnId = event.to?.dataset?.columnId;

                    if (taskId && fromColumnId && toColumnId) {
                        this.$emit('taskMoved', {
                            taskId,
                            fromColumnId,
                            toColumnId,
                        });
                    } else {
                        console.error('Error: Missing taskId, fromColumnId, or toColumnId');
                    }
                },
            });
        });
    },
    computed: {
        sortedTasks() {
            return this.column.tasks;
        },
    },
};
</script>

<style scoped>
.sortable-container {
    min-height: 200px;
}

.column-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header-content {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
}

.header-content h3 {
    margin: 0;
    margin-right: 10px;
}

.edit-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
}

.menu-container {
    position: relative;
}

.menu-button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    padding: 0;
    margin-left: 5px;
}

.menu-dropdown {
    position: absolute;
    top: 25px;
    right: 0;
    background: white;
    border: 1px solid #ccc;
    padding: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 10;
}

.menu-dropdown button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 14px;
    padding: 5px;
    width: 100%;
    text-align: left;
}
</style>
