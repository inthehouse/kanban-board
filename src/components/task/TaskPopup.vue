<template>
    <div v-if="showPopup" class="popup-overlay">
        <div class="popup-content">
            <h3>Add New Task</h3>
            <input v-model="taskName" placeholder="Task Name" />
            <textarea v-model="taskDescription" placeholder="Task Description"></textarea>
            <select v-model="selectedColumnId">
                <option v-for="column in columns" :key="column.id" :value="column.id">
                    {{ column.name }}
                </option>
            </select>
            <button @click="addTask">Add Task</button>
            <button @click="closePopup">Cancel</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        columns: {
            type: Array,
            required: true
        },
        showPopup: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            taskName: '',
            taskDescription: '',
            selectedColumnId: this.columns[0]?.id
        };
    },
    methods: {
        addTask() {
            if (this.taskName.trim() !== '' && this.selectedColumnId) {
                this.$emit('addTask', {
                    columnId: this.selectedColumnId,
                    task: {
                        name: this.taskName,
                        description: this.taskDescription
                    }
                });
                this.closePopup();
            }
        },
        closePopup() {
            this.$emit('closePopup');
        }
    }
};
</script>

<style scoped>
.popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.popup-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: 300px;
}

.popup-content input,
.popup-content textarea,
.popup-content select {
    width: 100%;
    margin-bottom: 10px;
}

.popup-content button {
    margin-right: 10px;
}
</style>
