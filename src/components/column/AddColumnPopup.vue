<template>
    <div class="popup">
        <div class="popup-content">
            <AddColumn @addColumn="$emit('addColumn', $event)" @close="$emit('closePopup')" />
        </div>
    </div>
</template>

<script>
import AddColumn from '@/components/column/AddColumn.vue';

export default {
    components: {
        AddColumn,
    },
};
</script>

<style scoped>
.popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.5);
}

.popup-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    text-align: center;
}
</style>
