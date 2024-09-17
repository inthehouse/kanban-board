<template>
    <div class="board-column">
        <div class="column-header">
            <slot name="header"></slot>
        </div>
        <div class="column-content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BoardColumn',
};
</script>

<style scoped>
.board-column {
    background-color: #e2e2e2;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 350px;
    margin-right: 10px;
    padding: 10px;
}

.column-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.column-content {
    margin-top: 10px;
}
</style>
