<template>
    <div ref="draggableCard" :data-id="task.id">
        <TaskCard :title="task.title" />
    </div>
</template>

<script>
import TaskCard from './TaskCard.vue';

export default {
    name: 'DraggableTaskCard',
    components: {
        TaskCard,
    },
    props: {
        task: {
            type: Object,
            required: true,
        },
        columnId: {
            type: String,
            required: true,
        },
    },
};
</script>

<style scoped>
/* No additional styles required for now, as it inherits from TaskCard */
</style>
