<template>
    <div ref="draggableCard">
        <TaskCard :content="content" />
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
        content: {
            type: String,
            required: true
        },
        dataId: {
            type: String,
            required: true
        }
    },
    mounted() {
        Sortable.create(this.$refs.draggableCard, {
            group: 'tasks',
            animation: 150,
            // eslint-disable-next-line no-unused-vars
            onEnd: (event) => {
                this.$emit('cardMoved', {
                    cardId: this.dataId
                });
            }
        });
    }
};
</script>

<style scoped>
/* No additional styles required for now, as it inherits from TaskCard */
</style>