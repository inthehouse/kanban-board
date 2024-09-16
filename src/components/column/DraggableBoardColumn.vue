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
                            <button @click="sortCards('contentAsc')">Sort By Name (A-Z)</button>
                            <button @click="sortCards('contentDesc')">Sort By Name (Z-A)</button>
                            <button @click="confirmDeleteColumn">🗑️ Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <div ref="sortableContainer" class="sortable-container">
            <DraggableTaskCard v-for="card in sortedCards" :key="card.id" :title="card.title"
                :description="card.description" :data-id="card.id" @cardMoved="handleCardMoved" />
        </div>
    </BoardColumn>
</template>

<script>
import BoardColumn from '@/components/column/BoardColumn.vue';
import DraggableTaskCard from '@/components/task/DraggableTaskCard.vue';
import Sortable from 'sortablejs';

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
        handleCardMoved(event) {
            const item = event.item;
            const toColumn = event.to;
            if (item && toColumn) {
                const cardId = item.dataset.id;
                const fromColumnId = this.column.id;
                const toColumnId = toColumn.dataset.columnId;

                if (cardId && toColumnId) {
                    this.$emit('cardMoved', {
                        cardId,
                        fromColumnId,
                        toColumnId,
                    });
                } else {
                    console.error('Card ID or target column ID is missing');
                }
            } else {
                console.error('Event item or target column is undefined');
            }
        },
        confirmDeleteColumn() {
            this.isMenuOpen = false;
            if (confirm('Are you sure you want to delete this column?')) {
                this.$emit('deleteColumn', { columnId: this.column.id });
            }
        },
        sortCards(option) {
            this.sortOption = option;
        },
        saveColumnName() {
            if (this.editableColumnName.trim()) {
                this.isEditing = false;
                this.$emit('updateColumnName', {
                    columnId: this.column.id,
                    newName: this.editableColumnName,
                });
            }
        },
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
        }
    },
    mounted() {
        this.$nextTick(() => {
            Sortable.create(this.$refs.sortableContainer, {
                group: 'tasks',
                animation: 150,
                onEnd: this.handleCardMoved,
            });
        });
    },
    computed: {
        sortedCards() {
            if (!this.sortOption) return this.column.cards;
            const sortingFunctions = {
                contentAsc: (a, b) => a.title.localeCompare(b.title),
                contentDesc: (a, b) => b.title.localeCompare(a.title),
            };
            return [...this.column.cards].sort(sortingFunctions[this.sortOption]);
        },
    }
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