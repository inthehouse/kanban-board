<template>
    <div class="task-card">
        <p>{{ title }}</p>
    </div>
</template>

<script>
export default {
    name: 'TaskCard',
    props: {
        title: {
            type: String,
            required: true
        }
    }
};
</script>

<style scoped>
.task-card {
    background-color: white;
    text-align: center;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>