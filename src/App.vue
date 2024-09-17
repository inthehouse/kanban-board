<template>
  <div id="app">
    <KanbanBoardView />
  </div>
</template>

<script>
import KanbanBoardView from '@/views/KanbanBoardView.vue';

export default {
  components: {
    KanbanBoardView,
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>