<template>
    <div class="task-card">
        <p>{{ content }}</p>
    </div>
</template>

<script>
export default {
    name: 'TaskCard',
    props: {
        content: {
            type: String,
            required: true
        }
    }
};
</script>

<style scoped>
.task-card {
    background-color: white;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>