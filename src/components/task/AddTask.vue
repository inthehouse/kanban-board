<template>
    <div class="add-task">
        <form @submit.prevent="submitForm">
            <div>
                <label for="title">Title:</label>
                <input v-model="task.title" type="text" id="title" required />
            </div>
            <div>
                <label for="description">Description:</label>
                <textarea v-model="task.description" id="description"></textarea>
            </div>
            <div>
                <label for="column">Column:</label>
                <select v-model="task.columnId" id="column" required>
                    <option v-for="column in columns" :key="column.id" :value="column.id">
                        {{ column.name }}
                    </option>
                </select>
            </div>
            <button type="submit">Add Task</button>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        columns: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            task: {
                title: '',
                description: '',
                columnId: this.columns.length ? this.columns[0].id : null
            }
        };
    },
    methods: {
        submitForm() {
            if (this.task.title.trim() !== '' && this.task.columnId) {
                this.$emit('addTask', this.task);
                this.resetForm();
            } else {
                console.error('Task title or columnId is missing');
            }
        },
        resetForm() {
            this.task = {
                title: '',
                description: '',
                columnId: this.columns.length ? this.columns[0].id : null
            };
        }
    }
};
</script>

<style scoped>
.add-task {
    padding: 20px;
    border: 1px solid #ddd;
    background-color: #f9f9f9;
}

form div {
    margin-bottom: 10px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input,
textarea,
select {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

button {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>
