<template>
  <div class="main-view">
    <ListBox
      v-for="(list, i) in lists"
      :key="i"
      :list="list"
      @change-list-title="changeListTitle"
      class="list-box"
    />
    <v-btn
      elevation="0"
      width="300"
      class="ma-3"
      @click="isAddList = true"
      v-if="!isAddList"
      ><v-icon class="mr-1">mdi-plus</v-icon> Add another list
      <v-spacer></v-spacer
    ></v-btn>
    <v-card v-else class="add-list-box pa-2 my-3" min-width="300">
      <v-textarea
        v-model="newListTitle"
        placeholder="Enter a title for this card... "
        solo
        flat
        auto-grow
        @keyup.enter="addList"
        hide-details
        class="mb-2 elevation-0"
        rows="1"
      ></v-textarea>
      <v-btn elevation="0" color="green" small dark @click="addList"
        >Add List</v-btn
      >
      <v-btn icon @click="isAddList = false"><v-icon>mdi-close</v-icon></v-btn>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Main',
  components: {
    ListBox: () => import('@/components/main/ListBox.vue'),
  },
  data() {
    return {
      isAddList: false,
      newListTitle: '',
    };
  },
  computed: {
    ...mapState(['lists']),
    newListId() {
      return (
        this.lists.reduce((acc, cur) => {
          acc = Math.max(acc, cur.id);
          return acc;
        }, 0) + 1
      );
    },
  },
  methods: {
    changeListTitle(list) {
      this.$store.commit('changeListTitle', list);
    },
    addList() {
      this.$store.commit('addList', {
        id: this.newListId,
        title: this.newListTitle,
      });
      this.newListTitle = '';
    },
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
