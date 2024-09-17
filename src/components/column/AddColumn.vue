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
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-align: center;
}

h3 {
    margin-top: 0;
}

label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
}

input {
    width: calc(100% - 20px);
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
}

.form-actions {
    display: flex;
    justify-content: space-between;
}

button {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

button[type="submit"] {
    background-color: #007bff;
    color: white;
}

button[type="submit"]:hover {
    background-color: #0056b3;
}

button[type="button"] {
    background-color: #6c757d;
    color: white;
}

button[type="button"]:hover {
    background-color: #5a6268;
}
</style>
