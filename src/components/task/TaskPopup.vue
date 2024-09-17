<template>
    <div v-if="showPopup" class="popup-overlay">
        <div class="popup-content">
            <div class="header">
                <h3>Add New Task</h3>
                <button class="close-btn" @click="closePopup">x</button>
            </div>
            <AddTask :columns="columns" @addTask="handleAddTask" />
        </div>
    </div>
</template>

<script>
import AddTask from '@/components/task/AddTaskCard.vue';

export default {
    components: {
        AddTask
    },
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
    methods: {
        handleAddTask(task) {
            if (task && task.title && task.columnId) {
                this.$emit('addTask', task);
                this.closePopup();
            } else {
                console.error('Invalid task data:', task);
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
    position: relative;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.close-btn {
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    color: #333;
}

.close-btn:hover {
    color: #ff0000;
}
</style>
