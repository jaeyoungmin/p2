<template>
  <div class="main-view">
    <ListBox
      v-for="(list, i) in lists"
      :key="i"
      :list="list"
      class="list-box"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Main',
  components: {
    ListBox: () => import('@/components/main/ListBox.vue'),
  },
  computed: {
    ...mapState(['lists']),
  },
};
</script>

<style lang="scss" scoped>
.main-view {
  display: flex;
  flex-flow: row;
  overflow-x: auto;
  align-items: flex-start;
  height: calc(100vh - 60px);

  .list-box {
    flex: 350px 0 0;
  }
}
</style>
