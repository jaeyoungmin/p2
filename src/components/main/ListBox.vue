<template>
  <v-card width="350" class="list-box">
    <v-row class="list-box-title" align="center" no-gutters>
      <h3>
        {{ list.title }} <span>id: {{ list.id }}</span>
      </h3>
    </v-row>
    <div class="list-box-item">
      <IssueCard v-for="(issue, i) in issueSameId" :key="i" :issue="issue" />
    </div>
    <div class="list-box-add">
      <v-btn text small><v-icon>mdi-plus</v-icon>Add a list </v-btn>
    </div>
  </v-card>
</template>

<script>
// import { Drag, Drop } from 'vue-drag-drop';
import { mapState } from 'vuex';
export default {
  name: 'ListBox',
  components: {
    IssueCard: () => import('@/components/issue_detail/IssueCard.vue'),
  },
  computed: {
    ...mapState(['issues']),
    issueSameId() {
      return this.issues.filter((el) => el.listId === this.list.id);
    },
  },
  props: ['list'],
};
</script>

<style lang="scss" scoped>
.list-box {
  margin: 10px;
  background: #d9d9d9;
  .list-box-title {
    padding: 5px 10px;
  }
  .list-box-item {
    padding: 0 10px;
  }
  .list-box-add {
    padding: 5px 0;
  }
}
</style>
