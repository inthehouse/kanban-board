<template>
    <div class="add-column-form">
        <h3>Add New Column</h3>
        <form @submit.prevent="submitForm">
            <label for="column-name">Column Name:</label>
            <input v-model="columnName" type="text" id="column-name" placeholder="Enter column name" required />
            <div class="form-actions">
                <button type="submit">Add Column</button>
                <button type="button" @click="$emit('close')">Cancel</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            columnName: '',
        };
    },
    methods: {
        submitForm() {
            if (this.columnName.trim()) {
                this.$emit('addColumn', this.columnName);
                this.columnName = '';
            }
        },
    },
};
</script>

<style scoped>
.add-column-form {
    text-align: center;
}

.form-actions {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
}

button {
    padding: 8px 16px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
}

button[type="button"] {
    background-color: #6c757d;
}
</style>
