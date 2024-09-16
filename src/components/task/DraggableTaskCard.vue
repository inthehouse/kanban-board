<template>
    <div ref="draggableCard" :data-id="dataId">
        <TaskCard :title="title" />
    </div>
</template>

<script>
import Sortable from 'sortablejs';
import TaskCard from './TaskCard.vue';

export default {
    name: 'DraggableTaskCard',
    components: {
        TaskCard
    },
    props: {
        title: {
            type: String,
            required: true
        },
        dataId: {
            type: String,
            required: true
        },
        columnId: {
            type: String,
            required: true
        }
    },
    mounted() {
        Sortable.create(this.$refs.draggableCard, {
            group: 'tasks',
            animation: 150,
            onEnd: (event) => {
                this.$emit('cardMoved', {
                    cardId: this.dataId,
                    fromColumnId: this.columnId,
                    toColumnId: event.from.dataset.columnId
                });
            }
        });
    }
};
</script>

<style scoped>
/* No additional styles required for now, as it inherits from TaskCard */
</style>